'use client';

import { useParams } from 'next/navigation';
type ParamsType = {
  userId: string;
};

export const UserInfo = () => {
  const { userId } = useParams() as ParamsType;

  return <h1>User {userId} Page</h1>;
};
