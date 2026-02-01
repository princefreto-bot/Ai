import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { db } from './database';

// Import routes
import authRoutes from './routes/auth';
import analysisRoutes from './routes/analysis';
import paymentRoutes from './routes/payment';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.nodeEnv === 'production' 
    ? config.frontendUrl 
    : ['http://localhost:5173', 'http://localhost:3000', config.frontendUrl],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Payment-Now-Signature'],
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'TradeScalpSnip API',
    version: '1.0.0',
    description: 'AI-powered trading chart analysis API',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      analysis: '/api/analysis',
      payment: '/api/payment',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
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
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🚀 TradeScalpSnip API Server                               ║
║                                                               ║
║   Environment: ${config.nodeEnv.padEnd(42)}║
║   Port: ${String(PORT).padEnd(50)}║
║   Frontend URL: ${config.frontendUrl.padEnd(40)}║
║                                                               ║
║   Endpoints:                                                  ║
║   • Health:   http://localhost:${PORT}/health                    ║
║   • API:      http://localhost:${PORT}/api                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

export default app;
