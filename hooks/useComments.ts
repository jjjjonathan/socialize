import useSWR from 'swr';
import { AxiosError } from 'axios';
import { CommentRes } from '../types/records';

const useComments = (postId: string) => {
  const { data, error, mutate } = useSWR<CommentRes[], AxiosError>(
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
