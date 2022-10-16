import mongoose from 'mongoose';
import { Token } from '../types/records';

const TokenSchema = new mongoose.Schema<Token>({
  token: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: 'String',
    required: true,
  },
});

/* eslint-disable no-param-reassign */
TokenSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// this avoids overwrite warning error
// @ts-ignore
mongoose.models = {};

export default mongoose.model<Token>('Token', TokenSchema);
