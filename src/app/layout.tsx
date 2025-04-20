import type { Metadata } from 'next';
import './globals.scss';
import { Header } from '@/widgets/header/Header';
import { ApolloWrapper } from '@/lib/apollo/apolloWrapper';
import React from 'react';

export const metadata: Metadata = {
  title: 'Pictorial SuperAdmin',
  description: 'Pictorial SuperAdmin'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
