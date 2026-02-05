import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  jwtExpiresIn: '7d',
  
  // NowPayments - PAIEMENT CRYPTO
  nowPayments: {
    apiKey: process.env.NOWPAYMENTS_API_KEY || '',
    ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET || '',
    baseUrl: 'https://api.nowpayments.io/v1',
  },
  
  // Cryptos supportées
  supportedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'LTC', 'XRP', 'DOGE'] as const,
  
  // Plans et tarifs (en USD)
  plans: {
    pro: {
      price: 20,
      name: 'Pro',
      analysisLimit: 100,
      duration: 30,
    },
    enterprise: {
      price: 99,
      name: 'Enterprise',
      analysisLimit: -1,
      duration: 30,
    },
    custom: {
      price: 9,
      name: 'Custom Analysis',
      analysisLimit: 0,
      duration: 0,
    },
  },
  
  // Configuration upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

// Validation en production
if (config.nodeEnv === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'dev-secret-change-in-production') {
    console.error('❌ JWT_SECRET doit être configuré en production!');
    process.exit(1);
  }
  
  if (!config.nowPayments.ipnSecret) {
    console.warn('⚠️ NOWPAYMENTS_IPN_SECRET non configuré - Vérification des webhooks désactivée');
  }
}

export default config;
