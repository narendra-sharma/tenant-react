import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { config } from '@/config';
import { paths } from '@/paths';
import { ResetPasswordForm } from '@/components/auth/custom/reset-password-form';
import { SplitLayout } from '@/components/auth/split-layout';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const metadata = {
  title: `Reset Password | ${config.site.name}`,
};

export function Page() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SplitLayout>
        <Stack spacing={3}>
          <Typography level="h3" textAlign="center">
            {t('ResetPass')}
          </Typography>
          <ResetPasswordForm />
        </Stack>
      </SplitLayout>
    </React.Fragment>
  );
}
