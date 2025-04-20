'use client';

import { User } from '../../../types';
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
      <td>{user.username}</td>
      <td>{user.profileLink}</td>
      <td>{user.dateAdded}</td>
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
