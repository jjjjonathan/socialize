import useSWR from 'swr';

const usePostsByUser = (username) => {
  const { data, error, mutate } = useSWR(`/api/user/${username}/posts`);

  return {
    postsByUser: data,
    isPostsByUserLoading: !error && !data,
    isPostsByUserError: error,
    setPostsByUser: mutate,
  };
};

export default usePostsByUser;
