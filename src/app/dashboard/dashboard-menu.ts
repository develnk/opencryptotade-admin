import { NbMenuItem } from '../@core/nebular-theme/public_api';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main',
    link: '/dashboard',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    children: [
      {
        title: 'Department',
        icon: 'person-outline',
        link: '/dashboard/department',
      },
      {
        title: 'Daemons',
        icon: 'behance-outline',
        link: '/dashboard/daemons',
      },
      {
        title: 'Regional',
        icon: 'globe-outline',
        link: '/dashboard/regional',
      },
      {
        title: 'SMTP',
        link: '/dashboard/smtp',
        icon: 'at-outline'
      },
    ],
  },
];
