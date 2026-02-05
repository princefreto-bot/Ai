import express, { Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Analysis from '../models/Analysis';
import Payment from '../models/Payment';
import Message from '../models/Message';
import { analyzeImage } from '../services/analysis';

const router = express.Router();

// Middleware Admin
const adminMiddleware = async (req: AuthRequest, res: Response, next: Function) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Accès refusé. Admin requis.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
};

// GET /api/admin/stats - Statistiques globales
router.get('/stats', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const subscribedUsers = await User.countDocuments({ isSubscribed: true });
    const totalAnalyses = await Analysis.countDocuments();
    const totalPayments = await Payment.countDocuments({ status: 'confirmed' });
    
    const revenueResult = await Payment.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Utilisateurs récents (7 derniers jours)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = await User.countDocuments({ createdAt: { $gte: weekAgo } });

    // Analyses par jour (7 derniers jours)
    const analysesPerDay = await Analysis.aggregate([
      { $match: { createdAt: { $gte: weekAgo } } },
      { 
        $group: { 
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        subscribedUsers,
        freeUsers: totalUsers - subscribedUsers,
        totalAnalyses,
        totalPayments,
        totalRevenue,
        newUsersThisWeek,
        analysesPerDay,
        conversionRate: totalUsers > 0 ? ((subscribedUsers / totalUsers) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Erreur stats admin:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// GET /api/admin/users - Liste des utilisateurs
router.get('/users', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur liste users:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// PUT /api/admin/users/:id - Modifier un utilisateur
router.put('/users/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { isSubscribed, subscriptionPlan, role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isSubscribed, 
        subscriptionPlan,
        role,
        ...(isSubscribed && { 
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          maxAnalysis: subscriptionPlan === 'enterprise' ? 999999 : 100
        })
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Erreur modification user:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// DELETE /api/admin/users/:id - Supprimer un utilisateur
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    }

    // Supprimer aussi ses analyses
    await Analysis.deleteMany({ userId: req.params.id });

    res.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error('Erreur suppression user:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// POST /api/admin/analyze - Analyse gratuite pour admin
router.post('/analyze', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { imageData, imageName } = req.body;

    if (!imageData) {
      return res.status(400).json({ success: false, error: 'Image requise' });
    }

    // Analyse sans limite pour admin
    const result = await analyzeImage(imageData);

    // Sauvegarder l'analyse
    const analysis = new Analysis({
      userId: req.userId,
      imageUrl: imageName || 'admin-analysis.png',
      signal: result.signal,
      confidence: result.confidence,
      grade: result.grade,
      entryZone: result.entryZone,
      stopLoss: result.stopLoss,
      takeProfit: result.takeProfit,
      patterns: result.patterns,
      explanation: result.explanation
    });

    await analysis.save();

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Erreur analyse admin:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'analyse' });
  }
});

// GET /api/admin/analyses - Toutes les analyses
router.get('/analyses', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Analysis.countDocuments();

    res.json({
      success: true,
      data: {
        analyses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur liste analyses:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// GET /api/admin/payments - Historique des paiements
router.get('/payments', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, data: payments });
  } catch (error) {
    console.error('Erreur liste payments:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// GET /api/admin/messages - Messages de contact
router.get('/messages', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Erreur liste messages:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// PUT /api/admin/messages/:id - Marquer comme lu/répondu
router.put('/messages/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message non trouvé' });
    }

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// DELETE /api/admin/messages/:id - Supprimer un message
router.delete('/messages/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

export default router;
