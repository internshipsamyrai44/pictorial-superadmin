import { Button, Card, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './SignIn.module.css';
import { useLogin } from '@/pages/auth/hooks/useLogin';

export const SignIn = () => {
  const email = 'admin@gmail.com';
  const password = 'admin';

  const { login, loading, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password).catch((err) => {
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
