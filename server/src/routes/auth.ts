import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { db } from '../database';
import { authMiddleware } from '../middleware/auth';
import { User, AuthTokenPayload } from '../types';

const router = Router();

const generateToken = (userId: string, email: string): string => {
  const payload: AuthTokenPayload = { userId, email };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ success: false, error: 'Email, password, and name are required' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ success: false, error: 'Password must be at least 8 characters' });
      return;
    }

    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ success: false, error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user: User = {
      id: uuidv4(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      plan: 'none',
      subscriptionStatus: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.createUser(user);
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Failed to create account' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required' });
      return;
    }

    const user = await db.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
      return;
    }

    // Check subscription expiry
    if (user.subscriptionStatus === 'active' && user.subscriptionEndDate) {
      if (new Date(user.subscriptionEndDate) < new Date()) {
        await db.updateUser(user.id, { subscriptionStatus: 'inactive' });
        user.subscriptionStatus = 'inactive';
      }
    }

    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEndDate: user.subscriptionEndDate,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Failed to login' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  res.json({ success: true, data: { user: req.user } });
});

// PUT /api/auth/profile
router.put('/profile', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = req.userId!;

    if (!name || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }

    const updatedUser = await db.updateUser(userId, { name: name.trim() });

    if (!updatedUser) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          plan: updatedUser.plan,
          subscriptionStatus: updatedUser.subscriptionStatus,
        },
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

export default router;
