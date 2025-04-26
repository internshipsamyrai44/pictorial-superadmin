'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import s from './HeaderUserInfo.module.css';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import NoAvatar from '../../../../../public/img/noAvatar.png';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import { SkeletonUserInfo } from '@/pages/user-info/ui/skeletons/skeleton-user-info/SkeletotUserInfo';
import { useUserInfo } from '@/pages/user-info/hooks/useUserInfo';

export type ParamsType = {
  userId: string;
};

export const HeaderUserInfo = () => {
  const { userId } = useParams() as ParamsType;

  const { user, loading } = useUserInfo(userId);

  const userAvatar = user?.profile.avatars?.[0]?.url ? user.profile.avatars[0].url : NoAvatar;
  return (
    <div className={s.container}>
      {loading && <SkeletonUserInfo />}
      {!loading && (
        <div className={s.main}>
          <div className={s.photo}>
            <Image className={s.avatar} src={userAvatar} alt={user?.userName || 'User avatar'} width={60} height={60} />
            <div className={s.name}>
              <Typography variant={'h1'}>
                {user?.profile.firstName} {user?.profile.lastName}
              </Typography>
              <Link href={`https://pictorial.work/profile/${userId}`} className={s.link}>
                {user?.userName}
              </Link>
            </div>
          </div>
          <div className={s.info}>
            <div className={s.id}>
              <span>UserID</span>
              <p>{user?.id}</p>
            </div>
            <div className={s.date}>
              <span>Profile Creation Date</span>
              <p>{convertToLocalDate(user?.createdAt as string)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
