import { Button, Card, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './SignIn.module.css';
import { gql, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`;

export const SignIn = () => {
  const email = 'admin@gmail.com';
  const password = 'admin';
  const [LoginAdmin, { loading, error }] = useMutation(LOGIN_ADMIN);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    LoginAdmin({
      variables: { email, password }
    })
      .then((res) => {
        if (res.data.loginAdmin.logged) {
          Cookies.set('accessToken', 'true', {
            path: '/users'
          });
          router.push('/');
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
