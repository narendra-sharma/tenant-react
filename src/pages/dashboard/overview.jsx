import * as React from 'react';
import { get_dashboard_devices, get_dashboard_devices_reading } from '@/reduxData/devices/deviceAction';
import { Box } from '@mui/joy';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { connect, useDispatch, useSelector } from 'react-redux';

import { config } from '@/config';
import { DeviceTable } from '@/components/dashboard/customer/device-table';
import { DeviceSummary } from '@/components/dashboard/overview/device-summary';
import { Orders } from '@/components/dashboard/overview/orders';
import { PowerUsageToday } from '@/components/dashboard/smart-home/power-usage-today';

const metadata = {
  title: `Dashboard | ${config.site.name}`,
};

export function Page() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    get_dashboard_devices(dispatch);
    get_dashboard_devices_reading(dispatch);
  }, []);
  const [dashboardDevices, setDashboardDevices] = React.useState(null);
  const [graphData, setGraphData] = React.useState(null);
  const select = useSelector((state) => state);
  React.useEffect(() => {
    setDashboardDevices(select?.device?.dashboardDevices);
    setGraphData(select?.device?.dashboard_devices);
  }, [select]);

  const userPermissions = JSON.parse(localStorage.getItem('permissions'));
  const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;
  // console.log(userPermissions,userRole)
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={3}>
            <div>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                DashBoard
              </Typography>
            </div>
            <DeviceSummary
              active={dashboardDevices?.water_meter_count}
              canceled={dashboardDevices?.offline_devices}
              completed={dashboardDevices?.electric_meter_count}
              total={dashboardDevices?.device_data_total}
            />

            {/* {(userRole == 'admin' || userPermissions && userPermissions['Tenant Management']?.can_view_devices) && ( */}
              <Box>
                <Grid container spacing={3}>
                  <Grid lg={4} xl={4} xs={12}>
                    <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                      <FormLabel>Device Name</FormLabel>
                      <Input defaultValue="" name="orderId" />
                    </FormControl>
                  </Grid>
                  <Grid lg={4} xl={4} xs={12}>
                    <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                      <FormLabel>Client Name</FormLabel>
                      <Input defaultValue="" name="customer" />
                    </FormControl>
                  </Grid>
                  <Grid lg={4} xl={4} xs={12}>
                    <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                      <FormLabel>Status</FormLabel>
                      <Select defaultValue="all" name="status">
                        <Option value="all">All</Option>
                        <Option value="active">Online</Option>
                        <Option value="canceled">Offline</Option>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                  <DeviceTable rows={dashboardDevices?.device_data} />
                </Card>
              </Box>
            {/* )} */}
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <PowerUsageToday data={graphData?.readingHpurlyResponse} />
              </Grid>
              <Grid md={6} xs={12}>
                <Orders data={graphData?.data} />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
