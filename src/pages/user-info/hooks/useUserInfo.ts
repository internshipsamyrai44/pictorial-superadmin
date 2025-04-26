import { useQuery } from '@apollo/client';
import { GET_USER } from '@/entities/user/api';
import { UserResponse } from '@/features/user-info/user/types';

export const useUserInfo = (userId: string) => {
  const { data, loading } = useQuery<UserResponse>(GET_USER, {
    variables: {
      userId: Number(userId)
    }
  });
  return { user: data?.getUser, loading };
};
