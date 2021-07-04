import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {
  defaultProfilePicture,
  defaultUsername,
} from '../utils/profileDefaults';
import Post from './Post';

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
    unique: true,
    default() {
      return defaultUsername(this.name);
    },
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
    required: false,
  },
  userSince: {
    type: Date,
    default: Date.now,
  },
  facebookId: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    default() {
      return defaultProfilePicture(this.username, this.name);
    },
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

UserSchema.virtual('posts', {
  ref: Post,
  localField: '_id',
  foreignField: 'user',
});

/* eslint-disable no-param-reassign */
UserSchema.set('toJSON', {
  virtuals: true,
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
