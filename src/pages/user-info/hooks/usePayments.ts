import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PaymentResponse } from '@/features/user-info/payments/types';
import { GET_USER_PAYMENTS } from '@/features/user-info/payments/api';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortBy {
  createdAt = 'createdAt',
  paymentMethod = 'paymentMethod'
}

export const usePayments = (userId: string) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useQuery<PaymentResponse>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(userId),
      page: currentPage,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: SortBy.createdAt,
      sortDirection: SortDirection.DESC
    },
    fetchPolicy: 'cache-first'
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const response = data?.getPaymentsByUser;

  return {
    payments: response?.items || [],
    totalCount: response?.totalCount || 0,
    loading,
    currentPage,
    pageSize,
    setCurrentPage,
    handlePageSizeChange
  };
};
