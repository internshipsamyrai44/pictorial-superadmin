'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './UserActionsMenu.module.scss';
import UserDeleteIcon from 'public/icons/user-delete.svg';
import UnbanIcon from 'public/icons/unban.svg';
import MoreIcon from 'public/icons/more.svg';
import { useState } from 'react';
import { DeleteUserModal } from '@/pages/users/ui/modal/DeleteUserModal';
import { User } from '@/entities/user/types';
import { useRouter } from 'next/navigation';

type UserActionsMenuProps = {
  user: User;
  onToggleBlockUser: (id: number) => void;
};

export const UserActionsMenu = ({ user, onToggleBlockUser }: UserActionsMenuProps) => {
  const [showDelModal, setShowDelModal] = useState(false);
  const router = useRouter();

  const onMoreInfoHandler = (id: number) => {
    router.push(`/user/${id}`);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className={s.userActionButton}>
            <MoreIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={s.popoverContent} align="end">
          <div className={s.popoverItem} onClick={() => setShowDelModal(true)}>
            <UserDeleteIcon className={s.popoverItemIcon} />
            <span className={s.popoverItemText}>Delete User</span>
          </div>
          <div className={s.popoverItem} onClick={() => onToggleBlockUser(user.id)}>
            <UnbanIcon className={s.popoverItemIcon} />
            <span className={s.popoverItemText}>{user.userBan ? 'Un-ban User' : 'Block User'}</span>
          </div>
          <div className={s.popoverItem} onClick={() => onMoreInfoHandler(user.id)}>
            <MoreIcon className={s.popoverItemIcon} />
            <span className={s.popoverItemText}>More Information</span>
          </div>
        </PopoverContent>
      </Popover>
      {showDelModal && <DeleteUserModal userName={user.userName} userId={user.id} setShowDelModal={setShowDelModal} />}
    </>
  );
};
