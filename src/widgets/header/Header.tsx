'use client';
import s from './Header.module.css';
import logoIcon from '../../../public/icons/Inctagram.svg';
import Image from 'next/image';
import { SelectTranslate } from '@/widgets/header/selectTranslate/SelectTranslate';
import Link from 'next/link';

export const Header = () => (
  <header className={s.header}>
    <Link href={'/'}>
      <Image src={logoIcon} alt="Inctagram" />
    </Link>
    <SelectTranslate />
  </header>
);
