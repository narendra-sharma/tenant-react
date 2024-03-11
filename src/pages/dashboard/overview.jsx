import * as React from 'react';
import { get_dashboard_devices, get_dashboard_devices_reading, get_devices } from '@/reduxData/devices/deviceAction';
import { Box } from '@mui/joy';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { config } from '@/config';
import { DeviceTable } from '@/components/dashboard/customer/device-table';
import { DeviceSummary } from '@/components/dashboard/overview/device-summary';
import { Orders } from '@/components/dashboard/overview/orders';
import { PowerUsageToday } from '@/components/dashboard/smart-home/power-usage-today';

const metadata = {
  title: `Dashboard | ${config.site.name}`,
};

export function Page({ devices,total }) {
  const dispatch = useDispatch();
  const [device, setDevices] = React.useState(null);
  const [client, setClient] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(50);
  const { t } = useTranslation();
  React.useEffect(() => {
    const token = localStorage.getItem('custom-auth-token');
    const decoded = jwtDecode(token);
    if(decoded.exp < Date.now() / 1000){
      localStorage.clear()
      window.location.reload();
    }

    get_dashboard_devices_reading(dispatch);
  }, []);

  const [graphData, setGraphData] = React.useState(null);
  const select = useSelector((state) => state);

  const [filteredData, setFilteredData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await get_dashboard_devices(dispatch, page, limit, device, client, status);
        setFilteredData(apiResponse);
      } catch (error) {
        console.error('Error calling get_dashboard_devices:', error);
      }
    };

    fetchData();
  }, [page, limit, device, client, status]);

  React.useEffect(() => {
    setGraphData(select?.device?.dashboard_devices);
  }, [select?.device?.dashboard_devices]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && total > devices.length) {
      setPage(page + 1);
      get_devices(dispatch, page + 1, limit, device, client, status);
    }
  };
  const disableWindowScroll = () => {
    document.body.style.overflow = 'auto';
    const elements = document.querySelectorAll('.body-pan');
    elements.forEach((element) => {
      element.style.overflow = 'auto';
    });
  };
  const enableWindowScroll = () => {
    document.body.style.overflow = 'auto';
    const elements = document.querySelectorAll('.body-pan');
    elements.forEach((element) => {
      element.style.overflow = 'auto';
    });
  };
  React.useEffect(() => {
    disableWindowScroll();
    return () => {
      enableWindowScroll();
    };
  }, []);

  const userPermissions = JSON.parse(localStorage.getItem('permissions'));
  const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;
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
                {t('Dashboard')}
              </Typography>
            </div>
            <DeviceSummary
              active={select?.device?.dashboardDevices?.water_meter_count}
              canceled={select?.device?.dashboardDevices?.offline_devices}
              completed={select?.device?.dashboardDevices?.electric_meter_count}
              total={select?.device?.dashboardDevices?.device_data_total}
            />
            {(userRole == 'admin' || (userPermissions && userPermissions['Tenant Management']?.can_view_devices)) && (
              <>
                <Box>
                  <Grid container spacing={3}>
                    <Grid lg={4} xl={4} xs={12}>
                      <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                        <FormLabel>{t('DeviceName')}</FormLabel>
                        <Input
                          defaultValue={device}
                          name="device"
                          onChange={(e) =>
                            window.setTimeout(() => {
                              setDevices(e.target.value);
                            }, 1000)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid lg={4} xl={4} xs={12}>
                      <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                        <FormLabel>{t('Tenant')}</FormLabel>
                        <Input
                          defaultValue={client}
                          name="client"
                          onChange={(e) =>
                            window.setTimeout(() => {
                              setClient(e.target.value);
                            }, 1000)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid lg={4} xl={4} xs={12}>
                      <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
                        <FormLabel>{t('Status')}</FormLabel>
                        <select
                          defaultValue={status}
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-control"
                        >
                          <option value="">All</option>
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                      </FormControl>
                    </Grid>
                  </Grid>

                    <div className="scroll-table-container device-table" onScroll={handleScroll} style={{marginTop:'20px'}}>
                  <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                      {filteredData && filteredData?.length ? (
                        <DeviceTable rows={filteredData} />
                      ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>No Dashboard Devices Found</div>
                      )}
                  </Card>
                    </div>
                </Box>
                <Grid container spacing={3}>
                  <Grid md={6} xs={12}>
                    <PowerUsageToday data={graphData?.readingHpurlyResponse} />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Orders data={graphData?.data} />
                  </Grid>
                </Grid>
              </>
            )}
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    devices: state.device.devices,
    total: state.device.total,
  };
};

export default connect(mapStateToProps)(Page);
