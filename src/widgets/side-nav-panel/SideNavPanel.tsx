'use client';

import { PATH } from '@/shared/consts/PATH';
import {
  MessengerActiveIcon,
  MessengerIcon,
  MyProfileActiveIcon,
  MyProfileIcon,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarItem,
  SidebarLink,
  StatisticsActiveIcon,
  StatisticsIcon
} from '@internshipsamyrai44-ui-kit/components-lib';
import s from './SideNavPanel.module.scss';
import { usePathname } from 'next/navigation';

type SideNavBar = {
  className?: string;
};

export const SideNavPanel = ({ className }: SideNavBar) => {
  const pathname = usePathname();
  const hideSidebar = pathname?.includes('/user/');
  const options = [
    { icon: MyProfileIcon, iconActive: MyProfileActiveIcon, title: 'Users list', url: PATH.USERS, value: 'users' },
    {
      icon: StatisticsIcon,
      iconActive: StatisticsActiveIcon,
      title: 'Statistics',
      url: PATH.STATISTICS,
      value: 'statistics'
    },
    {
      icon: MyProfileIcon,
      iconActive: MyProfileActiveIcon,
      title: 'Payments list',
      url: PATH.PAYMENTS,
      value: 'payments'
    },
    { icon: MessengerIcon, iconActive: MessengerActiveIcon, title: 'Posts list', url: PATH.POSTS, value: 'posts' }
  ];

  return (
    <Sidebar className={className}>
      {!hideSidebar && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {options.map((item) => (
                <SidebarLink href={item.url} key={item.value}>
                  <SidebarItem
                    className={s.sidebarItem}
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    isActive={pathname === item.url}
                  />
                </SidebarLink>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
};
