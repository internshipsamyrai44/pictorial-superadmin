import { AuthorizedLayout } from '@/components/layouts/authorized-layout/AuthorizedLayout';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
