'use client';

import s from './Payments.module.scss';
import { PaginationPanel } from '@/shared/components/pagination-panel';
import { PaymentsTable } from './payments-table/PaymentsTable';
import { usePayments } from '../hooks/usePayments';
import { PaymentsSearch } from './payments-search/PaymentsSearch';

export const Payments = () => {
  const {
    loading,
    error,
    payments,
    totalCount,
    pageSize,
    currentPage,
    searchTerm,
    setCurrentPage,
    handlePageSizeChange,
    handleSearchChange
  } = usePayments();

  return (
    <div className={s.container}>
      <PaymentsSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <PaymentsTable payments={payments} loading={loading} error={error} />
      <PaginationPanel
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        onChangePage={setCurrentPage}
        onChangePageSize={handlePageSizeChange}
      />
    </div>
  );
};
