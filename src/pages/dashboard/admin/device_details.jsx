import * as React from 'react';
import { Chip } from '@mui/joy';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import DeviceData from '@/components/dashboard/device_details/DeviceData';

const metadata = {
  title: `Create | Customers | Dashboard | ${config.site.name}`,
};

export function Device_details({ deviceData }) {
  const [meterStatus, setMeterStatus] = React.useState(
    deviceData?.device_status == 'online' ? 'success' : deviceData?.device_status == 'offline' ? 'danger' : ''
  );
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
                  Device Details {deviceData?.device_name}
                  <Chip variant="success" color={meterStatus}>
                    {deviceData?.device_status}
                  </Chip>
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem href={paths['dashboard.admin.devices']}>Devices</BreadcrumbsItem>
                  <BreadcrumbsItem type="end"> {deviceData?.device_name}</BreadcrumbsItem>
                </Breadcrumbs>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <DeviceData />
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    deviceData: state.device.dashboardDevices,
  };
};

export default connect(mapStateToProps)(Device_details);
