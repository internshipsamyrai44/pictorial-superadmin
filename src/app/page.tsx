import s from '@/app/(pages)/login/index.module.css';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/users');
}
