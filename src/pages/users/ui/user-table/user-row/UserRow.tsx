'use client';

import { User } from '@/entities/user/types';
import { UserActionsMenu } from './UserActionsMenu';

type UserRowProps = {
  user: User;
  onToggleBlockUser: (id: number) => void;
  onMoreInfo: (id: number) => void;
};

export const UserRow = ({ user, onToggleBlockUser, onMoreInfo }: UserRowProps) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        {user.profile.firstName} {user.profile.lastName}
      </td>
      <td>{user.userName}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <UserActionsMenu user={user} onToggleBlockUser={onToggleBlockUser} onMoreInfo={onMoreInfo} />
      </td>
    </tr>
  );
};
