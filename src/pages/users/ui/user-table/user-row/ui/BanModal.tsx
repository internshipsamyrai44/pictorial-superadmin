import { BanUserResponse, BanUserVariables, User } from '@/entities/user/types';
import { Alertpopup, Button, Input, Modal, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef, useState } from 'react';
import s from './BanModal.module.scss';
import { useMutation } from '@apollo/client';
import { BAN_USER, UNBAN_USER } from '@/entities/user/api';

type BanModalProps = {
  user: User;
  onClose: () => void;
};

export const BanModal = ({ user, onClose }: BanModalProps) => {
  const [input, setInput] = useState(false);
  const inputValueRef = useRef('');

  const [banUser, { loading: banLoading, error: banError }] = useMutation<BanUserResponse, BanUserVariables>(BAN_USER, {
    onCompleted: () => {
      onClose();
      setInput(false);
      inputValueRef.current = '';
    },
    refetchQueries: ['GetUsers']
  });

  const [unbanUser, { loading: unbanLoading, error: unbanError }] = useMutation(UNBAN_USER, {
    onCompleted: () => {
      onClose();
    },
    refetchQueries: ['GetUsers']
  });

  const onModalValueChange = (value: string) => {
    if (value === 'Another reason') {
      setInput(true);
    } else {
      setInput(false);
      inputValueRef.current = value;
    }
  };

  const onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    (inputValueRef.current = e.target.value);

  const handleButtonClickYes = () => {
    if (user.userBan) {
      unbanUser({
        variables: {
          userId: user.id
        }
      });
    } else {
      if (!inputValueRef.current) return; // notification or change state?
      banUser({
        variables: {
          userId: user.id,
          banReason: inputValueRef.current
        }
      });
    }
  };

  return (
    <>
      <Modal title={`User ${user.userBan ? 'un-ban' : 'ban'}`} onClose={onClose}>
        <p className={s.text}>
          {`Are you sure you want to ${user.userBan ? 'unblock' : 'block'} this user, ${user.profile.firstName ?? ''} ${user.profile.lastName ?? user.userName}?`}
        </p>
        {!user.userBan && (
          <div>
            <Select onValueChange={onModalValueChange} placeholder="Choose the reason">
              <SelectItem value="Bad behavior">Bad behavior</SelectItem>
              <SelectItem value="Advertising placement">Advertising placement</SelectItem>
              <SelectItem value="Another reason">Another reason</SelectItem>
            </Select>
            {input && <Input placeholder="Reason" onChange={onInputValueChange} defaultValue={inputValueRef.current} />}
          </div>
        )}
        <div className={s.btns}>
          <Button className={s.btn} variant={'primary'} onClick={onClose} disabled={banLoading || unbanLoading}>
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
      {(banError || unbanError) && <Alertpopup alertType="error" message={'Something went wrong'} />}
    </>
  );
};
