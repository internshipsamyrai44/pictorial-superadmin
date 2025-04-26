import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user-info/ui/header-user-info/HeaderUserInfo';
import Image from 'next/image';

import s from './UploadedFiles.module.css';
import { useUploadedFiles } from '@/pages/user-info/hooks/useUploadedFiles';
import PostsSkeleton from '@/pages/user-info/ui/skeletons/posts-skeleton/PostsSkeleton';

export const UploadedFiles = () => {
  const { userId } = useParams() as ParamsType;
  const { posts, loading } = useUploadedFiles(userId);
  return (
    <div className={s.images}>
      {loading && <PostsSkeleton quantity={16} />}
      {posts?.map((post) => <Image src={post.url} alt={'post'} width={234} height={228} key={post.id} />)}
    </div>
  );
};
