import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR('/api/user');

  const currentUser = data?.user === null ? null : data;

  return {
    currentUser,
    isLoading: !error && !data,
    isError: error,
    setCurrentUser: mutate,
  };
};

export default useCurrentUser;
