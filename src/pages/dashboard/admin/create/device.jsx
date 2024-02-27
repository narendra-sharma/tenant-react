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
import { DeviceCreateForm } from '@/components/dashboard/admin/device-create-form';

const metadata = {
  title: `Create | Customers | Dashboard | ${config.site.name}`,
};

export function CreateDevice() {
  const [dataFromChild, setDataFromChild] = React.useState(null);
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
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
                  {dataFromChild === 'edit' ? 'Update' : 'Create'} {t('Device')}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem type="end">Admin</BreadcrumbsItem>
                  <BreadcrumbsItem href={paths['dashboard.admin.devices']}>{t('Devices')}</BreadcrumbsItem>
                  <BreadcrumbsItem type="end">
                    {dataFromChild === 'edit' ? 'Update' : 'Create'}
                    {t('Device')}
                  </BreadcrumbsItem>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <DeviceCreateForm onDataFromChild={handleDataFromChild} />
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
