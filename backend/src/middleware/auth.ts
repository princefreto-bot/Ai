import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { db } from '../database';
import { AuthTokenPayload, UserPublic } from '../types';

// Extend Express Request type
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
        error: 'Access token required',
      });
      return;
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;
      
      const user = await db.getUserById(decoded.userId);
      
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      // Attach user to request (without password)
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
      };
      req.userId = user.id;
      
      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authentication error',
    });
  }
};

// Optional auth - doesn't fail if no token, but attaches user if present
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
      const user = await db.getUserById(decoded.userId);
      
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEndDate: user.subscriptionEndDate,
        };
        req.userId = user.id;
      }
    } catch {
      // Token invalid, continue without user
    }
    
    next();
  } catch (error) {
    next();
  }
};

// Subscription check middleware
export const subscriptionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }

  if (req.user.subscriptionStatus !== 'active') {
    res.status(403).json({
      success: false,
      error: 'Active subscription required',
      code: 'SUBSCRIPTION_REQUIRED',
    });
    return;
  }

  // Check if subscription has expired
  if (req.user.subscriptionEndDate && new Date(req.user.subscriptionEndDate) < new Date()) {
    res.status(403).json({
      success: false,
      error: 'Subscription has expired',
      code: 'SUBSCRIPTION_EXPIRED',
    });
    return;
  }

  next();
};
