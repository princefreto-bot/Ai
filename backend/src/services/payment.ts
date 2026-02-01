/**
 * NowPayments API Integration Service - BACKEND
 * 
 * NowPayments est un système de paiement par crypto-monnaies.
 * Ce service gère les webhooks IPN et la vérification des paiements.
 * 
 * Documentation: https://documenter.getpostman.com/view/7907941/S1a32n38
 * 
 * Note: Le frontend utilise le widget iframe de NowPayments.
 * Ce service côté serveur gère principalement les webhooks IPN.
 */

import crypto from 'crypto';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { db } from '../database';
import { Payment } from '../types';

// ==================== TYPES ====================

type PaymentStatus = 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'partially_paid' | 'finished' | 'failed' | 'refunded' | 'expired';

interface NowPaymentsIPNPayload {
  payment_id: number;
  payment_status: PaymentStatus;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  purchase_id: string;
  created_at: string;
  updated_at: string;
  outcome_amount?: number;
  outcome_currency?: string;
}

interface PaymentStatusResponse {
  status: string;
  paymentId: string;
  cryptoAmount: string;
  cryptoCurrency: string;
  paidAt?: string;
}

// ==================== SERVICE ====================

class NowPaymentsService {
  private apiKey: string;
  private ipnSecret: string;
  private baseUrl: string;
  private isConfigured: boolean;

  constructor() {
    this.apiKey = config.nowPayments.apiKey;
    this.ipnSecret = config.nowPayments.ipnSecret;
    this.baseUrl = config.nowPayments.baseUrl;
    this.isConfigured = !!(this.apiKey);

    if (this.isConfigured) {
      console.log('✅ NowPayments Backend: API configurée');
    } else {
      console.log('ℹ️ NowPayments Backend: Mode widget iframe uniquement (pas de clé API)');
    }
  }

  /**
   * Headers pour les requêtes API NowPayments
   */
  private getHeaders(): Record<string, string> {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Vérifier la signature IPN de NowPayments
   */
  verifyIPNSignature(payload: string, signature: string): boolean {
    if (!this.ipnSecret) {
      console.warn('IPN Secret non configuré - signature non vérifiée');
      return true; // Accepter en mode dev
    }

    try {
      const hmac = crypto.createHmac('sha512', this.ipnSecret);
      hmac.update(payload);
      const calculatedSignature = hmac.digest('hex');

      return signature === calculatedSignature;
    } catch (error) {
      console.error('Erreur vérification signature IPN:', error);
      return false;
    }
  }

  /**
   * Traiter un webhook IPN de NowPayments
   */
  async processIPN(ipnData: NowPaymentsIPNPayload): Promise<void> {
    const { payment_id, payment_status, order_id, pay_amount, pay_currency } = ipnData;

    console.log(`[NowPayments IPN] Reçu: ${payment_status} pour payment_id ${payment_id}`);

    // Extraire l'ID de paiement interne depuis order_id
    // Format attendu: tradescalpsnip_plan_paymentId
    const orderParts = order_id.split('_');
    const internalPaymentId = orderParts[orderParts.length - 1];

    if (!internalPaymentId) {
      console.error('[NowPayments IPN] order_id invalide:', order_id);
      return;
    }

    // Chercher le paiement
    const payment = await db.getPaymentById(internalPaymentId);
    
    if (!payment) {
      console.error(`[NowPayments IPN] Paiement non trouvé: ${internalPaymentId}`);
      return;
    }

    // Traiter selon le statut
    switch (payment_status) {
      case 'finished':
      case 'confirmed':
        await this.handlePaymentCompleted(payment, String(payment_id), pay_amount, pay_currency);
        break;
        
      case 'failed':
      case 'expired':
      case 'refunded':
        await this.handlePaymentFailed(payment, payment_status);
        break;

      case 'partially_paid':
        await this.handlePaymentPartial(payment);
        break;
        
      case 'waiting':
      case 'confirming':
      case 'sending':
        // Statuts intermédiaires - log seulement
        console.log(`[NowPayments IPN] Statut intermédiaire: ${payment_status}`);
        break;
        
      default:
        console.log(`[NowPayments IPN] Statut non géré: ${payment_status}`);
    }
  }

  /**
   * Traiter un paiement réussi
   */
  async handlePaymentCompleted(
    payment: Payment, 
    transactionId: string,
    cryptoAmount?: number,
    cryptoCurrency?: string
  ): Promise<void> {
    // Mettre à jour le statut du paiement
    await db.updatePayment(payment.id, {
      status: 'completed',
      transactionId,
      cryptoAmount: cryptoAmount?.toString(),
      cryptoCurrency: cryptoCurrency as any,
      completedAt: new Date(),
    });

    // Calculer la date de fin d'abonnement (30 jours)
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);

    // Activer l'abonnement de l'utilisateur
    await db.updateUser(payment.userId, {
      plan: payment.plan,
      subscriptionStatus: 'active',
      subscriptionEndDate,
    });

    console.log(`✅ [NowPayments] Abonnement ${payment.plan} activé pour utilisateur ${payment.userId}`);
  }

  /**
   * Traiter un paiement échoué
   */
  async handlePaymentFailed(payment: Payment, reason: string): Promise<void> {
    await db.updatePayment(payment.id, {
      status: 'failed',
    });

    console.log(`❌ [NowPayments] Paiement échoué (${reason}) pour utilisateur ${payment.userId}`);
  }

  /**
   * Traiter un paiement partiel
   */
  async handlePaymentPartial(payment: Payment): Promise<void> {
    await db.updatePayment(payment.id, {
      status: 'underpaid',
    });

    console.log(`⚠️ [NowPayments] Paiement partiel pour utilisateur ${payment.userId}`);
  }

  /**
   * Créer un paiement (pour usage avec l'API directe, pas le widget)
   */
  async createPayment(
    userId: string,
    plan: 'pro' | 'enterprise',
    payCurrency: string = 'btc'
  ): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
    if (!this.isConfigured) {
      return {
        success: false,
        error: 'NowPayments API non configurée. Utilisez le widget iframe.',
      };
    }

    const paymentId = uuidv4();
    const planConfig = config.plans[plan];

    try {
      const response = await axios.post(
        `${this.baseUrl}/invoice`,
        {
          price_amount: planConfig.price,
          price_currency: 'usd',
          pay_currency: payCurrency,
          order_id: `tradescalpsnip_${plan}_${paymentId}`,
          order_description: `TradeScalpSnip - Abonnement ${planConfig.name}`,
          success_url: `${config.frontendUrl}/dashboard?payment=success`,
          cancel_url: `${config.frontendUrl}/pricing?payment=cancelled`,
        },
        { headers: this.getHeaders() }
      );

      // Enregistrer le paiement
      await db.createPayment({
        id: paymentId,
        userId,
        amount: planConfig.price,
        currency: 'USD',
        plan,
        status: 'pending',
        paymentMethod: 'crypto',
        transactionId: response.data.id,
        createdAt: new Date(),
      });

      return {
        success: true,
        paymentUrl: response.data.invoice_url,
      };
    } catch (error) {
      console.error('Erreur création paiement NowPayments:', error);
      return {
        success: false,
        error: 'Erreur lors de la création du paiement',
      };
    }
  }

  /**
   * Vérifier le statut d'un paiement via l'API
   */
  async checkPaymentStatus(paymentId: string): Promise<PaymentStatusResponse | null> {
    const payment = await db.getPaymentById(paymentId);
    
    if (!payment) {
      return null;
    }

    // Si on a l'API configurée et un transactionId, on peut vérifier
    if (this.isConfigured && payment.transactionId) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/payment/${payment.transactionId}`,
          { headers: this.getHeaders() }
        );

        const data = response.data;
        const status = data.payment_status;

        // Mettre à jour si terminé
        if (status === 'finished' && payment.status !== 'completed') {
          await this.handlePaymentCompleted(
            payment, 
            payment.transactionId,
            data.pay_amount,
            data.pay_currency
          );
        }

        return {
          status: data.payment_status,
          paymentId: paymentId,
          cryptoAmount: String(data.pay_amount || 0),
          cryptoCurrency: data.pay_currency || '',
          paidAt: data.updated_at,
        };
      } catch (error) {
        console.error('Erreur vérification paiement:', error);
      }
    }

    // Retourner les infos locales
    return {
      status: payment.status,
      paymentId: payment.id,
      cryptoAmount: payment.cryptoAmount || '0',
      cryptoCurrency: payment.cryptoCurrency || '',
      paidAt: payment.completedAt?.toISOString(),
    };
  }

  /**
   * Obtenir l'historique des paiements d'un utilisateur
   */
  async getUserPayments(userId: string): Promise<Payment[]> {
    return db.getPaymentsByUserId(userId);
  }

  /**
   * Obtenir les cryptos disponibles
   */
  async getAvailableCurrencies(): Promise<string[]> {
    if (!this.isConfigured) {
      return [...config.supportedCryptos];
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/currencies`,
        { headers: this.getHeaders() }
      );
      return response.data.currencies || [];
    } catch (error) {
      console.error('Erreur récupération devises:', error);
      return [...config.supportedCryptos];
    }
  }

  /**
   * Obtenir le taux de change minimum
   */
  async getMinimumPaymentAmount(currency: string = 'btc'): Promise<number> {
    if (!this.isConfigured) {
      return 0;
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/min-amount?currency_from=${currency}&currency_to=usd`,
        { headers: this.getHeaders() }
      );
      return response.data.min_amount || 0;
    } catch (error) {
      console.error('Erreur récupération montant minimum:', error);
      return 0;
    }
  }

  /**
   * Simuler la complétion d'un paiement (mode dev uniquement)
   */
  async simulatePaymentCompletion(paymentId: string): Promise<boolean> {
    if (config.nodeEnv === 'production') {
      console.warn('simulatePaymentCompletion ne doit pas être utilisé en production');
      return false;
    }

    const payment = await db.getPaymentById(paymentId);
    if (!payment) {
      return false;
    }

    await this.handlePaymentCompleted(payment, `sim_${paymentId}`, 0.001, 'BTC');
    return true;
  }
}

// ==================== EXPORT ====================

export const paymentService = new NowPaymentsService();
export default paymentService;
