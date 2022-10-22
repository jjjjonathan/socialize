import useSWR from 'swr';
import { LikesRes } from '../types/records';

const useLikes = (postId: string) => {
  const { data, error, mutate } = useSWR<LikesRes[]>(
    `/api/post/${postId}/likes`,
  );

  return {
    likes: data,
    isLikesLoading: !error && !data,
    isLikesError: error,
    setLikes: mutate,
  };
};

export default useLikes;
