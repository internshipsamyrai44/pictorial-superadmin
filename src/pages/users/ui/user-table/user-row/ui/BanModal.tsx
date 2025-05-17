import { BanUserResponse, BanUserVariables, UnbanUserResponse, UnbanUserVariables, User } from '@/entities/user/types';
import { Alertpopup, Button, Input, Modal, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef, useState, useEffect } from 'react';
import s from './BanModal.module.scss';
import { useMutation } from '@apollo/client';
import { BAN_USER, UNBAN_USER } from '@/entities/user/api';

type BanModalProps = {
  user: User;
  onClose: () => void;
};

export const BanModal = ({ user, onClose }: BanModalProps) => {
  const [input, setInput] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [focusedButton, setFocusedButton] = useState<'no' | 'yes'>('no');
  const inputValueRef = useRef('');
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (noButtonRef.current) {
      noButtonRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (selectError) {
      const timer = setTimeout(() => {
        setSelectError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectError]);

  const [banUser, { loading: banLoading, error: banError }] = useMutation<BanUserResponse, BanUserVariables>(BAN_USER, {
    onCompleted: () => {
      onClose();
      setInput(false);
      setSelectError(false);
      inputValueRef.current = '';
    },
    refetchQueries: ['GetUsers']
  });

  const [unbanUser, { loading: unbanLoading, error: unbanError }] = useMutation<UnbanUserResponse, UnbanUserVariables>(
    UNBAN_USER,
    {
      onCompleted: () => {
        onClose();
      },
      refetchQueries: ['GetUsers']
    }
  );

  const onModalValueChange = (value: string) => {
    if (value === 'Another reason') {
      setInput(true);
    } else {
      setInput(false);
      inputValueRef.current = value;
    }
    setSelectError(false);
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
      if (!inputValueRef.current) {
        setSelectError(false);
        setTimeout(() => {
          setSelectError(true);
        }, 10);
        return;
      }
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
            <Select 
              onValueChange={onModalValueChange} 
              placeholder="Choose the reason" 
              triggerProps={{ 
                className: selectError ? s.errorSelect : undefined 
              }}
            >
              <SelectItem value="Bad behavior">Bad behavior</SelectItem>
              <SelectItem value="Advertising placement">Advertising placement</SelectItem>
              <SelectItem value="Another reason">Another reason</SelectItem>
            </Select>
            {input && <Input placeholder="Reason" onChange={onInputValueChange} defaultValue={inputValueRef.current} />}
          </div>
        )}
        <div className={s.btns}>
          <Button 
            className={s.btn} 
            variant={focusedButton === 'no' ? 'primary' : 'outlined'} 
            onClick={onClose} 
            disabled={banLoading || unbanLoading}
            ref={noButtonRef}
            onMouseEnter={() => {
              setFocusedButton('no');
              noButtonRef.current?.focus();
            }}
          >
            No
          </Button>
          <Button
            className={s.btn}
            variant={focusedButton === 'yes' ? 'primary' : 'outlined'}
            onClick={handleButtonClickYes}
            disabled={banLoading || unbanLoading}
            ref={yesButtonRef}
            onMouseEnter={() => {
              setFocusedButton('yes');
              yesButtonRef.current?.focus();
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
      {(banError || unbanError) && <Alertpopup alertType="error" message={'Something went wrong'} />}
    </>
  );
};
