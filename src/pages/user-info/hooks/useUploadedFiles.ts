import { useQuery } from '@apollo/client';
import { PostsByUseResponse } from '@/entities/user/types';
import { GET_USER_POSTS } from '@/entities/user/api';

export const useUploadedFiles = (userId: string) => {
  const { data, loading } = useQuery<PostsByUseResponse>(GET_USER_POSTS, {
    variables: { userId: Number(userId) },
    fetchPolicy: 'cache-first'
  });

  const posts = data?.getPostsByUser?.items;

  return { posts, loading };
};
