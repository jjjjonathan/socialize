import useSWR from 'swr';

const useNewUsers = () => {
  const { data, error, mutate } = useSWR(`/api/users/new`);

  return {
    newUsers: data,
    isNewUsersLoading: !error && !data,
    isNewUsersError: error,
    setNewUsers: mutate,
  };
};

export default useNewUsers;
