import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { defaultUsername } from '../utils/profileDefaults';
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
    required: true,
  },
  bio: {
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
  friendRequests: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
});

UserSchema.virtual('posts', {
  ref: Post,
  localField: '_id',
  foreignField: 'user',
});

UserSchema.virtual('requestedFriends', {
  ref: 'User',
  localField: '_id',
  foreignField: 'friendRequests.user',
});

/* eslint-disable no-param-reassign */
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;

    delete ret.__v;
    delete ret.passwordHash;

    if (ret.friendRequests) {
      ret.friendRequests.forEach((friendReq) => {
        friendReq.id = friendReq._id.toString();
        delete friendReq._id;
      });
    }

    if (ret.friends) {
      ret.friends.forEach((friend) => {
        friend.id = friend._id.toString();
        delete friend._id;
      });
    }
  },
});

UserSchema.plugin(uniqueValidator);

// this avoids overwrite warning error
mongoose.models = {};

export default mongoose.model('User', UserSchema);
