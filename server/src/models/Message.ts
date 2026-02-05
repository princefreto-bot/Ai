import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: {
    type: String,
    required: [true, 'Nom requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email requis'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Sujet requis'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message requis']
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  }
}, {
  timestamps: true
});

MessageSchema.index({ status: 1 });
MessageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
