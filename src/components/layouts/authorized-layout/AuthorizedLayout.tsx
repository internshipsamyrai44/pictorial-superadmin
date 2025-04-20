import { SideNavPanel } from '@/widgets/side-nav-panel/SideNavPanel';
import s from './AuthorizedLayout.module.scss';
import { PropsWithChildren } from 'react';

export const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.container}>
      <SideNavPanel className={s.sideNavPanel} />
      {children}
    </div>
  );
};
