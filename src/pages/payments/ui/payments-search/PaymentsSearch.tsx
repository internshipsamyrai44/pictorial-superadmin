'use client';

import { Input } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PaymentsSearch = ({ searchTerm, onSearchChange }: Props) => {
  return (
    <Input placeholder="Search" type="search" value={searchTerm} onChange={onSearchChange} style={{ width: '100%' }} />
  );
};
