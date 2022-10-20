import useSWR from 'swr';
import { PostsByUserRes } from '../types/records';

const usePostsByUser = (username: string) => {
  const { data, error, mutate } = useSWR<PostsByUserRes>(
    `/api/user/${username}/posts`,
  );

  return {
    postsByUser: data,
    isPostsByUserLoading: !error && !data,
    isPostsByUserError: error,
    setPostsByUser: mutate,
  };
};

export default usePostsByUser;
