import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { Analysis, Signal, SetupGrade, TakeProfit } from '../types';

// Service d'analyse IA simulé (à remplacer par un vrai modèle ML en production)

const PATTERNS = {
  bullish: [
    'Double Bottom', 'Inverse Head & Shoulders', 'Bullish Engulfing',
    'Morning Star', 'Hammer', 'Bullish Flag', 'Ascending Triangle',
    'Cup and Handle', 'Golden Cross', 'Bullish Divergence RSI',
  ],
  bearish: [
    'Double Top', 'Head & Shoulders', 'Bearish Engulfing',
    'Evening Star', 'Shooting Star', 'Bearish Flag', 'Descending Triangle',
    'Death Cross', 'Bearish Divergence RSI', 'Rising Wedge',
  ],
  neutral: [
    'Symmetrical Triangle', 'Rectangle Pattern', 'Consolidation Zone',
    'Doji Formation', 'Inside Bar',
  ],
};

const EXPLANATIONS = {
  BUY: [
    'Strong bullish momentum detected with multiple confluent signals. Price action shows clear support bounce with increasing volume. RSI indicates oversold conditions recovering.',
    'Technical analysis reveals ascending structure with higher lows. MACD histogram turning positive with bullish crossover imminent.',
    'Chart pattern confirmed with breakout above key resistance. Fibonacci retracement shows 61.8% level holding as support.',
  ],
  SELL: [
    'Bearish reversal pattern identified at major resistance. Volume declining on rallies indicates distribution. RSI showing overbought divergence.',
    'Head and shoulders pattern completing with neckline test. Volume confirms distribution phase. Risk/reward favors short position.',
    'Trend exhaustion signals present. Price failing to make new highs with momentum divergence.',
  ],
  WAIT: [
    'Market in consolidation phase. No clear directional bias detected. Recommend waiting for breakout confirmation.',
    'Mixed signals across timeframes. Volume below average suggests low conviction. Better setups likely to emerge.',
    'Choppy price action with no defined trend. Risk of false breakouts high. Patience recommended.',
  ],
};

class AnalysisService {
  async processImage(buffer: Buffer) {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      size: buffer.length,
    };
  }

  async analyzeChart(imageBuffer: Buffer, userId: string, imageUrl: string): Promise<Analysis> {
    const metadata = await this.processImage(imageBuffer);
    
    // Simuler le temps de traitement
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const result = this.generateAnalysisResult(metadata);
    
    const analysis: Analysis = {
      id: uuidv4(),
      userId,
      imageUrl,
      signal: result.signal,
      confidence: result.confidence,
      grade: result.grade,
      entryZone: result.entryZone,
      stopLoss: result.stopLoss,
      takeProfits: result.takeProfits,
      patterns: result.patterns,
      explanation: result.explanation,
      trend: result.trend,
      momentum: result.momentum,
      supportResistance: result.supportResistance,
      createdAt: new Date(),
    };
    
    return analysis;
  }

  private generateAnalysisResult(metadata: { width: number; height: number; size: number }) {
    const seed = (metadata.width * metadata.height + metadata.size) % 100;
    
    let signal: Signal;
    let trend: 'bullish' | 'bearish' | 'neutral';
    
    if (seed < 35) {
      signal = 'BUY';
      trend = 'bullish';
    } else if (seed < 70) {
      signal = 'SELL';
      trend = 'bearish';
    } else {
      signal = 'WAIT';
      trend = 'neutral';
    }
    
    const confidence = 60 + Math.floor(Math.random() * 35);
    
    let grade: SetupGrade;
    if (confidence >= 90) grade = 'A+';
    else if (confidence >= 80) grade = 'A';
    else if (confidence >= 70) grade = 'B';
    else grade = 'C';
    
    const basePrice = 40000 + Math.floor(Math.random() * 10000);
    const volatility = basePrice * 0.02;
    
    const entryZone = {
      min: Math.round(basePrice - volatility / 2),
      max: Math.round(basePrice + volatility / 2),
    };
    
    let stopLoss: number;
    let takeProfits: TakeProfit[];
    
    if (signal === 'BUY') {
      stopLoss = Math.round(entryZone.min - volatility * 1.5);
      takeProfits = [
        { level: 1, price: Math.round(entryZone.max + volatility), percentage: 2.5 },
        { level: 2, price: Math.round(entryZone.max + volatility * 2), percentage: 5 },
        { level: 3, price: Math.round(entryZone.max + volatility * 3.5), percentage: 8.75 },
      ];
    } else if (signal === 'SELL') {
      stopLoss = Math.round(entryZone.max + volatility * 1.5);
      takeProfits = [
        { level: 1, price: Math.round(entryZone.min - volatility), percentage: 2.5 },
        { level: 2, price: Math.round(entryZone.min - volatility * 2), percentage: 5 },
        { level: 3, price: Math.round(entryZone.min - volatility * 3.5), percentage: 8.75 },
      ];
    } else {
      stopLoss = 0;
      takeProfits = [];
    }
    
    const patternPool = signal === 'BUY' ? PATTERNS.bullish : signal === 'SELL' ? PATTERNS.bearish : PATTERNS.neutral;
    const numPatterns = 2 + Math.floor(Math.random() * 3);
    const patterns = [...patternPool].sort(() => Math.random() - 0.5).slice(0, numPatterns);
    
    const explanations = EXPLANATIONS[signal];
    const explanation = explanations[Math.floor(Math.random() * explanations.length)];
    
    const momentumValue = Math.random();
    const momentum: 'strong' | 'moderate' | 'weak' = 
      momentumValue > 0.7 ? 'strong' : momentumValue > 0.3 ? 'moderate' : 'weak';
    
    const supports = [
      Math.round(basePrice - volatility * 2),
      Math.round(basePrice - volatility * 4),
      Math.round(basePrice - volatility * 6),
    ];
    
    const resistances = [
      Math.round(basePrice + volatility * 2),
      Math.round(basePrice + volatility * 4),
      Math.round(basePrice + volatility * 6),
    ];
    
    return {
      signal,
      confidence,
      grade,
      entryZone,
      stopLoss,
      takeProfits,
      patterns,
      explanation,
      trend,
      momentum,
      supportResistance: { supports, resistances },
    };
  }
}

export const analysisService = new AnalysisService();
export default analysisService;
