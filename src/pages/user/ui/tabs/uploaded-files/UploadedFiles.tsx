import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '@/entities/user/api';
import { ParamsType } from '@/pages/user/ui/header-user-info/HeaderUserInfo';
import { PostsByUseResponse } from '@/entities/user/types';
import Image from 'next/image';

import s from './UploadedFiles.module.css';
import PostsSkeleton from '@/pages/user/ui/tabs/uploaded-files/posts-skeleton/PostsSkeleton';

export const UploadedFiles = () => {
  const { userId } = useParams() as ParamsType;

  const { data, loading } = useQuery<PostsByUseResponse>(GET_USER_POSTS, {
    variables: { userId: Number(userId) }
  });

  const posts = data?.getPostsByUser?.items;

  return (
    <div className={s.images}>
      {loading && <PostsSkeleton quantity={16} />}
      {posts?.map((post) => <Image src={post.url} alt={'post'} width={234} height={228} key={post.id} />)}
    </div>
  );
};
