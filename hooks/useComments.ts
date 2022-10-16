import useSWR from 'swr';
import { AxiosError } from 'axios';
import { Comment } from '../types/records';

const useComments = (postId: string) => {
  const { data, error, mutate } = useSWR<Comment[], AxiosError>(
    `/api/post/${postId}/comments`,
  );

  return {
    comments: data,
    isCommentsLoading: !error && !data,
    isCommentsError: error,
    setComments: mutate,
  };
};

export default useComments;
