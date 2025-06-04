import {BanUserResponse, BanUserVariables, UnbanUserResponse, UnbanUserVariables, User} from '@/entities/user/types';
import {Alertpopup, Button, Input, Modal, Select, SelectItem} from '@internshipsamyrai44-ui-kit/components-lib';
import {useRef, useState, useEffect} from 'react';
import s from './BanModal.module.scss';
import {useMutation, useApolloClient} from '@apollo/client';
import {BAN_USER, UNBAN_USER, GET_USERS, GET_USER} from '@/entities/user/api';

type BanModalProps = {
    user: User;
    onClose: () => void;
};

export const BanModal = ({user, onClose}: BanModalProps) => {
    const [input, setInput] = useState(false);
    const [selectError, setSelectError] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [focusedButton, setFocusedButton] = useState<'no' | 'yes'>('no');
    const inputValueRef = useRef('');
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const yesButtonRef = useRef<HTMLButtonElement>(null);
    const client = useApolloClient();

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

    const [banUser, {loading: banLoading, error: banError}] = useMutation<BanUserResponse, BanUserVariables>(BAN_USER, {
        onCompleted: async (data) => {
            if (data.banUser) {
                try {
                    // Вместо refetchQueries используем прямой запрос через client.query
                    await client.query({
                        query: GET_USER,
                        variables: { userId: user.id },
                        fetchPolicy: 'network-only' // Принудительно получаем данные из сети
                    });
                } catch (error) {
                    console.error('Error fetching user data after ban:', error);
                }
            }
            onClose();
            setInput(false);
            setSelectError(false);
            setInputError(false);
            inputValueRef.current = '';
        },
        // Этот запрос для обновления списка пользователей
        refetchQueries: [{ 
            query: GET_USERS, 
            variables: { 
                pageSize: 10, 
                pageNumber: 1, 
                sortBy: 'id', 
                sortDirection: 'asc',
                searchTerm: '',
                statusFilter: 'ALL'
            }
        }]
    });

    const [unbanUser, {loading: unbanLoading, error: unbanError}] = useMutation<UnbanUserResponse, UnbanUserVariables>(
        UNBAN_USER,
        {
            onCompleted: async (data) => {
                if (data.unbanUser) {
                    try {
                        // То же самое для операции разбана
                        await client.query({
                            query: GET_USER,
                            variables: { userId: user.id },
                            fetchPolicy: 'network-only'
                        });
                    } catch (error) {
                        console.error('Error fetching user data after unban:', error);
                    }
                }
                onClose();
            },
            refetchQueries: [{ 
                query: GET_USERS, 
                variables: { 
                    pageSize: 10, 
                    pageNumber: 1, 
                    sortBy: 'id', 
                    sortDirection: 'asc',
                    searchTerm: '',
                    statusFilter: 'ALL'
                }
            }]
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
        setInputError(false);
    };

    const onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        inputValueRef.current = e.target.value;
        setInputError(false);
    };

    const handleButtonClickYes = () => {
        if (user.userBan) {
            unbanUser({
                variables: {
                    userId: user.id
                }
            });
        } else {
            if (!inputValueRef.current) {
                if (input) {
                    setInputError(true);
                } else {
                    setSelectError(false);
                    setTimeout(() => {
                        setSelectError(true);
                    }, 10);
                }
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

    // Простой стиль для инпута с ошибкой
    const errorInputStyle = inputError ? {
        border: '1px solid #ff3b30'
    } : undefined;

    // Безопасно получаем имя пользователя для отображения
    const userDisplayName = user.profile?.firstName || user.profile?.lastName 
        ? `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim()
        : user.userName;

    return (
        <>
            <Modal title={`User ${user.userBan ? 'un-ban' : 'ban'}`} onClose={onClose}>
                <p className={s.text}>
                    {`Are you sure you want to ${user.userBan ? 'unblock' : 'block'} this user, ${userDisplayName}?`}
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
                        {input && (
                            <div className={s.inputWrapper}>
                                <Input
                                    placeholder="Reason"
                                    onChange={onInputValueChange}
                                    defaultValue={inputValueRef.current}
                                    style={errorInputStyle}
                                />
                            </div>
                        )}
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
            {(banError || unbanError) && <Alertpopup alertType="error" message={'Something went wrong'}/>}
        </>
    );
};
