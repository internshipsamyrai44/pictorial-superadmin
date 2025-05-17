import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './DeleteUserModal.module.css';
import { useUsers } from '@/pages/users/hooks/useUsers';

type Props = {
  userId: number;
  userName: string;
  setShowDelModal: (arg: boolean) => void;
};
export const DeleteUserModal = ({ userId, userName, setShowDelModal }: Props) => {
  const { handleDeleteUser, loading } = useUsers();
  const handleCloseModal = () => {
    setShowDelModal(false);
  };
  const deleteUserHandler = async (userId: number) => {
    await handleDeleteUser(userId);
    handleCloseModal();
  };
  return (
    <Modal className={s.modal} title={'Delete user'} onClose={handleCloseModal}>
      <p className={s.text}>Are you sure to delete user {userName}?</p>
      <div className={s.btns}>
        <Button className={s.btn} variant={'primary'} onClick={handleCloseModal} disabled={loading}>
          No
        </Button>
        <Button className={s.btn} variant={'outlined'} onClick={() => deleteUserHandler(userId)} disabled={loading}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};
