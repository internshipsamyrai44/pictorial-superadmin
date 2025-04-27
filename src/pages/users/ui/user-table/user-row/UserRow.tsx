'use client';

import { User } from '@/entities/user/types';
import { UserActionsMenu } from './UserActionsMenu';
import { BanModal } from './ui/BanModal';
import { useState } from 'react';

type UserRowProps = {
  user: User;
};

export const UserRow = ({ user }: UserRowProps) => {
  const [modal, setModal] = useState(false);

  const onToggleBlockUser = () => {
    setModal(true);
  };

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>
          {user.profile.firstName} {user.profile.lastName}
        </td>
        <td>{user.userName}</td>
        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
        <td>
          <UserActionsMenu user={user} onToggleBlockUser={onToggleBlockUser} />
        </td>
      </tr>
      {modal && <BanModal user={user} onClose={() => setModal(false)} />}
    </>
  );
};
