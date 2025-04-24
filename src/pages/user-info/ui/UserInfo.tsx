'use client';

import { useParams } from 'next/navigation';

import { BackLink } from '@/pages/user-info/ui/back-link/BackLink';
type ParamsType = {
  userId: string;
};

export const UserInfo = () => {
  const { userId } = useParams() as ParamsType;

  return <BackLink />;
};
