'use client';

import s from './Users.module.scss';
import { useUsers } from '../hooks/useUsers';
import { SearchPanel } from './search-panel';
import { UserTable } from './user-table';
import { PaginationPanel } from './pagination-panel';

export const Users = () => {
  const {
    loading,
    error,
    users,
    totalCount,
    pageSize,
    currentPage,
    searchTerm,
    setCurrentPage,
    handlePageSizeChange,
    handleSearchChange,
    handleFilterChange,
    handleDeleteUser,
    handleUnbanUser,
    handleMoreInfo
  } = useUsers();

  return (
    <div className={s.container}>
      <SearchPanel searchTerm={searchTerm} onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      <UserTable
        users={users}
        loading={loading}
        error={error}
        onDeleteUser={handleDeleteUser}
        onToggleBlockUser={handleUnbanUser}
        onMoreInfo={handleMoreInfo}
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
