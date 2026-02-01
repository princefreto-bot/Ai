// User Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  plan: 'none' | 'pro' | 'enterprise';
  subscriptionStatus: 'inactive' | 'active' | 'cancelled';
  subscriptionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  plan: 'none' | 'pro' | 'enterprise';
  subscriptionStatus: 'inactive' | 'active' | 'cancelled';
  subscriptionEndDate?: Date;
}

// Analysis Types
export type Signal = 'BUY' | 'SELL' | 'WAIT';
export type SetupGrade = 'A+' | 'A' | 'B' | 'C';

export interface TakeProfit {
  level: number;
  price: number;
  percentage: number;
}

export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  signal: Signal;
  confidence: number;
  grade: SetupGrade;
  entryZone: {
    min: number;
    max: number;
  };
  stopLoss: number;
  takeProfits: TakeProfit[];
  patterns: string[];
  explanation: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  momentum: 'strong' | 'moderate' | 'weak';
  supportResistance: {
    supports: number[];
    resistances: number[];
  };
  createdAt: Date;
}

// Crypto Currency Types
export type CryptoCurrency = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'SOL' | 'XRP' | 'MATIC';

// Payment Types - CRYPTO ONLY
export type PaymentStatus = 
  | 'pending' 
  | 'awaiting_payment' 
  | 'confirming' 
  | 'completed' 
  | 'failed' 
  | 'expired' 
  | 'underpaid' 
  | 'overpaid';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  plan: 'pro' | 'enterprise';
  status: PaymentStatus;
  paymentMethod: 'crypto';
  transactionId?: string;
  transactionHash?: string;
  // Crypto specific fields
  cryptoCurrency?: CryptoCurrency;
  cryptoAmount?: string;
  walletAddress?: string;
  // Timestamps
  createdAt: Date;
  completedAt?: Date;
}

// Payment Now Webhook - Crypto
export interface PaymentNowWebhook {
  event: 
    | 'payment.completed' 
    | 'payment.confirmed'
    | 'payment.failed' 
    | 'payment.expired'
    | 'payment.underpaid'
    | 'payment.overpaid'
    | 'subscription.cancelled';
  transactionId: string;
  transactionHash?: string;
  merchantId: string;
  // Fiat amount
  amount: number;
  currency: string;
  // Crypto details
  cryptoAmount?: string;
  cryptoCurrency?: CryptoCurrency;
  walletAddress?: string;
  confirmations?: number;
  requiredConfirmations?: number;
  // Metadata
  metadata: {
    userId: string;
    plan: string;
    payment_id?: string;
  };
  timestamp: string;
  signature: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Payment Request - Crypto
export interface CreateCryptoPaymentRequest {
  plan: 'pro' | 'enterprise';
  cryptoCurrency: CryptoCurrency;
  returnUrl: string;
  cancelUrl: string;
}
