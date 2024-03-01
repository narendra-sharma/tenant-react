import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Trans, useTranslation } from 'react-i18next';

import { paths } from '@/paths';
import { SplitLayout } from '@/components/auth/split-layout';
import { UpdatePasswordForm } from '@/components/auth/supabase/update-password-form';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

export const metadata = {
  title: 'Update Password',
};

export function Page() {
  const { t } = useTranslation();
  return (
    <SplitLayout>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Box component={RouterLink} href={paths['home']} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
          </Box>
        </Stack>
        <Typography level="h3" textAlign="center">
          {t('UpdatePass')}
        </Typography>
        <UpdatePasswordForm />
      </Stack>
    </SplitLayout>
  );
}
