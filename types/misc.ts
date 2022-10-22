export type ApiError = {
  msg: string;
};

export type SessionUser = {
  id: string;
  username: string;
  isEmailVerified: string;
  profilePicture: string;
};

export type FriendStatus = 'friends' | 'requested' | 'request';
