'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { UserResponse } from '@/entities/user/types';
import { GET_USER } from '@/entities/user/api';
import s from './HeaderUserInfo.module.css';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { convertToLocalDate } from '@/widgets/convertToLoaclDate';
import NoAvatar from '../../../../../public/img/noAvatar.png';
import { SkeletonUserInfo } from '@/pages/user/ui/header-user-info/skeleton-user-info/SkeletotUserInfo';

export type ParamsType = {
  userId: string;
};

export const HeaderUserInfo = () => {
  const { userId } = useParams() as ParamsType;

  const { data, loading } = useQuery<UserResponse>(GET_USER, {
    variables: {
      userId: Number(userId)
    }
  });
  const user = data?.getUser;

  const userAvatar = user?.profile?.avatars?.[0]?.url ? user.profile.avatars[0].url : NoAvatar;
  return (
    <header className={s.container}>
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
    </header>
  );
};
