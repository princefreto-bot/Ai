import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  jwtExpiresIn: '7d',
  
  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // NowPayments - PAIEMENT CRYPTO UNIQUEMENT
  nowPayments: {
    // Clé API pour authentification
    apiKey: process.env.NOWPAYMENTS_API_KEY || '',
    
    // Secret IPN pour vérification des webhooks
    ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET || '',
    
    // URL de l'API NowPayments (production)
    baseUrl: 'https://api.nowpayments.io/v1',
  },
  
  // Cryptos supportées
  supportedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'LTC', 'XRP', 'DOGE'] as const,
  
  // Plans et tarifs (en USD)
  plans: {
    pro: {
      price: 20, // $20.00
      name: 'Pro',
      analysisLimit: 100,
      duration: 30, // jours
    },
    enterprise: {
      price: 99, // $99.00
      name: 'Enterprise',
      analysisLimit: -1, // illimité
      duration: 30, // jours
    },
  },
  
  // Configuration upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

// Validation de la configuration en production
if (config.nodeEnv === 'production') {
  const missingEnvVars: string[] = [];
  
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'dev-secret-change-in-production') {
    missingEnvVars.push('JWT_SECRET');
  }
  
  if (!config.nowPayments.apiKey) {
    console.warn('⚠️ NOWPAYMENTS_API_KEY non configurée - Mode widget uniquement');
  }
  
  if (!config.nowPayments.ipnSecret) {
    console.warn('⚠️ NOWPAYMENTS_IPN_SECRET non configuré - Vérification des webhooks désactivée');
  }
  
  if (missingEnvVars.length > 0) {
    console.error(`❌ Variables d'environnement manquantes: ${missingEnvVars.join(', ')}`);
    process.exit(1);
  }
}

export default config;
