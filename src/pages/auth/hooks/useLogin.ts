import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { LOGIN_ADMIN } from '@/features/auth/api';

export const useLogin = () => {
  const router = useRouter();
  const [loginAdminMutation, { loading, error }] = useMutation(LOGIN_ADMIN);

  const login = async (email: string, password: string) => {
    const basicToken = btoa(`${email}:${password}`);
    const res = await loginAdminMutation({ variables: { email, password } });

    if (res.data.loginAdmin.logged) {
      Cookies.set('authToken', basicToken, { path: '/' });
      router.push('/users');
    }
  };

  return { login, loading, error };
};
