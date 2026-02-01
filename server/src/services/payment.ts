/**
 * NowPayments IPN Service
 * Gère les webhooks et la vérification des paiements crypto
 */

import crypto from 'crypto';
import { config } from '../config';
import { db } from '../database';
import { Payment } from '../types';

interface NowPaymentsIPN {
  payment_id: number;
  payment_status: string;
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
}

class PaymentService {
  private ipnSecret: string;

  constructor() {
    this.ipnSecret = config.nowPayments.ipnSecret;
    
    if (this.ipnSecret) {
      console.log('✅ NowPayments IPN configuré');
    } else {
      console.log('ℹ️ NowPayments IPN non configuré - Mode widget iframe');
    }
  }

  /**
   * Vérifier la signature IPN NowPayments
   */
  verifyIPNSignature(payload: string, signature: string): boolean {
    if (!this.ipnSecret) {
      console.warn('IPN Secret non configuré');
      return true; // Accepter en dev
    }

    try {
      const hmac = crypto.createHmac('sha512', this.ipnSecret);
      hmac.update(payload);
      const calculatedSignature = hmac.digest('hex');
      return signature === calculatedSignature;
    } catch (error) {
      console.error('Erreur vérification signature:', error);
      return false;
    }
  }

  /**
   * Traiter un webhook IPN
   */
  async processIPN(ipnData: NowPaymentsIPN): Promise<void> {
    const { payment_id, payment_status, order_id, pay_amount, pay_currency } = ipnData;

    console.log(`[IPN] Reçu: ${payment_status} pour payment_id ${payment_id}`);

    // Format order_id: tradescalpsnip_plan_paymentId
    const orderParts = order_id.split('_');
    const internalPaymentId = orderParts[orderParts.length - 1];

    if (!internalPaymentId) {
      console.error('[IPN] order_id invalide:', order_id);
      return;
    }

    const payment = await db.getPaymentById(internalPaymentId);
    
    if (!payment) {
      console.error(`[IPN] Paiement non trouvé: ${internalPaymentId}`);
      return;
    }

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
        
      default:
        console.log(`[IPN] Statut: ${payment_status}`);
    }
  }

  /**
   * Paiement réussi - Activer l'abonnement
   */
  async handlePaymentCompleted(
    payment: Payment, 
    transactionId: string,
    cryptoAmount?: number,
    cryptoCurrency?: string
  ): Promise<void> {
    await db.updatePayment(payment.id, {
      status: 'completed',
      transactionId,
      cryptoAmount: cryptoAmount?.toString(),
      cryptoCurrency: cryptoCurrency as any,
      completedAt: new Date(),
    });

    // Calculer la date de fin (30 jours)
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);

    // Activer l'abonnement
    await db.updateUser(payment.userId, {
      plan: payment.plan,
      subscriptionStatus: 'active',
      subscriptionEndDate,
    });

    console.log(`✅ Abonnement ${payment.plan} activé pour utilisateur ${payment.userId}`);
  }

  /**
   * Paiement échoué
   */
  async handlePaymentFailed(payment: Payment, reason: string): Promise<void> {
    await db.updatePayment(payment.id, { status: 'failed' });
    console.log(`❌ Paiement échoué (${reason}) pour ${payment.userId}`);
  }

  /**
   * Paiement partiel
   */
  async handlePaymentPartial(payment: Payment): Promise<void> {
    await db.updatePayment(payment.id, { status: 'underpaid' });
    console.log(`⚠️ Paiement partiel pour ${payment.userId}`);
  }

  /**
   * Obtenir les paiements d'un utilisateur
   */
  async getUserPayments(userId: string): Promise<Payment[]> {
    return db.getPaymentsByUserId(userId);
  }

  /**
   * Vérifier le statut d'un paiement
   */
  async checkPaymentStatus(paymentId: string) {
    const payment = await db.getPaymentById(paymentId);
    if (!payment) return null;

    return {
      status: payment.status,
      paymentId: payment.id,
      cryptoAmount: payment.cryptoAmount || '0',
      cryptoCurrency: payment.cryptoCurrency || '',
      paidAt: payment.completedAt?.toISOString(),
    };
  }

  /**
   * Simuler un paiement (dev uniquement)
   */
  async simulatePaymentCompletion(paymentId: string): Promise<boolean> {
    if (config.nodeEnv === 'production') {
      console.warn('simulatePaymentCompletion désactivé en production');
      return false;
    }

    const payment = await db.getPaymentById(paymentId);
    if (!payment) return false;

    await this.handlePaymentCompleted(payment, `sim_${paymentId}`, 0.001, 'BTC');
    return true;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
