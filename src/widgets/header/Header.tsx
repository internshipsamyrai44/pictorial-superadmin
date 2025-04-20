'use client';
import s from './Header.module.css';
import { SelectTranslate } from '@/widgets/header/selectTranslate/SelectTranslate';
import Link from 'next/link';
import LogoIcon from 'public/icons/Inctagram.svg';
export const Header = () => (
  <header className={s.header}>
    <Link href={'/'}>
      <LogoIcon />
    </Link>
    <SelectTranslate />
  </header>
);
