'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useSearchParams } from 'react-router-dom';

import { paths } from '@/paths';
import { SplitLayout } from '@/components/auth/split-layout';
import { ResetPasswordButton } from '@/components/auth/supabase/reset-password-button';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

export const metadata = {
  title: 'Recover Link Sent',
};

function useEmail() {
  const [searchParams] = useSearchParams();
  return searchParams.get('email') ?? '';
}

export function Page() {
  const email = useEmail();

  return (
    <SplitLayout>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Box component={RouterLink} href={paths['home']} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
          </Box>
        </Stack>
        <Typography level="h3" textAlign="center">
          Recover Link Sent
        </Typography>
        <Typography textAlign="center">
          If an account exists with email <Typography fontWeight="lg">&quot;{email}&quot;</Typography>, you will receive
          a recovery email.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link component={RouterLink} href={paths['auth.supabase.reset-password']}>
            Use another email
          </Link>
        </Box>
        <ResetPasswordButton email={email}>Resend</ResetPasswordButton>
      </Stack>
    </SplitLayout>
  );
}
