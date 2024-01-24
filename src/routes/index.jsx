import * as React from 'react';

import { Page as NotFoundPage } from '@/pages/not-found';

import { routes as authRoutes } from './auth';
import { routes as dashboardRoutes } from './dashboard';

export const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
