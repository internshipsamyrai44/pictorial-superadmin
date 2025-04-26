'use client';

import s from './UserInfo.module.css';

import { BackLink } from '@/pages/user-info/ui/back-link/BackLink';
import { HeaderUserInfo } from '@/pages/user-info/ui/header-user-info/HeaderUserInfo';
import { TabsComponent } from '@/pages/user-info/ui/tabs/Tabs';

export const UserInfo = () => {
  return (
    <div className={s.container}>
      <BackLink />
      <HeaderUserInfo />
      <TabsComponent />
    </div>
  );
};
