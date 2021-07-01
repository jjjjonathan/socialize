import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
  },
  username: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  userSince: {
    type: Date,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

/* eslint-disable no-param-reassign */
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

UserSchema.plugin(uniqueValidator);

// this avoids overwrite warning error
mongoose.models = {};

export default mongoose.model('User', UserSchema);
