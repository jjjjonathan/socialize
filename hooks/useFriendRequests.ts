import { AxiosError } from 'axios';
import useSWR from 'swr';
import { FriendRequestsRes } from '../types/records';

const useFriendRequests = () => {
  const { data, error, mutate } = useSWR<FriendRequestsRes, AxiosError>(
    `/api/user/friend-requests`,
  );

  return {
    friendRequests: data,
    isFriendRequestsLoading: !error && !data,
    isFriendRequestsError: error,
    setFriendRequests: mutate,
  };
};

export default useFriendRequests;
