import mongoose from 'mongoose';
import Comment from './Comment';

const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    minLength: 3,
    maxLength: 2000,
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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

PostSchema.virtual('comments', {
  ref: Comment,
  localField: '_id',
  foreignField: 'post',
});

PostSchema.virtual('commentCount', {
  ref: Comment,
  localField: '_id',
  foreignField: 'post',
  count: true,
});

/* eslint-disable no-param-reassign */
PostSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// this avoids overwrite warning error
mongoose.models = {};

export default mongoose.model('Post', PostSchema);
