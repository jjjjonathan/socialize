import useSWR from 'swr';

const useProfile = (username) => {
  const { data, error, mutate } = useSWR(`/api/user/${username}`);

  return {
    profile: data,
    isProfileLoading: !error && !data,
    isProfileError: error,
    setProfile: mutate,
  };
};

export default useProfile;
