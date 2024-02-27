import * as React from 'react';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { AccountTabs } from '@/components/dashboard/account/account-tabs';

export function Layout({ children }) {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
            {t('Settings')}
          </Typography>
          <AccountTabs />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
