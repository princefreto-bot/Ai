import { Router, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models';
import { authMiddleware } from '../middleware/auth';

const router = Router();

interface AuthTokenPayload {
  userId: string;
  email: string;
}

const generateToken = (userId: string, email: string): string => {
  const payload: AuthTokenPayload = { userId, email };
  const options: SignOptions = { expiresIn: config.jwtExpiresIn as any };
  return jwt.sign(payload, config.jwtSecret, options);
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ success: false, error: 'Email, mot de passe et nom sont requis' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(409).json({ success: false, error: 'Cet email est déjà enregistré' });
      return;
    }

    // Créer le nouvel utilisateur (le mot de passe sera hashé automatiquement)
    const user = new User({
      email: email.toLowerCase().trim(),
      password,
      name: name.trim(),
      isSubscribed: false,
      subscriptionPlan: 'free',
      analysisCount: 0,
      maxAnalysis: 0
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isSubscribed: user.isSubscribed,
          subscriptionPlan: user.subscriptionPlan,
          analysisCount: user.analysisCount,
          maxAnalysis: user.maxAnalysis
        },
        token
      }
    });
  } catch (error: any) {
    console.error('Erreur inscription:', error);
    
    // Gestion des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ success: false, error: messages.join(', ') });
      return;
    }
    
    res.status(500).json({ success: false, error: 'Échec de la création du compte' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email et mot de passe requis' });
      return;
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({ success: false, error: 'Email ou mot de passe invalide' });
      return;
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(401).json({ success: false, error: 'Email ou mot de passe invalide' });
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

    const token = generateToken(user._id.toString(), user.email);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isSubscribed: user.isSubscribed,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
          analysisCount: user.analysisCount,
          maxAnalysis: user.maxAnalysis
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ success: false, error: 'Échec de la connexion' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
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

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isSubscribed: user.isSubscribed,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
          analysisCount: user.analysisCount,
          maxAnalysis: user.maxAnalysis
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({ success: false, error: 'Échec de la récupération du profil' });
  }
});

// PUT /api/auth/profile
router.put('/profile', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Le nom est requis' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name.trim(), updatedAt: new Date() },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          isSubscribed: user.isSubscribed,
          subscriptionPlan: user.subscriptionPlan
        }
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    res.status(500).json({ success: false, error: 'Échec de la mise à jour du profil' });
  }
});

// PUT /api/auth/password
router.put('/password', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, error: 'Mot de passe actuel et nouveau requis' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ success: false, error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      return;
    }

    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      res.status(401).json({ success: false, error: 'Mot de passe actuel incorrect' });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur changement mot de passe:', error);
    res.status(500).json({ success: false, error: 'Échec du changement de mot de passe' });
  }
});

export default router;
