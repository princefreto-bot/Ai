import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  paymentId: string;
  orderId: string;
  status: 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'finished' | 'failed' | 'expired' | 'refunded';
  plan: 'pro' | 'enterprise';
  amount: number;
  currency: string;
  cryptoCurrency: string;
  cryptoAmount: number;
  walletAddress: string;
  nowPaymentsId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'confirming', 'confirmed', 'sending', 'finished', 'failed', 'expired', 'refunded'],
    default: 'waiting'
  },
  plan: {
    type: String,
    enum: ['pro', 'enterprise'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  cryptoCurrency: {
    type: String,
    required: true
  },
  cryptoAmount: {
    type: Number,
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  nowPaymentsId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
PaymentSchema.index({ paymentId: 1 });
PaymentSchema.index({ nowPaymentsId: 1 });
PaymentSchema.index({ userId: 1, createdAt: -1 });
PaymentSchema.index({ status: 1 });

export default mongoose.model<IPayment>('Payment', PaymentSchema);
