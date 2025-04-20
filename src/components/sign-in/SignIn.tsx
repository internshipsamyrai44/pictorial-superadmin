import { Button, Card, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './SignIn.module.css';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { LOGIN_ADMIN } from '@/features/auth/api';
import { LoginAdminResponse } from '@/features/auth/types';

export const SignIn = () => {
  const email = 'admin@gmail.com';
  const password = 'admin';
  const [loginAdmin, { loading, error }] = useMutation<LoginAdminResponse>(LOGIN_ADMIN);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginAdmin({
      variables: { email, password }
    })
      .then((res) => {
        if (res.data?.loginAdmin.logged) {
          Cookies.set('accessToken', 'true', {
            path: '/'
          });
          router.push('/users');
        }
      })
      .catch((err) => {
        console.error('Ошибка при входе', err);
      });
  };

  return (
    <Card className={s.container}>
      <Typography variant="h2" className={s.title}>
        Sign in
      </Typography>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input type="email" label="Email" placeholder="Epam@epam.com" defaultValue={email} />
        <Input
          label="Пароль"
          type="password"
          placeholder="***************"
          className={s.password}
          defaultValue={password}
        />

        <Button className={s.button} type="submit" disabled={loading}>
          Sign in
        </Button>
      </form>

      {error && <Typography className={s.error}>Ошибка при входе. Пожалуйста, попробуйте снова.</Typography>}
    </Card>
  );
};
