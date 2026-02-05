import express, { Request, Response } from 'express';
import Message from '../models/Message';

const router = express.Router();

// POST /api/contact - Envoyer un message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs sont requis' 
      });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });
  } catch (error) {
    console.error('Erreur envoi message:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

export default router;
