import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FilterOptions } from '../ui/search-panel/SearchPanel';
import { GET_USERS, DELETE_USER, BLOCK_USER } from '@/entities/user/api';
import { UsersResponse, DeleteUserResponse, BlockUserResponse } from '@/entities/user/types';

export const useUsers = () => {
  const [pageSize, setPageSize] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.ALL);

  const { loading, error, data, refetch } = useQuery<UsersResponse>(GET_USERS, {
    variables: {
      pageSize: +pageSize,
      pageNumber: currentPage,
      sortBy: 'id',
      sortDirection: 'asc',
      searchTerm: searchTerm || '',
      statusFilter: filter
    },
    fetchPolicy: 'network-only'
  });

  const [deleteUser] = useMutation<DeleteUserResponse>(DELETE_USER, {
    onCompleted: () => {
      refetch();
    }
  });

  const [blockUser] = useMutation<BlockUserResponse>(BLOCK_USER, {
    onCompleted: () => {
      refetch();
    }
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterOptions);
    setCurrentPage(1);
  };

  const handleDeleteUser = (id: number) => {
    deleteUser({
      variables: {
        userId: id
      }
    });
  };

  const handleUnbanUser = (id: number) => {
    const user = data?.getUsers.users.find((u) => u.id === id);
    const newBlockedStatus = user ? !user.userBan?.reason : false;

    blockUser({
      variables: {
        userId: id,
        blocked: newBlockedStatus
      }
    }).catch((err) => {
      console.error('Ошибка при изменении статуса блокировки:', err);
    });
  };

  const handleMoreInfo = (id: number) => {
    console.log(`More information about user with ID: ${id}`);
  };

  const users = data?.getUsers.users || [];
  const totalCount = data?.getUsers.pagination?.totalCount || 0;

  return {
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
  };
};
