'use client';

import { BanUserResponse, BanUserVariables, User } from '@/entities/user/types';
import { UserActionsMenu } from './UserActionsMenu';
import { useMutation } from '@apollo/client';
import { BAN_USER, UNBAN_USER } from '@/entities/user/api';
import { Alertpopup, Button, Input, Modal, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef, useState } from 'react';

import s from './UserRow.module.scss';

type UserRowProps = {
  user: User;
};

export const UserRow = ({ user }: UserRowProps) => {
  const [modal, setModal] = useState(false);
  const [inputInModal, setInputInModal] = useState(false);
  const modalValueRef = useRef('');

  const [banUser, { loading: banLoading, error: banError }] = useMutation<BanUserResponse, BanUserVariables>(BAN_USER, {
    onCompleted: () => {
      setModal(false);
      setInputInModal(false);
      modalValueRef.current = '';
    },
    refetchQueries: ['GetUsers']
  });

  const [unbanUser, { loading: unbanLoading, error: unbanError }] = useMutation(UNBAN_USER, {
    onCompleted: () => {
      setModal(false);
    },
    refetchQueries: ['GetUsers']
  });

  const onToggleBlockUser = () => {
    setModal(true);
  };

  const onModalValueChange = (value: string) => {
    if (value === 'Another reason') {
      setInputInModal(true);
    } else {
      setInputInModal(false);
      modalValueRef.current = value;
    }
  };

  const onInputValueChahge: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    (modalValueRef.current = e.target.value);

  const handleButtonClickYes = () => {
    if (user.userBan) {
      unbanUser({
        variables: {
          userId: user.id
        }
      });
    } else {
      if (!modalValueRef.current) return; // notification or change state?

      banUser({
        variables: {
          userId: user.id,
          banReason: modalValueRef.current || ''
        }
      });
    }
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
        <td>{user.userBan ? 'Заблокирован' : 'Активен'}</td>
        <td>
          <UserActionsMenu user={user} onToggleBlockUser={onToggleBlockUser} />
        </td>
      </tr>
      {modal && (
        <Modal title={`User ${user.userBan ? 'un-ban' : 'ban'}`} onClose={() => setModal(false)}>
          <p className={s.text}>
            {`Are you sure you want to ${user.userBan ? 'unblock' : 'block'} this user, ${user.profile.firstName ?? ''} ${user.profile.lastName ?? user.userName}?`}
          </p>
          {!user.userBan && (
            <div>
              <Select
                onValueChange={onModalValueChange}
                placeholder="Choose the reason"
                defaultValue={modalValueRef.current ? 'Another reason' : undefined}
              >
                <SelectItem value="Bad behavior">Bad behavior</SelectItem>
                <SelectItem value="Advertising placement">Advertising placement</SelectItem>
                <SelectItem value="Another reason">Another reason</SelectItem>
              </Select>
              {inputInModal && (
                <Input placeholder="Reason" onChange={onInputValueChahge} defaultValue={modalValueRef.current} />
              )}
            </div>
          )}
          <div className={s.btns}>
            <Button
              className={s.btn}
              variant={'primary'}
              onClick={() => setModal(false)}
              disabled={banLoading || unbanLoading}
            >
              No
            </Button>
            <Button
              className={s.btn}
              variant={'outlined'}
              onClick={handleButtonClickYes}
              disabled={banLoading || unbanLoading}
            >
              Yes
            </Button>
          </div>
        </Modal>
      )}
      {(banError || unbanError) && <Alertpopup alertType="error" message={'Something went wrong'} />}
    </>
  );
};
