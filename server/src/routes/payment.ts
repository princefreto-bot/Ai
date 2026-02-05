import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { authMiddleware } from '../middleware/auth';
import { Payment, User } from '../models';
import { config } from '../config';

const router = Router();

// Vérifier la signature IPN de NowPayments
const verifyIPNSignature = (payload: string, signature: string): boolean => {
  if (!config.nowPayments.ipnSecret) return true; // Mode démo
  
  const hmac = crypto.createHmac('sha512', config.nowPayments.ipnSecret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return calculatedSignature === signature;
};

// Activer l'abonnement utilisateur
const activateSubscription = async (userId: string, plan: 'pro' | 'enterprise' | 'custom'): Promise<void> => {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1); // +1 mois

  const maxAnalysis = plan === 'enterprise' ? -1 : config.plans.pro.analysisLimit;

  await User.findByIdAndUpdate(userId, {
    isSubscribed: true,
    subscriptionPlan: plan,
    subscriptionEndDate: endDate,
    maxAnalysis,
    updatedAt: new Date()
  });

  console.log(`✅ Abonnement ${plan} activé pour l'utilisateur ${userId}`);
};

// GET /api/payment/plans
router.get('/plans', async (_req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    data: {
      plans: [
        {
          id: 'pro',
          name: 'Pro',
          price: config.plans.pro.price,
          currency: 'USD',
          features: [
            '100 analyses par mois',
            'Signaux IA avancés',
            'Zones d\'entrée & Stop Loss',
            'Niveaux Take Profit',
            'Détection de patterns',
            'Support email'
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: config.plans.enterprise.price,
          currency: 'USD',
          features: [
            'Analyses illimitées',
            'Tout ce qui est inclus dans Pro',
            'Traitement prioritaire',
            'Accès API',
            'Support dédié'
          ]
        }
      ],
      paymentMethod: 'NowPayments (Crypto)',
      supportedCryptos: config.supportedCryptos
    }
  });
});

// GET /api/payment/status/:paymentId
router.get('/status/:paymentId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;
    const userId = req.userId!;

    const payment = await Payment.findOne({ paymentId, userId }).lean();

    if (!payment) {
      res.status(404).json({ success: false, error: 'Paiement non trouvé' });
      return;
    }

    res.json({
      success: true,
      data: {
        payment: {
          id: payment._id,
          paymentId: payment.paymentId,
          status: payment.status,
          plan: payment.plan,
          amount: payment.amount,
          cryptoCurrency: payment.cryptoCurrency,
          cryptoAmount: payment.cryptoAmount,
          createdAt: payment.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Erreur status paiement:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération du statut' });
  }
});

// GET /api/payment/history
router.get('/history', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 20;

    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: {
        payments: payments.map(p => ({
          id: p._id,
          paymentId: p.paymentId,
          status: p.status,
          plan: p.plan,
          amount: p.amount,
          cryptoCurrency: p.cryptoCurrency,
          cryptoAmount: p.cryptoAmount,
          createdAt: p.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Erreur historique paiements:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération de l\'historique' });
  }
});

// POST /api/payment/webhook - NowPayments IPN
router.post('/webhook', async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-nowpayments-sig'] as string;
    const payload = JSON.stringify(req.body);

    // Vérifier la signature
    if (config.nowPayments.ipnSecret) {
      const isValid = verifyIPNSignature(payload, signature);
      if (!isValid) {
        console.error('[Webhook] Signature invalide');
        res.status(401).json({ success: false, error: 'Signature invalide' });
        return;
      }
    }

    const ipnData = req.body;
    console.log('[Webhook] IPN reçu:', ipnData);

    // Trouver le paiement
    const payment = await Payment.findOne({
      $or: [
        { nowPaymentsId: ipnData.payment_id?.toString() },
        { orderId: ipnData.order_id }
      ]
    });

    if (!payment) {
      console.error('[Webhook] Paiement non trouvé:', ipnData.payment_id || ipnData.order_id);
      res.status(404).json({ success: false, error: 'Paiement non trouvé' });
      return;
    }

    // Mettre à jour le statut
    const statusMap: Record<string, string> = {
      'waiting': 'waiting',
      'confirming': 'confirming',
      'confirmed': 'confirmed',
      'sending': 'sending',
      'partially_paid': 'waiting',
      'finished': 'finished',
      'failed': 'failed',
      'refunded': 'refunded',
      'expired': 'expired'
    };

    const newStatus = statusMap[ipnData.payment_status] || 'waiting';
    payment.status = newStatus as any;
    
    if (ipnData.payment_id) {
      payment.nowPaymentsId = ipnData.payment_id.toString();
    }

    await payment.save();

    // Si le paiement est terminé, activer l'abonnement
    if (newStatus === 'finished' || newStatus === 'confirmed') {
      await activateSubscription(payment.userId.toString(), payment.plan);
    }

    res.json({ success: true, received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    res.status(500).json({ success: false, error: 'Échec du traitement webhook' });
  }
});

// POST /api/payment/create - Créer un paiement (pour tracking interne)
router.post('/create', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { plan, cryptoCurrency } = req.body;

    if (!plan || !['pro', 'enterprise', 'custom'].includes(plan)) {
      res.status(400).json({ success: false, error: 'Plan invalide' });
      return;
    }

    const amount = plan === 'pro' ? config.plans.pro.price : plan === 'enterprise' ? config.plans.enterprise.price : config.plans.custom.price;
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const orderId = `ORD-${Date.now()}`;

    const payment = new Payment({
      userId,
      paymentId,
      orderId,
      status: 'waiting',
      plan,
      amount,
      currency: 'USD',
      cryptoCurrency: cryptoCurrency || 'BTC',
      cryptoAmount: 0, // Sera mis à jour par le webhook
      walletAddress: '' // Sera mis à jour par le webhook
    });

    await payment.save();

    res.json({
      success: true,
      data: {
        payment: {
          id: payment._id,
          paymentId: payment.paymentId,
          orderId: payment.orderId,
          amount: payment.amount,
          plan: payment.plan
        }
      }
    });
  } catch (error) {
    console.error('Erreur création paiement:', error);
    res.status(500).json({ success: false, error: 'Échec de la création du paiement' });
  }
});

// POST /api/payment/demo/complete - Test only (mode démo)
router.post('/demo/complete', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    if (config.nodeEnv === 'production') {
      res.status(403).json({ success: false, error: 'Non autorisé en production' });
      return;
    }

    const { plan } = req.body;
    const userId = req.userId!;

    if (!plan || !['pro', 'enterprise'].includes(plan)) {
      res.status(400).json({ success: false, error: 'Plan invalide' });
      return;
    }

    // Activer directement l'abonnement (mode démo)
    await activateSubscription(userId, plan);

    res.json({ success: true, message: 'Abonnement activé (démo)' });
  } catch (error) {
    console.error('Erreur démo paiement:', error);
    res.status(500).json({ success: false, error: 'Échec' });
  }
});

export default router;
