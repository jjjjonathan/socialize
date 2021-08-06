import useSWR from 'swr';

const useComments = (postId) => {
  const { data, error, mutate } = useSWR(`/api/post/${postId}/comments`);

  return {
    comments: data,
    isCommentsLoading: !error && !data,
    isCommentsError: error,
    setComments: mutate,
  };
};

export default useComments;
