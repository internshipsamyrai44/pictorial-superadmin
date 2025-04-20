'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './UserActionsMenu.module.scss';
import UserDeleteIcon from 'public/icons/user-delete.svg';
import UnbanIcon from 'public/icons/unban.svg';
import MoreIcon from 'public/icons/more.svg';
import { User } from '../../../types';

type UserActionsMenuProps = {
  user: User;
  onDeleteUser: (id: number) => void;
  onToggleBlockUser: (id: number) => void;
  onMoreInfo: (id: number) => void;
};

export const UserActionsMenu = ({ user, onDeleteUser, onToggleBlockUser, onMoreInfo }: UserActionsMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={s.userActionButton}>
          <MoreIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={s.popoverContent} align="end">
        <div className={s.popoverItem} onClick={() => onDeleteUser(user.id)}>
          <UserDeleteIcon className={s.popoverItemIcon} />
          <span className={s.popoverItemText}>Delete User</span>
        </div>
        <div className={s.popoverItem} onClick={() => onToggleBlockUser(user.id)}>
          <UnbanIcon className={s.popoverItemIcon} />
          <span className={s.popoverItemText}>{user.blocked ? 'Un-ban User' : 'Block User'}</span>
        </div>
        <div className={s.popoverItem} onClick={() => onMoreInfo(user.id)}>
          <MoreIcon className={s.popoverItemIcon} />
          <span className={s.popoverItemText}>More Information</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
