import { paths } from '@/paths';
const currentUserRole = JSON.parse(localStorage.getItem('authUser'))?.role;
export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboard',
      items: [
        {
          key: 'dashboard:overview',
          title: 'Dashboard',
          href: paths['dashboard.overview'],
          icon: 'grid-four',
        },
        {
          key: 'dashboard:devices',
          title: 'Devices',
          href: paths['dashboard.devices'],
          icon: 'power',
        },
        {
          key: 'dashboard:account',
          title: 'Settings',
          href: paths['dashboard.account'],
          icon: 'gear-six',
        },
        {
          key: 'dashboard:admin',
          title: 'ADMIN',
          icon: 'buildings',
          items: [
            {
              key: 'dashboard:admin:tennats',
              title: 'Tenant',
              href: paths['dashboard.admin.tennats'],
            },
            {
              key: 'dashboard:admin:user',
              title: 'User',
              href: paths['dashboard.admin.user'],
            },
            {
              key: 'dashboard:admin:devices',
              title: 'Devices',
              href: paths['dashboard.admin.devices'],
            },
            {
              key: 'dashboard:admin:permissions',
              title: 'Permissions',
              href: paths['dashboard.admin.permissions'],
            },
          ],
        },

      ],
    },
  ],
};
