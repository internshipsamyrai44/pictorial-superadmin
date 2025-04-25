import { GET_PAYMENTS } from '@/entities/payments/api/queries';
import { PaymentsortBy, PaymentsResponse, SortDirection } from '@/entities/payments/types';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export const usePayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<PaymentsortBy>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const { loading, error, data } = useQuery<PaymentsResponse>(GET_PAYMENTS, {
    variables: {
      pageSize: +pageSize,
      pageNumber: currentPage,
      sortBy: sortBy,
      sortDirection: sortDirection,
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

  const handleSortChange = (column: PaymentsortBy) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
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
    handleSearchChange,
    handleSortChange
  };
};
