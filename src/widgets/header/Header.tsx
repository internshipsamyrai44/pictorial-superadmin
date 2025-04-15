'use client'

import s from './Header.module.css'
import logoIcon from '../../../public/icons/Inctagram.svg'
import Image from 'next/image'
import {SelectTranslate} from "@/widgets/header/selectTranslate/SelectTranslate"

export const Header = () => (
  <header className={s.header}>
    <Image src={logoIcon} alt="Inctagram"/>
    <SelectTranslate />
  </header>
)