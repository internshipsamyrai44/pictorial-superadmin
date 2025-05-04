'use client';

import s from './UserTable.module.scss';
import { UserRow } from './user-row';
import { UserTableLoading } from './UserTableLoading';
import { UserTableError } from './UserTableError';
import { UserTableEmpty } from './UserTableEmpty';
import { User } from '@/entities/user/types';
import Filter from 'public/icons/Filter';
import ActiveFilter from 'public/icons/filter-active.svg';
import { SortedByEnum, SortedDirectionEnum } from '../../hooks/useUsers';

type UserTableProps = {
  users: User[];
  loading: boolean;
  error: unknown;
  sortedBy: SortedByEnum;
  sortedDirection: SortedDirectionEnum;
  setSortedBy: (arg: SortedByEnum) => void;
  setSortedDirection: (arg: SortedDirectionEnum) => void;
  onSort?: (arg: SortedByEnum) => void;
};

export const UserTable = ({
  users,
  loading,
  error,
  sortedBy,
  sortedDirection,
  setSortedBy,
  setSortedDirection,
  onSort
}: UserTableProps) => {
  const getFilterImage = (columnName: SortedByEnum) => {
    if (columnName === sortedBy) {
      return sortedDirection == SortedDirectionEnum.ASC ? (
        <ActiveFilter />
      ) : (
        <div style={{ rotate: '180deg' }}>
          <ActiveFilter />
        </div>
      );
    }
    return <Filter />;
  };

  const handleClickFilter = (columnName: SortedByEnum) => () => {
    if (columnName !== sortedBy) {
      setSortedBy(columnName);
      setSortedDirection(SortedDirectionEnum.ASC);
    } else if (sortedDirection === SortedDirectionEnum.ASC) setSortedDirection(SortedDirectionEnum.DESC);
    else if ((sortedDirection = SortedDirectionEnum.DESC)) {
      setSortedDirection(SortedDirectionEnum.ASC);
      setSortedBy(SortedByEnum.ID);
    }

    onSort?.(columnName);
  };

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>User ID</th>
          <th>
            <div className={s.sorted} onClick={handleClickFilter(SortedByEnum.USERNAME)}>
              Username {getFilterImage(SortedByEnum.USERNAME)}
            </div>
          </th>
          <th>Profile link</th>
          <th>
            <div className={s.sorted} onClick={handleClickFilter(SortedByEnum.DATEADDED)}>
              Date added {getFilterImage(SortedByEnum.DATEADDED)}
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <UserTableLoading />
        ) : error ? (
          <UserTableError />
        ) : users.length === 0 ? (
          <UserTableEmpty />
        ) : (
          users.map((user) => <UserRow key={user.id} user={user} />)
        )}
      </tbody>
    </table>
  );
};
