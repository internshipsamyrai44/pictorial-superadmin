import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FilterOptions } from '../ui/search-panel/SearchPanel';
import { GET_USERS, DELETE_USER } from '@/entities/user/api';
import { UsersResponse } from '@/entities/user/types';

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
  const [pageSize, setPageSize] = useState('8');
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

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
    update: (cache) => {
      const existingUsers = cache.readQuery<UsersResponse>({
        query: GET_USERS,
        variables: {
          pageSize: +pageSize,
          pageNumber: currentPage,
          sortBy: sortedBy,
          sortDirection: sortedDirection,
          searchTerm: searchTerm || '',
          statusFilter: filter
        }
      });

      if (existingUsers && existingUsers.getUsers && existingUsers.getUsers.users) {
        cache.modify({
          fields: {
            getUsers: () => undefined
          }
        });
      }
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

  const handleDeleteUser = async (id: number) => {
    const result = await deleteUser({
      variables: {
        userId: id
      }
    });

    await refetch();
    return result;
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
