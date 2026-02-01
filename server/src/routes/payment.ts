import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { paymentService } from '../services/payment';
import { config } from '../config';

const router = Router();

// GET /api/payment/status/:paymentId
router.get('/status/:paymentId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;
    const status = await paymentService.checkPaymentStatus(paymentId);

    if (!status) {
      res.status(404).json({ success: false, error: 'Payment not found' });
      return;
    }

    res.json({ success: true, data: { payment: status } });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ success: false, error: 'Failed to get payment status' });
  }
});

// POST /api/payment/demo/complete - Test only
router.post('/demo/complete', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    if (config.nodeEnv === 'production') {
      res.status(403).json({ success: false, error: 'Not allowed in production' });
      return;
    }

    const { paymentId } = req.body;
    if (!paymentId) {
      res.status(400).json({ success: false, error: 'Payment ID required' });
      return;
    }

    const success = await paymentService.simulatePaymentCompletion(paymentId);
    if (!success) {
      res.status(404).json({ success: false, error: 'Payment not found' });
      return;
    }

    res.json({ success: true, message: 'Payment completed (demo)' });
  } catch (error) {
    console.error('Demo payment error:', error);
    res.status(500).json({ success: false, error: 'Failed' });
  }
});

// GET /api/payment/history
router.get('/history', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const payments = await paymentService.getUserPayments(userId);
    res.json({ success: true, data: { payments } });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ success: false, error: 'Failed to get history' });
  }
});

// POST /api/payment/webhook - NowPayments IPN
router.post('/webhook', async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-nowpayments-sig'] as string;
    const payload = JSON.stringify(req.body);

    if (config.nowPayments.ipnSecret) {
      const isValid = paymentService.verifyIPNSignature(payload, signature);
      if (!isValid) {
        console.error('[Webhook] Invalid signature');
        res.status(401).json({ success: false, error: 'Invalid signature' });
        return;
      }
    }

    await paymentService.processIPN(req.body);
    res.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Webhook failed' });
  }
});

// GET /api/payment/plans
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
            'Take Profit levels',
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
            'Priority processing',
            'API access',
            'Dedicated support',
          ],
        },
      ],
      paymentMethod: 'NowPayments (Crypto)',
      supportedCryptos: config.supportedCryptos,
    },
  });
});

export default router;
