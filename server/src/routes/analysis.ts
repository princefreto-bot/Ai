import { Router, Request, Response } from 'express';
import { authMiddleware, subscriptionMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { Analysis, User } from '../models';
import { analysisService } from '../services/analysis';
import { config } from '../config';

const router = Router();

// POST /api/analysis/upload
router.post(
  '/upload',
  authMiddleware,
  subscriptionMiddleware,
  upload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const file = req.file;

      if (!file) {
        res.status(400).json({ success: false, error: 'Une image est requise' });
        return;
      }

      // Récupérer l'utilisateur
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
        return;
      }

      // Vérifier la limite pour les utilisateurs Pro
      if (user.subscriptionPlan === 'pro') {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const analysisCount = await Analysis.countDocuments({
          userId,
          createdAt: { $gte: startOfMonth }
        });

        if (analysisCount >= config.plans.pro.analysisLimit) {
          res.status(403).json({
            success: false,
            error: 'Limite mensuelle atteinte. Passez à Enterprise.',
            code: 'LIMIT_REACHED'
          });
          return;
        }
      }

      // Analyser le graphique
      const analysisResult = await analysisService.analyzeChart(file.buffer);

      // Sauvegarder l'analyse dans MongoDB
      const analysis = new Analysis({
        userId,
        imageUrl: `/uploads/${Date.now()}-${file.originalname}`,
        signal: analysisResult.signal,
        confidence: analysisResult.confidence,
        grade: analysisResult.grade,
        entryZone: analysisResult.entryZone,
        stopLoss: analysisResult.stopLoss,
        takeProfit: analysisResult.takeProfit,
        patterns: analysisResult.patterns,
        explanation: analysisResult.explanation
      });

      await analysis.save();

      // Mettre à jour le compteur d'analyses de l'utilisateur
      await User.findByIdAndUpdate(userId, { $inc: { analysisCount: 1 } });

      res.json({
        success: true,
        data: {
          analysis: {
            id: analysis._id,
            signal: analysis.signal,
            confidence: analysis.confidence,
            grade: analysis.grade,
            entryZone: analysis.entryZone,
            stopLoss: analysis.stopLoss,
            takeProfit: analysis.takeProfit,
            patterns: analysis.patterns,
            explanation: analysis.explanation,
            createdAt: analysis.createdAt
          }
        },
        message: 'Analyse terminée'
      });
    } catch (error) {
      console.error('Erreur analyse:', error);
      res.status(500).json({ success: false, error: 'Échec de l\'analyse' });
    }
  }
);

// GET /api/analysis/history
router.get('/history', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 50;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const [analyses, total] = await Promise.all([
      Analysis.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Analysis.countDocuments({ userId })
    ]);

    res.json({
      success: true,
      data: {
        analyses: analyses.map(a => ({
          id: a._id,
          signal: a.signal,
          confidence: a.confidence,
          grade: a.grade,
          entryZone: a.entryZone,
          stopLoss: a.stopLoss,
          takeProfit: a.takeProfit,
          patterns: a.patterns,
          explanation: a.explanation,
          createdAt: a.createdAt
        })),
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur historique:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération de l\'historique' });
  }
});

// GET /api/analysis/stats/monthly
router.get('/stats/monthly', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Récupérer les stats du mois
    const [totalAnalyses, signalStats, avgConfidenceResult, user] = await Promise.all([
      Analysis.countDocuments({ userId, createdAt: { $gte: startOfMonth } }),
      Analysis.aggregate([
        { $match: { userId, createdAt: { $gte: startOfMonth } } },
        { $group: { _id: '$signal', count: { $sum: 1 } } }
      ]),
      Analysis.aggregate([
        { $match: { userId, createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, avgConfidence: { $avg: '$confidence' } } }
      ]),
      User.findById(userId)
    ]);

    const signals = { buy: 0, sell: 0, wait: 0 };
    signalStats.forEach((stat: any) => {
      if (stat._id === 'BUY') signals.buy = stat.count;
      if (stat._id === 'SELL') signals.sell = stat.count;
      if (stat._id === 'WAIT') signals.wait = stat.count;
    });

    const avgConfidence = avgConfidenceResult.length > 0
      ? Math.round(avgConfidenceResult[0].avgConfidence)
      : 0;

    const limit = user?.subscriptionPlan === 'pro' ? config.plans.pro.analysisLimit : -1;

    res.json({
      success: true,
      data: {
        totalAnalyses,
        limit,
        remaining: limit === -1 ? -1 : Math.max(0, limit - totalAnalyses),
        signals,
        avgConfidence
      }
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération des stats' });
  }
});

// GET /api/analysis/:id
router.get('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const analysisId = req.params.id;

    const analysis = await Analysis.findById(analysisId).lean();

    if (!analysis) {
      res.status(404).json({ success: false, error: 'Analyse non trouvée' });
      return;
    }

    if (analysis.userId.toString() !== userId) {
      res.status(403).json({ success: false, error: 'Accès refusé' });
      return;
    }

    res.json({
      success: true,
      data: {
        analysis: {
          id: analysis._id,
          signal: analysis.signal,
          confidence: analysis.confidence,
          grade: analysis.grade,
          entryZone: analysis.entryZone,
          stopLoss: analysis.stopLoss,
          takeProfit: analysis.takeProfit,
          patterns: analysis.patterns,
          explanation: analysis.explanation,
          createdAt: analysis.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération analyse:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération de l\'analyse' });
  }
});

// DELETE /api/analysis/:id
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const analysisId = req.params.id;

    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
      res.status(404).json({ success: false, error: 'Analyse non trouvée' });
      return;
    }

    if (analysis.userId.toString() !== userId) {
      res.status(403).json({ success: false, error: 'Accès refusé' });
      return;
    }

    await Analysis.findByIdAndDelete(analysisId);

    res.json({ success: true, message: 'Analyse supprimée' });
  } catch (error) {
    console.error('Erreur suppression analyse:', error);
    res.status(500).json({ success: false, error: 'Échec de la suppression' });
  }
});

export default router;
