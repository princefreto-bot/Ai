import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { config } from './config';
import { db } from './database';

// Import routes
import authRoutes from './routes/auth';
import analysisRoutes from './routes/analysis';
import paymentRoutes from './routes/payment';

const app = express();

// Security middleware (désactivé pour le CSP car on a un iframe NowPayments)
app.use(helmet({
  contentSecurityPolicy: false, // Permet l'iframe NowPayments
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: config.nodeEnv === 'production' 
    ? true // Autorise toutes les origines en production (même domaine)
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-NowPayments-Sig'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    stats: db.getStats(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/payment', paymentRoutes);

// ==================== SERVE FRONTEND ====================
// En production, servir les fichiers statiques du frontend buildé
const frontendPath = path.join(__dirname, '../../dist');

// Servir les fichiers statiques
app.use(express.static(frontendPath));

// Pour toutes les autres routes, servir index.html (SPA routing)
app.get('*', (req, res) => {
  // Ne pas rediriger les requêtes API
  if (req.path.startsWith('/api/') || req.path === '/health') {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found',
    });
    return;
  }
  
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  
  // Handle multer errors
  if (err.message.includes('Invalid file type')) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: config.nodeEnv === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   🚀 TradeScalpSnip - Full Stack Server                           ║
║                                                                    ║
║   Environment: ${config.nodeEnv.padEnd(47)}║
║   Port: ${String(PORT).padEnd(55)}║
║                                                                    ║
║   Endpoints:                                                       ║
║   • Health:    http://localhost:${PORT}/health                        ║
║   • API:       http://localhost:${PORT}/api                           ║
║   • Frontend:  http://localhost:${PORT}/                              ║
║                                                                    ║
║   🌐 NowPayments: Widget iframe mode                               ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
  `);
});

export default app;
