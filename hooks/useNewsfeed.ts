import useSWR from 'swr';
import { NewsfeedRes } from '../types/records';

const useNewsfeed = () => {
  const { data, error, mutate } = useSWR<NewsfeedRes>(`/api/user/newsfeed`);

  return {
    newsfeed: data,
    isNewsfeedLoading: !error && !data,
    isNewsfeedError: error,
    setNewsfeed: mutate,
  };
};

export default useNewsfeed;
