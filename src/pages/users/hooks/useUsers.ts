import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FilterOptions } from '../ui/search-panel/SearchPanel';
import { GET_USERS, DELETE_USER } from '@/entities/user/api';
import { UsersResponse, DeleteUserResponse } from '@/entities/user/types';

export enum SortedByEnum {
  USERNAME = 'username',
  DATEADDED = 'dateAdded',
  ID = 'id'
}

export enum SortedDirectionEnum {
  ASC = 'asc',
  DESC = 'desc'
}

export const useUsers = () => {
  const [pageSize, setPageSize] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.ALL);
  const [sortedBy, setSortedBy] = useState<SortedByEnum>(SortedByEnum.ID);
  const [sortedDirection, setSortedDirection] = useState<SortedDirectionEnum>(SortedDirectionEnum.ASC);

  const { loading, error, data, refetch } = useQuery<UsersResponse>(GET_USERS, {
    variables: {
      pageSize: +pageSize,
      pageNumber: currentPage,
      sortBy: sortedBy,
      sortDirection: sortedDirection,
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
    sortedBy,
    sortedDirection,
    setSortedBy,
    setSortedDirection,
    setCurrentPage,
    handlePageSizeChange,
    handleSearchChange,
    handleFilterChange,
    handleDeleteUser
  };
};
