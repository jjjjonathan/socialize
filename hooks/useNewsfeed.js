import useSWR from 'swr';

const useNewsfeed = () => {
  const { data, error, mutate } = useSWR(`/api/user/newsfeed`);

  return {
    newsfeed: data,
    isNewsfeedLoading: !error && !data,
    isNewsfeedError: error,
    setNewsfeed: mutate,
  };
};

export default useNewsfeed;
