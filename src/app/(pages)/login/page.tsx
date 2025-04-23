'use client';

import s from './index.module.css';
import { SignIn } from '@/pages/auth/ui/SignIn';

const Login = () => {
  return (
    <div className={s.container}>
      <SignIn />
    </div>
  );
};

export default Login;
