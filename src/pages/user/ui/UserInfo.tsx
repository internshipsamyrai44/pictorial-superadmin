'use client';

import s from './UserInfo.module.css';

import { BackLink } from '@/pages/user/ui/back-link/BackLink';
import { HeaderUserInfo } from '@/pages/user/ui/header-user-info/HeaderUserInfo';

export const UserInfo = () => {
  return (
    <div className={s.container}>
      <BackLink />
      <HeaderUserInfo />
    </div>
  );
};
