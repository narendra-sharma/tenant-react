import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { CustomerCreateForm } from '@/components/dashboard/customer/customer-create-form';

const metadata = {
  title: `Create | Customers | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={5}>
            <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                  Create a Customer
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem href={paths['dashboard.customers']}>{t('Customers')}</BreadcrumbsItem>
                  <BreadcrumbsItem type="end">Create</BreadcrumbsItem>
                </Breadcrumbs>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Button
                  color="neutral"
                  component={RouterLink}
                  href={paths['dashboard.customers']}
                  startDecorator={<ArrowLeftIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                  variant="outlined"
                >
                  {t('Cancel')}
                </Button>
              </Stack>
            </Stack>
            <CustomerCreateForm />
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
