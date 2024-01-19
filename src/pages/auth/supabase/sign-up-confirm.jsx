import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useSearchParams } from 'react-router-dom';

import { paths } from '@/paths';
import { SplitLayout } from '@/components/auth/split-layout';
import { SignUpResendButton } from '@/components/auth/supabase/sign-up-resend-button';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

export const metadata = {
  title: 'Sign Up Confirm',
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
          Confirm your email
        </Typography>
        <Typography textAlign="center">
          We&apos;ve sent a verification email to <Typography fontWeight="lg">&quot;{email}&quot;</Typography>.
        </Typography>
        <SignUpResendButton email={email}>Resend</SignUpResendButton>
      </Stack>
    </SplitLayout>
  );
}
