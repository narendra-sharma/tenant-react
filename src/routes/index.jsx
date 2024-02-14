import * as React from 'react';

import { Page as NotFoundPage } from '@/pages/not-found';
import { Page as DeviceRename } from '@/pages/device-renaming';
import { routes as authRoutes } from './auth';
import { routes as dashboardRoutes } from './dashboard';
export const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: 'rename-device/:serial_number',
    index:true,
    element: <DeviceRename />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
