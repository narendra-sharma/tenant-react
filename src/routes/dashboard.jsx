import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Layout as AccountLayout } from '@/components/dashboard/account/layout';
import { Layout as DashboardLayout } from '@/components/dashboard/layout';
import { Layout as TeamLayout } from '@/components/dashboard/team/layout';
import { CreateTennant } from '@/pages/dashboard/admin/create/tenant';
import { CreateUser } from '@/pages/dashboard/admin/create/user';
import { CreateDevice } from '@/pages/dashboard/admin/create/device';
import UpdateTenant from '@/pages/dashboard/admin/update/tenant';
import UpdateUser from '@/pages/dashboard/admin/update/user';
import UpdateDevices from '@/pages/dashboard/admin/update/devices';
import Device_details from '@/pages/dashboard/admin/device_details';

// Account pages

// const AccountBillingPage = React.lazy(() =>
//   import('@/pages/dashboard/account/billing').then((m) => ({ default: m.Page }))
// );
const AccountProfilePage = React.lazy(() => import('@/pages/dashboard/account/profile'));
const AccountSecurityPage = React.lazy(() =>
  import('@/pages/dashboard/account/security').then((m) => ({ default: m.Page }))
);

// Dashboard pages

const OverviewPage = React.lazy(() => import('@/pages/dashboard/overview').then((m) => ({ default: m.Page })));
const DevicesPage = React.lazy(() => import('@/pages/dashboard/devices'));
// const SmartHomePage = React.lazy(() => import('@/pages/dashboard/smart-home').then((m) => ({ default: m.Page })));
// const LogisticsPage = React.lazy(() => import('@/pages/dashboard/logistics').then((m) => ({ default: m.Page })));
// const AnalyticsPage = React.lazy(() => import('@/pages/dashboard/analytics').then((m) => ({ default: m.Page })));
// const CryptoPage = React.lazy(() => import('@/pages/dashboard/crypto').then((m) => ({ default: m.Page })));
// Customer pages
// const CustomerCreatePage = React.lazy(() =>
//   import('@/pages/dashboard/customers/create').then((m) => ({ default: m.Page }))
// );
// const CustomerDetailsPage = React.lazy(() =>
//   import('@/pages/dashboard/customers/details').then((m) => ({ default: m.Page }))
// );
// const CustomerListPage = React.lazy(() =>
//   import('@/pages/dashboard/customers/list').then((m) => ({ default: m.Page }))
// );

// admin pages
const PermissionsPage = React.lazy(() => import('@/pages/dashboard/admin/permissions'));
const TennatsPages = React.lazy(() => import('@/pages/dashboard/admin/tennats'));
const UserPages = React.lazy(() => import('@/pages/dashboard/admin/user'));
const DevicesPages = React.lazy(() => import('@/pages/dashboard/admin/devices'));

// Invoice pages

// const InvoiceCreatePage = React.lazy(() =>
//   import('@/pages/dashboard/invoices/create').then((m) => ({ default: m.Page }))
// );
// const InvoiceDetailsPage = React.lazy(() =>
//   import('@/pages/dashboard/invoices/details').then((m) => ({ default: m.Page }))
// );
// const InvoiceListPage = React.lazy(() => import('@/pages/dashboard/invoices/list').then((m) => ({ default: m.Page })));

// Order pages

// const OrderCreatePage = React.lazy(() => import('@/pages/dashboard/orders/create').then((m) => ({ default: m.Page })));
// const OrderDetailsPage = React.lazy(() =>
//   import('@/pages/dashboard/orders/details').then((m) => ({ default: m.Page }))
// );
// const OrderListPage = React.lazy(() => import('@/pages/dashboard/orders/list').then((m) => ({ default: m.Page })));

// Product pages

// const ProductCreatePage = React.lazy(() =>
//   import('@/pages/dashboard/products/create').then((m) => ({ default: m.Page }))
// );
// const ProductDetailsPage = React.lazy(() =>
//   import('@/pages/dashboard/products/details').then((m) => ({ default: m.Page }))
// );
// const ProductListPage = React.lazy(() => import('@/pages/dashboard/products/list').then((m) => ({ default: m.Page })));

// Tasks pages

// const TasksPage = React.lazy(() => import('@/pages/dashboard/tasks').then((m) => ({ default: m.Page })));

// Team pages

const TeamMembersPage = React.lazy(() => import('@/pages/dashboard/team/members').then((m) => ({ default: m.Page })));
const TeamPermissionsPage = React.lazy(() =>
  import('@/pages/dashboard/team/permissions').then((m) => ({ default: m.Page }))
);

// Other pages

// const BlankPage = React.lazy(() => import('@/pages/dashboard/blank').then((m) => ({ default: m.Page })));

export const routes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'account',
        element: (
          <AccountLayout>
            <Outlet />
          </AccountLayout>
        ),
        children: [
          {
            index: true,
            element: <AccountProfilePage />,
          },
          {
            path: 'security',
            element: <AccountSecurityPage />,
          },
        ],
      },
      {
        path: 'devices',
        children: [
          {
            index: true,
            element: <DevicesPage />,
          },
          {
            path: ':tenantId',
            element: <Device_details />,
          },
          
        ],
      },
      {
        path: 'team',
        element: (
          <TeamLayout>
            <Outlet />
          </TeamLayout>
        ),
        children: [
          {
            path: 'members',
            element: <TeamMembersPage />,
          },
          {
            path: 'permissions',
            element: <TeamPermissionsPage />,
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            index: true,
            element: <PermissionsPage />,
          },
          {
            path: 'permissions',
            element: <PermissionsPage />,
          },
          {
            path: 'tennants',
            children: [
              {
                index: true,
                element: <TennatsPages />,
              },
              {
                path: 'create',
                element: <CreateTennant />,
              },
              {
                path: 'update/:tenantId',
                element: <UpdateTenant />,
              },
              
            ],
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: <UserPages />,
              },
              {
                path: 'create',
                element: <CreateUser />,
              },
              {
                path: 'update/:userId',
                element: <UpdateUser />,
              },
            ],
          },
          {
            path: 'devices',
            children: [
              {
                index: true,
                element: <DevicesPages />,
              },
              {
                path: 'create',
                element: <CreateDevice />,
              },
              {
                path: 'update/:deviceId',
                element: <UpdateDevices />,
              },
            ],
          },
        ],
      },
    ],
  },
];
