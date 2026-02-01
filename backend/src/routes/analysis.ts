import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, subscriptionMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { db } from '../database';
import { analysisService } from '../services/analysis';
import { config } from '../config';

const router = Router();

// POST /api/analysis/upload - Upload and analyze chart image
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
        res.status(400).json({
          success: false,
          error: 'Image file is required',
        });
        return;
      }

      // Check analysis limit for Pro users
      if (req.user!.plan === 'pro') {
        const analysisCount = await db.countUserAnalysesThisMonth(userId);
        if (analysisCount >= config.plans.pro.analysisLimit) {
          res.status(403).json({
            success: false,
            error: 'Monthly analysis limit reached. Upgrade to Enterprise for unlimited analyses.',
            code: 'LIMIT_REACHED',
          });
          return;
        }
      }

      // Generate image URL (in production, upload to cloud storage)
      const imageUrl = `/uploads/${uuidv4()}-${file.originalname}`;

      // Perform AI analysis
      const analysis = await analysisService.analyzeChart(
        file.buffer,
        userId,
        imageUrl
      );

      // Save analysis to database
      await db.createAnalysis(analysis);

      res.json({
        success: true,
        data: { analysis },
        message: 'Analysis completed successfully',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze image',
      });
    }
  }
);

// GET /api/analysis/history - Get user's analysis history
router.get(
  '/history',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const limit = parseInt(req.query.limit as string) || 50;

      const analyses = await db.getAnalysesByUserId(userId, limit);

      res.json({
        success: true,
        data: { analyses },
      });
    } catch (error) {
      console.error('Get history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get analysis history',
      });
    }
  }
);

// GET /api/analysis/:id - Get specific analysis
router.get(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const analysisId = req.params.id;

      const analysis = await db.getAnalysisById(analysisId);

      if (!analysis) {
        res.status(404).json({
          success: false,
          error: 'Analysis not found',
        });
        return;
      }

      // Ensure user owns this analysis
      if (analysis.userId !== userId) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        });
        return;
      }

      res.json({
        success: true,
        data: { analysis },
      });
    } catch (error) {
      console.error('Get analysis error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get analysis',
      });
    }
  }
);

// GET /api/analysis/stats/monthly - Get monthly stats
router.get(
  '/stats/monthly',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      
      const analysisCount = await db.countUserAnalysesThisMonth(userId);
      const analyses = await db.getAnalysesByUserId(userId, 100);
      
      // Calculate stats
      const thisMonthAnalyses = analyses.filter(a => {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        return a.createdAt >= startOfMonth;
      });

      const buySignals = thisMonthAnalyses.filter(a => a.signal === 'BUY').length;
      const sellSignals = thisMonthAnalyses.filter(a => a.signal === 'SELL').length;
      const waitSignals = thisMonthAnalyses.filter(a => a.signal === 'WAIT').length;
      
      const avgConfidence = thisMonthAnalyses.length > 0
        ? Math.round(thisMonthAnalyses.reduce((sum, a) => sum + a.confidence, 0) / thisMonthAnalyses.length)
        : 0;

      const limit = req.user!.plan === 'pro' 
        ? config.plans.pro.analysisLimit 
        : -1;

      res.json({
        success: true,
        data: {
          totalAnalyses: analysisCount,
          limit,
          remaining: limit === -1 ? -1 : Math.max(0, limit - analysisCount),
          signals: {
            buy: buySignals,
            sell: sellSignals,
            wait: waitSignals,
          },
          avgConfidence,
        },
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get statistics',
      });
    }
  }
);

export default router;
