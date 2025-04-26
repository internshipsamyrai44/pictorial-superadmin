import BackIcon from '../../../../../public/icons/back.svg';
import Link from 'next/link';

import s from './BackLink.module.css';

export const BackLink = () => {
  return (
    <div className={s.container}>
      <Link href={'/users'} className={s.link}>
        <BackIcon /> Back to Users List
      </Link>
    </div>
  );
};
