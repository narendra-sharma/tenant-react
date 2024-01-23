import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Layout as AccountLayout } from '@/components/dashboard/account/layout';
import { Layout as DashboardLayout } from '@/components/dashboard/layout';
import { Layout as TeamLayout } from '@/components/dashboard/team/layout';

// Account pages

const AccountBillingPage = React.lazy(() =>
  import('@/pages/dashboard/account/billing').then((m) => ({ default: m.Page }))
);
const AccountProfilePage = React.lazy(() =>
  import('@/pages/dashboard/account/profile').then((m) => ({ default: m.Page }))
);
const AccountSecurityPage = React.lazy(() =>
  import('@/pages/dashboard/account/security').then((m) => ({ default: m.Page }))
);

// Dashboard pages

const OverviewPage = React.lazy(() => import('@/pages/dashboard/overview').then((m) => ({ default: m.Page })));
const DevicesPage = React.lazy(() => import('@/pages/dashboard/devices'));
const SmartHomePage = React.lazy(() => import('@/pages/dashboard/smart-home').then((m) => ({ default: m.Page })));
const LogisticsPage = React.lazy(() => import('@/pages/dashboard/logistics').then((m) => ({ default: m.Page })));
const AnalyticsPage = React.lazy(() => import('@/pages/dashboard/analytics').then((m) => ({ default: m.Page })));
const CryptoPage = React.lazy(() => import('@/pages/dashboard/crypto').then((m) => ({ default: m.Page })));

// Customer pages

const CustomerCreatePage = React.lazy(() =>
  import('@/pages/dashboard/customers/create').then((m) => ({ default: m.Page }))
);
const CustomerDetailsPage = React.lazy(() =>
  import('@/pages/dashboard/customers/details').then((m) => ({ default: m.Page }))
);
const CustomerListPage = React.lazy(() =>
  import('@/pages/dashboard/customers/list').then((m) => ({ default: m.Page }))
);

// Invoice pages

const InvoiceCreatePage = React.lazy(() =>
  import('@/pages/dashboard/invoices/create').then((m) => ({ default: m.Page }))
);
const InvoiceDetailsPage = React.lazy(() =>
  import('@/pages/dashboard/invoices/details').then((m) => ({ default: m.Page }))
);
const InvoiceListPage = React.lazy(() => import('@/pages/dashboard/invoices/list').then((m) => ({ default: m.Page })));

// Order pages

const OrderCreatePage = React.lazy(() => import('@/pages/dashboard/orders/create').then((m) => ({ default: m.Page })));
const OrderDetailsPage = React.lazy(() =>
  import('@/pages/dashboard/orders/details').then((m) => ({ default: m.Page }))
);
const OrderListPage = React.lazy(() => import('@/pages/dashboard/orders/list').then((m) => ({ default: m.Page })));

// Product pages

const ProductCreatePage = React.lazy(() =>
  import('@/pages/dashboard/products/create').then((m) => ({ default: m.Page }))
);
const ProductDetailsPage = React.lazy(() =>
  import('@/pages/dashboard/products/details').then((m) => ({ default: m.Page }))
);
const ProductListPage = React.lazy(() => import('@/pages/dashboard/products/list').then((m) => ({ default: m.Page })));

// Tasks pages

const TasksPage = React.lazy(() => import('@/pages/dashboard/tasks').then((m) => ({ default: m.Page })));

// Team pages

const TeamMembersPage = React.lazy(() => import('@/pages/dashboard/team/members').then((m) => ({ default: m.Page })));
const TeamPermissionsPage = React.lazy(() =>
  import('@/pages/dashboard/team/permissions').then((m) => ({ default: m.Page }))
);

// Other pages

const BlankPage = React.lazy(() => import('@/pages/dashboard/blank').then((m) => ({ default: m.Page })));

export const routes = [
  {
    path: 'dashboard',
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
            path: 'billing',
            element: <AccountBillingPage />,
          },
          {
            path: 'security',
            element: <AccountSecurityPage />,
          },
        ],
        children: [
          {
            index: true,
            element: <AccountProfilePage />,
          },
          {
            path: 'billing',
            element: <AccountBillingPage />,
          },
          {
            path: 'security',
            element: <AccountSecurityPage />,
          },
        ],
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'devices',
        element: <DevicesPage />,
      },
      {
        path: 'blank',
        element: <BlankPage />,
      },
      {
        path: 'crypto',
        element: <CryptoPage />,
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomerListPage />,
          },
          {
            path: 'create',
            element: <CustomerCreatePage />,
          },
          {
            path: ':customerId',
            element: <CustomerDetailsPage />,
          },
        ],
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />,
          },
          {
            path: 'create',
            element: <InvoiceCreatePage />,
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailsPage />,
          },
        ],
      },
      {
        path: 'logistics',
        element: <LogisticsPage />,
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrderListPage />,
          },
          {
            path: 'create',
            element: <OrderCreatePage />,
          },
          {
            path: ':orderId',
            element: <OrderDetailsPage />,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductListPage />,
          },
          {
            path: 'create',
            element: <ProductCreatePage />,
          },
          {
            path: ':productId',
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: 'smart-home',
        element: <SmartHomePage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
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
    ],
  },
];
