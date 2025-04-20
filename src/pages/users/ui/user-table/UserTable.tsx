'use client';

import s from './UserTable.module.scss';
import { UserRow } from './user-row';
import { UserTableLoading } from './UserTableLoading';
import { UserTableError } from './UserTableError';
import { UserTableEmpty } from './UserTableEmpty';
import { User } from '@/entities/user/types';

type UserTableProps = {
  users: User[];
  loading: boolean;
  error: any;
  onDeleteUser: (id: number) => void;
  onToggleBlockUser: (id: number) => void;
  onMoreInfo: (id: number) => void;
};

export const UserTable = ({ users, loading, error, onDeleteUser, onToggleBlockUser, onMoreInfo }: UserTableProps) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Profile link</th>
          <th>Date added</th>
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
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDeleteUser={onDeleteUser}
              onToggleBlockUser={onToggleBlockUser}
              onMoreInfo={onMoreInfo}
            />
          ))
        )}
      </tbody>
    </table>
  );
};
