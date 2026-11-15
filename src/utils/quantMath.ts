export interface IndicatorSnapshot {
  latestPrice: number;
  rsi: number;
  emaFast: number;
  emaSlow: number;
  macd: number;
  macdSignal: number;
  macdHistogram: number;
  bbMiddle: number;
  bbUpper: number;
  bbLower: number;
  confidence: number;
  signalLabel: 'Strong Buy' | 'Accumulate / Hold' | 'Neutral' | 'Take Profit / Sell';
  emaSeries: number[];
  bbUpperSeries: number[];
  bbLowerSeries: number[];
}

export function calculateSMA(values: number[], period: number): number {
  if (values.length === 0) return 0;
  const slice = values.slice(-Math.min(period, values.length));
  const sum = slice.reduce((acc, v) => acc + v, 0);
  return sum / slice.length;
}

export function calculateEMASeries(values: number[], period: number): number[] {
  if (values.length === 0) return [];
  const k = 2 / (period + 1);
  const result: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) {
    const prev = result[i - 1];
    result.push(values[i] * k + prev * (1 - k));
  }
  return result;
}

export function calculateRSI(values: number[], period: number = 14): number {
  if (values.length < 2) return 50;
  const lookback = Math.min(period, values.length - 1);
  let gains = 0;
  let losses = 0;

  const startIdx = values.length - lookback;
  for (let i = startIdx; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }

  const avgGain = gains / lookback;
  const avgLoss = losses / lookback;

  if (avgLoss === 0) return avgGain === 0 ? 50 : 95;
  const rs = avgGain / avgLoss;
  return Number((100 - 100 / (1 + rs)).toFixed(1));
}

export function calculateBollingerSeries(
  values: number[],
  period: number = 10,
  multiplier: number = 2
): { middle: number[]; upper: number[]; lower: number[] } {
  const middle: number[] = [];
  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - period + 1);
    const window = values.slice(start, i + 1);
    const mean = window.reduce((a, b) => a + b, 0) / window.length;
    const variance =
      window.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / window.length;
    const stdDev = Math.sqrt(variance);

    middle.push(mean);
    upper.push(mean + multiplier * stdDev);
    lower.push(mean - multiplier * stdDev);
  }

  return { middle, upper, lower };
}

export function computeIndicatorSnapshot(
  prices: number[],
  rsiPeriod: number = 14,
  fastEmaPeriod: number = 9,
  slowEmaPeriod: number = 21
): IndicatorSnapshot {
  const latestPrice = prices[prices.length - 1] ?? 0;
  const rsi = calculateRSI(prices, rsiPeriod);

  const emaFastSeries = calculateEMASeries(prices, fastEmaPeriod);
  const emaSlowSeries = calculateEMASeries(prices, slowEmaPeriod);
  const emaFast = emaFastSeries[emaFastSeries.length - 1] ?? latestPrice;
  const emaSlow = emaSlowSeries[emaSlowSeries.length - 1] ?? latestPrice;

  const ema12 = calculateEMASeries(prices, 12);
  const ema26 = calculateEMASeries(prices, 26);
  const macdLine = ema12.map((val, idx) => val - (ema26[idx] ?? val));
  const macdSignalLine = calculateEMASeries(macdLine, 9);

  const macd = macdLine[macdLine.length - 1] ?? 0;
  const macdSignal = macdSignalLine[macdSignalLine.length - 1] ?? 0;
  const macdHistogram = macd - macdSignal;

  const bb = calculateBollingerSeries(prices, 10, 2);
  const bbMiddle = bb.middle[bb.middle.length - 1] ?? latestPrice;
  const bbUpper = bb.upper[bb.upper.length - 1] ?? latestPrice;
  const bbLower = bb.lower[bb.lower.length - 1] ?? latestPrice;

  // Transparent composite confidence scoring model (0-100)
  let score = 50;
  if (rsi >= 45 && rsi <= 68) score += 16;
  else if (rsi < 35) score += 22; // Oversold reversal opportunity
  else if (rsi > 74) score -= 18; // Overbought risk

  if (emaFast > emaSlow) score += 18;
  else score -= 12;

  if (macdHistogram > 0) score += 12;
  else score -= 8;

  if (latestPrice <= bbLower * 1.01) score += 6;
  else if (latestPrice >= bbUpper * 0.995) score -= 10;

  const confidence = Math.max(15, Math.min(96, Math.round(score)));

  let signalLabel: IndicatorSnapshot['signalLabel'] = 'Neutral';
  if (confidence >= 78) signalLabel = 'Strong Buy';
  else if (confidence >= 60) signalLabel = 'Accumulate / Hold';
  else if (confidence <= 42) signalLabel = 'Take Profit / Sell';

  return {
    latestPrice: Number(latestPrice.toFixed(2)),
    rsi,
    emaFast: Number(emaFast.toFixed(2)),
    emaSlow: Number(emaSlow.toFixed(2)),
    macd: Number(macd.toFixed(2)),
    macdSignal: Number(macdSignal.toFixed(2)),
    macdHistogram: Number(macdHistogram.toFixed(2)),
    bbMiddle: Number(bbMiddle.toFixed(2)),
    bbUpper: Number(bbUpper.toFixed(2)),
    bbLower: Number(bbLower.toFixed(2)),
    confidence,
    signalLabel,
    emaSeries: emaFastSeries,
    bbUpperSeries: bb.upper,
    bbLowerSeries: bb.lower,
  };
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
