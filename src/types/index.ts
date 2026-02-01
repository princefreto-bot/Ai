export type Signal = 'BUY' | 'SELL' | 'WAIT';

export type SetupGrade = 'A+' | 'A' | 'B' | 'C';

export interface AnalysisResult {
  id: string;
  imageUrl?: string;
  signal: Signal;
  entryZone: {
    min: number;
    max: number;
  };
  stopLoss: number;
  takeProfit: {
    tp1: number;
    tp2: number;
    tp3: number;
  };
  confidenceLevel: number;
  setupGrade: SetupGrade;
  explanation: string;
  detectedPatterns: string[];
  trend: 'bullish' | 'bearish' | 'neutral';
  momentum: 'strong' | 'moderate' | 'weak';
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'none' | 'pro' | 'enterprise';
  subscriptionStatus: 'inactive' | 'active' | 'cancelled';
  subscriptionEndDate?: string;
  isSubscribed: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}
