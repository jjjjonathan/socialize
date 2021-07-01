import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
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

/* eslint-disable no-param-reassign */
PostSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// this avoids overwrite warning error
mongoose.models = {};

export default mongoose.model('Post', PostSchema);
