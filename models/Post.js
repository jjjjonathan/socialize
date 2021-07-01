import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
});

/* eslint-disable no-param-reassign */
PostSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

PostSchema.plugin(uniqueValidator);

// this avoids overwrite warning error
mongoose.models = {};

export default mongoose.model('Post', PostSchema);
