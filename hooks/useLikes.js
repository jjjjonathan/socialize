import useSWR from 'swr';

const useLikes = (postId) => {
  const { data, error, mutate } = useSWR(`/api/post/${postId}/likes`);

  return {
    likes: data,
    isLikesLoading: !error && !data,
    isLikesError: error,
    setLikes: mutate,
  };
};

export default useLikes;
