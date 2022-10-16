import { Types } from 'mongoose';

export type Friend = {
  timestamp: Date;
  user: Types.ObjectId;
};

export type User = {
  name: string;
  username: string;
  email: string;
  passwordHash?: string;
  userSince: Date;
  facebookId?: string;
  profilePicture: string;
  bio?: string;
  isEmailVerified: boolean;
  friends: Friend[];
  friendRequests: Friend[];
};

export type Post = {
  body: string;
  timestamp: Date;
  user: Types.ObjectId;
  likes: Types.ObjectId[];
};

export type Comment = {
  body: string;
  timestamp: Date;
  post: Types.ObjectId;
  user: Types.ObjectId;
};

export type Token = {
  token: string;
  timestamp: Date;
  user: Types.ObjectId;
  type: string;
};
