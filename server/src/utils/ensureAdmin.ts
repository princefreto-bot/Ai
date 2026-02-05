import { config as dotenvConfig } from 'dotenv';
import User from '../models/User';

dotenvConfig();

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tradescalpsnip.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminSecret2026!';
const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME || 'Super Admin';

export async function ensureAdmin() {
  try {
    const existing = await User.findOne({ email: DEFAULT_ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        console.log(`🔐 Rôle admin accordé à ${DEFAULT_ADMIN_EMAIL}`);
      } else {
        console.log(`✅ Admin déjà présent: ${DEFAULT_ADMIN_EMAIL}`);
      }
      return;
    }

    const admin = new User({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
      name: DEFAULT_ADMIN_NAME,
      role: 'admin',
      isSubscribed: true,
      subscriptionPlan: 'enterprise',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      analysisCount: 0,
      maxAnalysis: 999999,
    });

    await admin.save();
    console.log(`👑 Admin créé: ${DEFAULT_ADMIN_EMAIL} / (mot de passe défini)\n   ➜ Modifiez ADMIN_EMAIL / ADMIN_PASSWORD dans l'environnement si besoin.`);
  } catch (error) {
    console.error('❌ ensureAdmin error:', error);
  }
}

export default ensureAdmin;
