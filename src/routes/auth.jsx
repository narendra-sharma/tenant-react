import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Page as CustomAuthResetPasswordPage } from '@/pages/auth/custom/reset-password';
import { Page as CustomAuthResetPasswordSentPage } from '@/pages/auth/custom/reset-password-sent';
import { Page as CustomAuthSignInPage } from '@/pages/auth/custom/sign-in';
import { Page as CustomAuthSignUpPage } from '@/pages/auth/custom/sign-up';
import { Page as CustomAuthUpdatePasswordPage } from '@/pages/auth/custom/update-password';
import { AuthStrategy } from '@/lib/auth/strategy';
import { AuthGuard } from '@/components/auth/auth-guard';
import { GuestGuard } from '@/components/auth/guest-guard';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const routes = [
  {
    path: '/',
    element: (
      <StrategyGuard expected={AuthStrategy.CUSTOM}>
        <Outlet />
      </StrategyGuard>
    ),
    children: [
      {
        path: '/',
        index: true,
        element: (
          <GuestGuard>
            <CustomAuthSignInPage />
          </GuestGuard>
        ),
      },
      {
        path: 'reset-password-sent',
        element: (
          <GuestGuard>
            <CustomAuthResetPasswordSentPage />
          </GuestGuard>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <GuestGuard>
            <CustomAuthResetPasswordPage />
          </GuestGuard>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <GuestGuard>
            <CustomAuthSignUpPage />
          </GuestGuard>
        ),
      },
      {
        path: 'update-password',
        element: (
          <GuestGuard>
            <CustomAuthUpdatePasswordPage />
          </GuestGuard>
        ),
      },
    ],
  },
  // {
  //   path: 'auth/supabase',
  //   element: (
  //     <StrategyGuard expected={AuthStrategy.SUPABASE}>
  //       <Outlet />
  //     </StrategyGuard>
  //   ),
  //   children: [
  //     {
  //       path: 'callback',
  //       element: <SupabaseAuthCallbackPage />,
  //     },
  //     {
  //       path: 'reset-password',
  //       element: (
  //         <GuestGuard>
  //           <SupabaseAuthResetPasswordPage />
  //         </GuestGuard>
  //       ),
  //     },
  //     {
  //       path: 'recover-link-sent',
  //       element: (
  //         <GuestGuard>
  //           <SupabaseAuthResetPasswordSentPage />
  //         </GuestGuard>
  //       ),
  //     },
  //     {
  //       path: 'sign-in',
  //       element: (
  //         <GuestGuard>
  //           <SupabaseAuthSignInPage />
  //         </GuestGuard>
  //       ),
  //     },
  //     {
  //       path: 'sign-up',
  //       element: (
  //         <GuestGuard>
  //           <SupabaseAuthSignUpPage />
  //         </GuestGuard>
  //       ),
  //     },
  //     {
  //       path: 'sign-up-confirm',
  //       element: (
  //         <GuestGuard>
  //           <SupabaseAuthSignUpConfirmPage />
  //         </GuestGuard>
  //       ),
  //     },
  //     {
  //       path: 'update-password',
  //       element: (
  //         <AuthGuard>
  //           <SupabaseAuthUpdatePasswordPage />
  //         </AuthGuard>
  //       ),
  //     },
  //   ],
  // },
];
