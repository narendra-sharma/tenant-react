import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
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
          icon: 'chart-pie',
        },
        {
          key: 'dashboard:account',
          title: 'Settings',
          href: paths['dashboard.account'],
          icon: 'currency-btc',
        },
        {
          key: 'dashboard:admin',
          title: 'Admin',
          icon: 'shopping-cart',
          items: [
            {
              key: 'dashboard:admin:tennats',
              title: 'Tenants',
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
