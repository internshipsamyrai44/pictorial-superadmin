import { GET_PAYMENTS } from '@/entities/payments/api/queries';
import { PaymentsResponse } from '@/entities/payments/types';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export const usePayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery<PaymentsResponse>(GET_PAYMENTS, {
    variables: {
      pageSize: +pageSize,
      pageNumber: currentPage,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      searchTerm: searchTerm || '' //searchTerm ||
    },
    fetchPolicy: 'network-only'
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    setCurrentPage(1);
  };

  const payments = data?.getPayments.items;
  const totalCount = data?.getPayments.totalCount || 0;

  return {
    loading,
    error,
    payments,
    totalCount,
    pageSize,
    currentPage,
    searchTerm,
    handlePageSizeChange,
    setCurrentPage,
    handleSearchChange
  };
};
