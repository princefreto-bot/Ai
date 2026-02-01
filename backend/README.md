# TradeScalpSnip Backend API

Backend API for TradeScalpSnip - AI-powered trading chart analysis platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Analysis
- `POST /api/analysis/upload` - Upload chart image for analysis
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `GET /api/analysis/stats/monthly` - Get monthly statistics

### Payment (NowPayments)
- `POST /api/payment/create` - Create payment session (API method)
- `GET /api/payment/status/:paymentId` - Get payment status
- `GET /api/payment/history` - Get payment history
- `GET /api/payment/plans` - Get available plans
- `GET /api/payment/currencies` - Get available cryptocurrencies
- `POST /api/payment/webhook` - NowPayments IPN webhook

### Health
- `GET /health` - Server health check

## 💰 Payment Integration (NowPayments)

Le frontend utilise le **widget iframe** de NowPayments pour les paiements.
Le backend gère les **webhooks IPN** pour confirmer les paiements.

### Configuration Frontend (Widget)
Le widget est intégré directement dans la page Pricing avec l'ID du widget:
```html
<iframe src="https://nowpayments.io/embeds/payment-widget?iid=VOTRE_WIDGET_ID" ...>
```

### Configuration Backend (IPN Webhook)
```env
NOWPAYMENTS_API_KEY=votre_cle_api
NOWPAYMENTS_IPN_SECRET=votre_secret_ipn
```

### Configurer le webhook IPN dans NowPayments:
1. Connectez-vous à votre dashboard NowPayments
2. Allez dans Settings > IPN
3. Ajoutez l'URL: `https://votre-backend.com/api/payment/webhook`
4. Copiez le IPN Secret et ajoutez-le à vos variables d'environnement

## 🔧 Environment Variables

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

# NowPayments Integration
NOWPAYMENTS_API_KEY=your-api-key
NOWPAYMENTS_IPN_SECRET=your-ipn-secret
```

## 🚢 Deployment on Render

### Option 1: Using render.yaml (Blueprint)
1. Push code to GitHub
2. Create new Blueprint on Render
3. Connect your repository
4. Render will auto-detect render.yaml

### Option 2: Manual Deployment
1. Create new Web Service on Render
2. Connect your repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables

### Environment Variables for Production
- `NODE_ENV`: production
- `JWT_SECRET`: Generate a strong random string
- `FRONTEND_URL`: Your frontend URL
- `NOWPAYMENTS_API_KEY`: Your NowPayments API key
- `NOWPAYMENTS_IPN_SECRET`: Your NowPayments IPN secret

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration
│   ├── database/        # In-memory database
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   └── server.ts        # Express app
├── package.json
├── tsconfig.json
├── render.yaml          # Render deployment config
├── Dockerfile           # Docker configuration
└── README.md
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- IPN signature verification
- Subscription verification

## 🤖 AI Analysis

The current implementation uses simulated AI analysis. For production:

1. Integrate with a real ML model (TensorFlow, PyTorch)
2. Use cloud AI services (AWS Rekognition, Google Vision)
3. Deploy custom model on GPU instances

## 📞 Support

For support, contact support@tradescalpsnip.com
