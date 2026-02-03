import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysis extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  signal: 'BUY' | 'SELL' | 'WAIT';
  confidence: number;
  grade: 'A+' | 'A' | 'B' | 'C';
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
  patterns: string[];
  explanation: string;
  createdAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  signal: {
    type: String,
    enum: ['BUY', 'SELL', 'WAIT'],
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C'],
    required: true
  },
  entryZone: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  stopLoss: {
    type: Number,
    required: true
  },
  takeProfit: {
    tp1: { type: Number, required: true },
    tp2: { type: Number, required: true },
    tp3: { type: Number, required: true }
  },
  patterns: [{
    type: String
  }],
  explanation: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
AnalysisSchema.index({ userId: 1, createdAt: -1 });
AnalysisSchema.index({ signal: 1 });
AnalysisSchema.index({ grade: 1 });

export default mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
