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
          href: paths['dashboard'],
          icon: 'grid-four',
        },
        // {
        //   key: 'dashboard:smart-home',
        //   title: 'Smart Home',
        //   href: paths['dashboard.smart-home'],
        //   icon: 'thermometer',
        // },
        // {
        //   key: 'dashboard:logistics',
        //   title: 'Logistics',
        //   href: paths['dashboard.logistics'],
        //   icon: 'truck',
        // },
        {
          key: 'dashboard:devices',
          title: 'Devices',
          href: paths['dashboard.devices'],
          icon: 'chart-pie',
        },
        // {
        //   key: 'dashboard:crypto',
        //   title: 'Crypto',
        //   href: paths['dashboard.crypto'],
        //   icon: 'currency-btc',
        // },
        {
          key: 'dashboard:settings',
          title: 'Settings',
          href: paths['dashboard.settings'],
          icon: 'currency-btc',
        },
      ],
    },
    {
      key: 'general',
      items: [
        {
          key: 'admin',
          title: 'Admin',
          icon: 'shopping-cart',
          items: [
            {
              key: 'admin:tennats',
              title: 'Tenants',
              href: paths['admin.tennats'],
            },
            {
              key: 'admin:users',
              title: 'User',
              href: paths['admin.users'],
            },
            {
              key: 'admin:devices',
              title: 'Devices',
              href: paths['admin.devices'],
            },
            {
              key: 'admin:permissions',
              title: 'Permissions',
              href: paths['admin.permissions'],
            },
          ],
        },
      ],
    },
    // {
    //   key: 'general',
    //   title: 'General',
    //   items: [
    //     {
    //       key: 'dashboard:orders',
    //       title: 'Orders',
    //       icon: 'shopping-cart',
    //       items: [
    //         {
    //           key: 'dashboard:orders',
    //           title: 'List Orders',
    //           href: paths['dashboard.orders'],
    //         },
    //         {
    //           key: 'dashboard:orders:create',
    //           title: 'Create Order',
    //           href: paths['dashboard.orders.create'],
    //         },
    //         {
    //           key: 'dashboard:orders:details',
    //           title: 'Order Details',
    //           href: paths['dashboard.orders.details']('1'),
    //         },
    //       ],
    //     },
    //     {
    //       key: 'dashboard:invoices',
    //       title: 'Invoices',
    //       icon: 'receipt',
    //       items: [
    //         {
    //           key: 'dashboard:invoices',
    //           title: 'List Invoices',
    //           href: paths['dashboard.invoices'],
    //         },
    //         {
    //           key: 'dashboard:invoices:create',
    //           title: 'Create Invoice',
    //           href: paths['dashboard.invoices.create'],
    //         },
    //         {
    //           key: 'dashboard:invoices:details',
    //           title: 'Invoice Details',
    //           href: paths['dashboard.invoices.details']('1'),
    //         },
    //       ],
    //     },
    //     {
    //       key: 'dashboard:products',
    //       title: 'Products',
    //       icon: 'package',
    //       items: [
    //         {
    //           key: 'dashboard:products',
    //           title: 'List Products',
    //           href: paths['dashboard.products'],
    //         },
    //         {
    //           key: 'dashboard:products:create',
    //           title: 'Create Product',
    //           href: paths['dashboard.products.create'],
    //         },
    //         {
    //           key: 'dashboard:products:details',
    //           title: 'Product Details',
    //           href: paths['dashboard.products.details']('1'),
    //         },
    //       ],
    //     },
    //     {
    //       key: 'dashboard:customer',
    //       title: 'Customers',
    //       icon: 'users',
    //       items: [
    //         {
    //           key: 'dashboard:customer',
    //           title: 'List Customers',
    //           href: paths['dashboard.customers'],
    //         },
    //         {
    //           key: 'dashboard:customer:create',
    //           title: 'Create Customer',
    //           href: paths['dashboard.customers.create'],
    //         },
    //         {
    //           key: 'dashboard:customer:details',
    //           title: 'Customer Details',
    //           href: paths['dashboard.customers.details']('1'),
    //         },
    //       ],
    //     },
    //     {
    //       key: 'team',
    //       title: 'Team',
    //       href: paths['dashboard.team.members'],
    //       icon: 'buildings',
    //       matcher: {
    //         type: 'startsWith',
    //         href: paths['dashboard.team'],
    //       },
    //     },
    //     {
    //       key: 'dashboard:tasks',
    //       title: 'Tasks',
    //       href: paths['dashboard.tasks'],
    //       icon: 'kanban',
    //     },
    //     {
    //       key: 'dashboard:settings',
    //       title: 'Settings',
    //       href: paths['dashboard.account'],
    //       icon: 'gear-six',
    //       matcher: {
    //         type: 'startsWith',
    //         href: paths['dashboard.account'],
    //       },
    //     },
    //     {
    //       key: 'dashboard:blank',
    //       title: 'Blank',
    //       href: paths['dashboard.blank'],
    //       icon: 'file',
    //     },
    //   ],
    // },
  ],
};
