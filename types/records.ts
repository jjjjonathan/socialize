import { Types } from 'mongoose';

interface Res {
  id: string;
}

export interface Friend {
  timestamp: Date;
  user: Types.ObjectId;
}

export interface UserRecord {
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
}

export interface UserRes extends Res, Omit<UserRecord, 'userSince'> {
  userSince: string;
}

export interface PostRecord {
  body: string;
  timestamp: Date;
  user: Types.ObjectId;
  likes: Types.ObjectId[];
}

export interface CommentRecord {
  body: string;
  timestamp: Date;
  post: Types.ObjectId;
  user: Types.ObjectId;
}

export interface CommentRes
  extends Res,
    Omit<CommentRecord, 'timestamp' | 'post' | 'user'> {
  timestamp: string;
  user: Pick<UserRes, 'id' | 'name' | 'username' | 'profilePicture'>;
}

export interface TokenRecord {
  token: string;
  timestamp: Date;
  user: Types.ObjectId;
  type: string;
}

export interface FriendRes extends Res {
  timestamp: string;
  user: Pick<UserRecord, 'name' | 'username' | 'profilePicture'> & Res;
}

export interface FriendRequestsRes extends Res {
  friendRequests: FriendRes[];
}
