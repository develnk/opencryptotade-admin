import { NbMenuItem } from '@nebular/theme';

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
        icon: 'at-outline',
        link: '/dashboard/smtp',
        children: [
          {
            title: 'Settings',
            icon: 'settings-outline',
            link: '/dashboard/smtp'
          },
          {
            title: 'Template Builder',
            icon: 'layout-outline',
            link: '/dashboard/template_builder',
          },
        ]
      },
    ],
  },
];
