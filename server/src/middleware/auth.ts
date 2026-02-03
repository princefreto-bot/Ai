import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models';

interface AuthTokenPayload {
  userId: string;
  email: string;
}

interface UserPublic {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  subscriptionEndDate?: Date | null;
  analysisCount: number;
  maxAnalysis: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPublic;
      userId?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Token d\'accès requis'
      });
      return;
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
        return;
      }

      // Vérifier si l'abonnement a expiré
      if (user.isSubscribed && user.subscriptionEndDate) {
        if (new Date(user.subscriptionEndDate) < new Date()) {
          user.isSubscribed = false;
          user.subscriptionPlan = 'free';
          await user.save();
        }
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isSubscribed: user.isSubscribed,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionEndDate: user.subscriptionEndDate,
        analysisCount: user.analysisCount,
        maxAnalysis: user.maxAnalysis
      };
      req.userId = user._id.toString();
      
      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        error: 'Token invalide ou expiré'
      });
      return;
    }
  } catch (error) {
    console.error('Erreur authentification:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur d\'authentification'
    });
  }
};

export const subscriptionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentification requise'
    });
    return;
  }

  if (!req.user.isSubscribed) {
    res.status(403).json({
      success: false,
      error: 'Abonnement actif requis',
      code: 'SUBSCRIPTION_REQUIRED'
    });
    return;
  }

  if (req.user.subscriptionEndDate && new Date(req.user.subscriptionEndDate) < new Date()) {
    res.status(403).json({
      success: false,
      error: 'Abonnement expiré',
      code: 'SUBSCRIPTION_EXPIRED'
    });
    return;
  }

  next();
};

// Middleware optionnel - vérifie l'auth mais ne bloque pas
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;
      const user = await User.findById(decoded.userId);
      
      if (user) {
        req.user = {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          isSubscribed: user.isSubscribed,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
          analysisCount: user.analysisCount,
          maxAnalysis: user.maxAnalysis
        };
        req.userId = user._id.toString();
      }
    } catch {
      // Token invalide, on continue sans authentification
    }
    
    next();
  } catch (error) {
    next();
  }
};
