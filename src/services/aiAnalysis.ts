import { AnalysisResult, Signal, SetupGrade } from '@/types';

const patterns = [
  'Triangle ascendant',
  'Double bottom',
  'Head & Shoulders',
  'Bull Flag',
  'Wedge descendant',
  'Support majeur testé',
  'Résistance cassée',
  'Golden Cross',
  'RSI divergence',
  'Volume spike',
  'Consolidation',
  'Breakout confirmé',
  'Trend reversal',
  'Higher highs',
  'Lower lows',
];

const buyExplanations = [
  "Détection d'un breakout haussier confirmé avec volume croissant. Le prix a cassé une résistance majeure et le momentum est fortement positif. RSI en zone neutre avec potentiel de hausse.",
  "Formation d'un double bottom validée avec une cassure de la ligne de cou. Les indicateurs de momentum confirment le retournement haussier. Zone d'accumulation identifiée.",
  "Triangle ascendant détecté avec cassure imminente. Le volume augmente sur les touches de la résistance. Configuration favorable pour une entrée longue.",
];

const sellExplanations = [
  "Pattern de distribution identifié avec un Head & Shoulders validé. Le prix casse le support avec un volume significatif. RSI en surachat montre des signes de faiblesse.",
  "Tendance baissière confirmée avec des plus bas de plus en plus bas. La résistance dynamique rejette le prix. Momentum négatif avec divergence baissière.",
  "Cassure d'un support majeur avec accélération du volume. Les moyennes mobiles se croisent à la baisse. Configuration favorable pour une position short.",
];

const waitExplanations = [
  "Consolidation en cours sans direction claire. Le prix évolue dans un range étroit. Attendre une cassure confirmée avant de prendre position.",
  "Signaux mixtes détectés : tendance haussière sur le moyen terme mais momentum en baisse. Zone d'indécision - patience recommandée.",
  "Le marché montre des signes de fatigue après un fort mouvement. Volume en diminution et RSI en zone neutre. Attendre un nouveau catalyseur.",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPatterns(): string[] {
  const count = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...patterns].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateSignal(): { signal: Signal; confidence: number; grade: SetupGrade; trend: 'bullish' | 'bearish' | 'neutral'; momentum: 'strong' | 'moderate' | 'weak' } {
  const rand = Math.random();
  
  if (rand < 0.4) {
    return {
      signal: 'BUY',
      confidence: Math.floor(Math.random() * 25) + 70, // 70-95%
      grade: Math.random() > 0.5 ? 'A+' : 'A',
      trend: 'bullish',
      momentum: Math.random() > 0.5 ? 'strong' : 'moderate',
    };
  } else if (rand < 0.7) {
    return {
      signal: 'SELL',
      confidence: Math.floor(Math.random() * 25) + 65, // 65-90%
      grade: Math.random() > 0.6 ? 'A' : 'B',
      trend: 'bearish',
      momentum: Math.random() > 0.5 ? 'strong' : 'moderate',
    };
  } else {
    return {
      signal: 'WAIT',
      confidence: Math.floor(Math.random() * 20) + 50, // 50-70%
      grade: Math.random() > 0.5 ? 'B' : 'C',
      trend: 'neutral',
      momentum: 'weak',
    };
  }
}

export async function analyzeChart(_imageUrl: string): Promise<AnalysisResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000 + Math.random() * 2000));

  const { signal, confidence, grade, trend, momentum } = generateSignal();
  
  // Generate random price levels
  const basePrice = Math.floor(Math.random() * 10000) + 1000;
  const priceStep = basePrice * 0.02; // 2% steps

  let entryZone, stopLoss, takeProfit, explanation;

  if (signal === 'BUY') {
    entryZone = {
      min: Math.round(basePrice - priceStep),
      max: Math.round(basePrice + priceStep * 0.5),
    };
    stopLoss = Math.round(basePrice - priceStep * 3);
    takeProfit = {
      tp1: Math.round(basePrice + priceStep * 2),
      tp2: Math.round(basePrice + priceStep * 4),
      tp3: Math.round(basePrice + priceStep * 6),
    };
    explanation = getRandomElement(buyExplanations);
  } else if (signal === 'SELL') {
    entryZone = {
      min: Math.round(basePrice - priceStep * 0.5),
      max: Math.round(basePrice + priceStep),
    };
    stopLoss = Math.round(basePrice + priceStep * 3);
    takeProfit = {
      tp1: Math.round(basePrice - priceStep * 2),
      tp2: Math.round(basePrice - priceStep * 4),
      tp3: Math.round(basePrice - priceStep * 6),
    };
    explanation = getRandomElement(sellExplanations);
  } else {
    entryZone = {
      min: Math.round(basePrice - priceStep),
      max: Math.round(basePrice + priceStep),
    };
    stopLoss = Math.round(basePrice - priceStep * 2);
    takeProfit = {
      tp1: Math.round(basePrice + priceStep),
      tp2: Math.round(basePrice + priceStep * 2),
      tp3: Math.round(basePrice + priceStep * 3),
    };
    explanation = getRandomElement(waitExplanations);
  }

  return {
    id: Date.now().toString(),
    imageUrl: _imageUrl,
    signal,
    entryZone,
    stopLoss,
    takeProfit,
    confidenceLevel: confidence,
    setupGrade: grade,
    explanation,
    detectedPatterns: getRandomPatterns(),
    trend,
    momentum,
    timestamp: new Date(),
  };
}
