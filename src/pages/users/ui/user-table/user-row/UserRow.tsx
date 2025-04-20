'use client';

import { User } from '@/entities/user/types';
import { UserActionsMenu } from './UserActionsMenu';

type UserRowProps = {
  user: User;
  onDeleteUser: (id: number) => void;
  onToggleBlockUser: (id: number) => void;
  onMoreInfo: (id: number) => void;
};

export const UserRow = ({ user, onDeleteUser, onToggleBlockUser, onMoreInfo }: UserRowProps) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        {user.profile.firstName} {user.profile.lastName}
      </td>
      <td>{user.userName}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <UserActionsMenu
          user={user}
          onDeleteUser={onDeleteUser}
          onToggleBlockUser={onToggleBlockUser}
          onMoreInfo={onMoreInfo}
        />
      </td>
    </tr>
  );
};
