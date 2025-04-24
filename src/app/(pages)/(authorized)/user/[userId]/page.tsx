'use client';

import { useParams } from 'next/navigation';
type ParamsType = {
  userId: string;
};
export default function UserPage() {
  const { userId } = useParams() as ParamsType;

  return <h1>User {userId} Page</h1>;
}
