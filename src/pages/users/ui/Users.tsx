'use client';

import s from './Users.module.scss';
import { useUsers } from '../hooks/useUsers';
import { SearchPanel } from './search-panel';
import { UserTable } from './user-table';
import { PaginationPanel } from '@/shared/components/pagination-panel';

export const Users = () => {
  const {
    loading,
    error,
    users,
    totalCount,
    pageSize,
    currentPage,
    searchTerm,
    sortedBy,
    sortedDirection,
    setSortedBy,
    setSortedDirection,
    setCurrentPage,
    handlePageSizeChange,
    handleSearchChange,
    handleFilterChange
  } = useUsers();

  return (
    <div className={s.container}>
      <SearchPanel searchTerm={searchTerm} onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      <UserTable
        users={users}
        loading={loading}
        error={error}
        sortedBy={sortedBy}
        sortedDirection={sortedDirection}
        setSortedBy={setSortedBy}
        setSortedDirection={setSortedDirection}
      />

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
