import mongoose from 'mongoose';
import { Comment } from '../types/records';

const CommentSchema = new mongoose.Schema<Comment>({
  body: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

/* eslint-disable no-param-reassign */
CommentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// this avoids overwrite warning error
// @ts-ignore
mongoose.models = {};

export default mongoose.model<Comment>('Comment', CommentSchema);
