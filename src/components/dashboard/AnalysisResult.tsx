import { AnalysisResult as AnalysisResultType } from '@/types';
import { Card } from '../ui/Card';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  result: AnalysisResultType;
}

export function AnalysisResult({ result }: Props) {
  const getSignalConfig = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return {
          icon: TrendingUp,
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          border: 'border-green-500',
          label: 'BUY ↗',
        };
      case 'SELL':
        return {
          icon: TrendingDown,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500',
          label: 'SELL ↘',
        };
      default:
        return {
          icon: Minus,
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500',
          label: 'WAIT ⏸',
        };
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'text-green-500 bg-green-100';
      case 'A':
        return 'text-green-600 bg-green-50';
      case 'B':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  const signalConfig = getSignalConfig(result.signal);
  const SignalIcon = signalConfig.icon;

  return (
    <div className="space-y-6">
      {/* Main Signal Card */}
      <Card className={cn('p-6 border-2', signalConfig.border)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Signal Principal</h3>
          <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getGradeColor(result.setupGrade))}>
            Grade {result.setupGrade}
          </span>
        </div>
        
        <div className={cn('flex items-center gap-4 p-4 rounded-xl', signalConfig.bg)}>
          <div className={cn('w-16 h-16 rounded-xl flex items-center justify-center', signalConfig.bg)}>
            <SignalIcon className={cn('w-10 h-10', signalConfig.color)} />
          </div>
          <div>
            <div className={cn('text-3xl font-bold', signalConfig.color)}>
              {signalConfig.label}
            </div>
            <div className="text-slate-600 text-sm">
              Confiance: {result.confidenceLevel}%
            </div>
          </div>
          <div className="ml-auto">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-slate-200"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${result.confidenceLevel * 2.2} 220`}
                  className={signalConfig.color}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-lg font-bold', signalConfig.color)}>
                  {result.confidenceLevel}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Entry Zone, SL, TP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Zone d'entrée</h4>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {result.entryZone.min} - {result.entryZone.max}
          </div>
          <p className="text-sm text-slate-500 mt-1">Entry Zone</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Stop Loss</h4>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {result.stopLoss}
          </div>
          <p className="text-sm text-slate-500 mt-1">Protection du capital</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Take Profit</h4>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">TP1:</span>
              <span className="font-semibold text-green-600">{result.takeProfit.tp1}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">TP2:</span>
              <span className="font-semibold text-green-600">{result.takeProfit.tp2}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">TP3:</span>
              <span className="font-semibold text-green-600">{result.takeProfit.tp3}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Patterns Detected */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-purple-600" />
          </div>
          <h4 className="font-semibold text-slate-900">Patterns Détectés</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.detectedPatterns.map((pattern, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
            >
              {pattern}
            </span>
          ))}
        </div>
      </Card>

      {/* AI Explanation */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <Info className="w-5 h-5 text-pink-600" />
          </div>
          <h4 className="font-semibold text-slate-900">Explication IA</h4>
        </div>
        <p className="text-slate-700 leading-relaxed">
          {result.explanation}
        </p>
      </Card>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          <strong>Avertissement :</strong> Cette analyse est fournie à titre informatif uniquement 
          et ne constitue pas un conseil financier. Tradez toujours de manière responsable.
        </p>
      </div>
    </div>
  );
}
