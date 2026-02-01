import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { paymentService } from '../services/payment';
import { config } from '../config';

const router = Router();

// POST /api/payment/create - Create payment via API (alternative to widget)
router.post(
  '/create',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const { plan, payCurrency } = req.body;

      // Validate plan
      if (!plan || !['pro', 'enterprise'].includes(plan)) {
        res.status(400).json({
          success: false,
          error: 'Invalid plan. Choose "pro" or "enterprise"',
        });
        return;
      }

      // Create payment
      const result = await paymentService.createPayment(
        userId,
        plan as 'pro' | 'enterprise',
        payCurrency || 'btc'
      );

      if (!result.success) {
        res.status(500).json({
          success: false,
          error: result.error || 'Failed to create payment',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          paymentUrl: result.paymentUrl,
        },
        message: 'Payment created. Redirect user to payment URL.',
      });
    } catch (error) {
      console.error('Create payment error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create payment session',
      });
    }
  }
);

// GET /api/payment/status/:paymentId - Get payment status
router.get(
  '/status/:paymentId',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { paymentId } = req.params;

      const status = await paymentService.checkPaymentStatus(paymentId);

      if (!status) {
        res.status(404).json({
          success: false,
          error: 'Payment not found',
        });
        return;
      }

      res.json({
        success: true,
        data: { payment: status },
      });
    } catch (error) {
      console.error('Get payment status error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get payment status',
      });
    }
  }
);

// POST /api/payment/demo/complete - Complete demo payment (for testing)
router.post(
  '/demo/complete',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Only allow in development mode
      if (config.nodeEnv === 'production') {
        res.status(403).json({
          success: false,
          error: 'Demo payments not allowed in production',
        });
        return;
      }

      const { paymentId } = req.body;

      if (!paymentId) {
        res.status(400).json({
          success: false,
          error: 'Payment ID is required',
        });
        return;
      }

      const success = await paymentService.simulatePaymentCompletion(paymentId);

      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Payment not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Payment completed successfully (demo mode)',
      });
    } catch (error) {
      console.error('Demo payment error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to complete demo payment',
      });
    }
  }
);

// GET /api/payment/history - Get payment history
router.get(
  '/history',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;

      const payments = await paymentService.getUserPayments(userId);

      res.json({
        success: true,
        data: { payments },
      });
    } catch (error) {
      console.error('Get payment history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get payment history',
      });
    }
  }
);

// POST /api/payment/webhook - NowPayments IPN webhook
router.post(
  '/webhook',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const signature = req.headers['x-nowpayments-sig'] as string;
      const payload = JSON.stringify(req.body);

      // Verify signature if IPN secret is configured
      if (config.nowPayments.ipnSecret) {
        const isValid = paymentService.verifyIPNSignature(payload, signature);
        if (!isValid) {
          console.error('[NowPayments Webhook] Invalid signature');
          res.status(401).json({
            success: false,
            error: 'Invalid webhook signature',
          });
          return;
        }
      }

      // Process IPN
      await paymentService.processIPN(req.body);

      res.json({ success: true, received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({
        success: false,
        error: 'Webhook processing failed',
      });
    }
  }
);

// GET /api/payment/plans - Get available plans
router.get('/plans', async (req: Request, res: Response): Promise<void> => {
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
            '100 analyses per month',
            'AI-powered signals',
            'Entry zones & Stop Loss',
            'Take Profit levels (TP1, TP2, TP3)',
            'Pattern detection',
            'Email support',
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: config.plans.enterprise.price,
          currency: 'USD',
          features: [
            'Unlimited analyses',
            'Everything in Pro',
            'Priority AI processing',
            'Advanced pattern recognition',
            'API access',
            'Dedicated support',
            'Custom integrations',
          ],
        },
      ],
      paymentMethod: 'NowPayments (Crypto)',
      supportedCryptos: config.supportedCryptos,
    },
  });
});

// GET /api/payment/currencies - Get available cryptocurrencies
router.get('/currencies', async (req: Request, res: Response): Promise<void> => {
  try {
    const currencies = await paymentService.getAvailableCurrencies();

    res.json({
      success: true,
      data: { currencies },
    });
  } catch (error) {
    console.error('Get currencies error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get available currencies',
    });
  }
});

export default router;
