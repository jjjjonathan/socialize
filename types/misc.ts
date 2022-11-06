export type ApiError = {
  msg: string;
};

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  isEmailVerified: string;
};

export type FriendStatus = 'friends' | 'requested' | 'request';
