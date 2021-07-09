import useSWR from 'swr';

const useFriendRequests = () => {
  const { data, error, mutate } = useSWR(`/api/user/friend-requests`);

  return {
    friendRequests: data,
    isFriendRequestsLoading: !error && !data,
    isFriendRequestsError: error,
    setFriendRequests: mutate,
  };
};

export default useFriendRequests;
