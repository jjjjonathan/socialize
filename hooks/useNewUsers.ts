import useSWR from 'swr';
import { NewUserRes } from '../types/records';

const useNewUsers = () => {
  const { data, error, mutate } = useSWR<NewUserRes[]>(`/api/users/new`);

  return {
    newUsers: data,
    isNewUsersLoading: !error && !data,
    isNewUsersError: error,
    setNewUsers: mutate,
  };
};

export default useNewUsers;
