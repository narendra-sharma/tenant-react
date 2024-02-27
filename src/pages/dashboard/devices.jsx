import React, { useEffect, useState } from 'react';
import { get_devices } from '@/reduxData/rootAction';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/customer/device-table';

const devices = ({ devices, total }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [device, setDevices] = useState(null);
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  useEffect(() => {
    get_devices(dispatch, page, limit, device, client, status);
  }, [page, limit, device, client, status]);
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && total > devices.length) {
      setPage(page + 1);
      get_devices(dispatch, page + 1, limit, device, client, status);
    }
  };
  const disableWindowScroll = () => {
    document.body.style.overflow = 'hidden';
    const elements = document.querySelectorAll('.body-pan');
    elements.forEach((element) => {
      element.style.overflow = 'hidden';
    });
  };
  const enableWindowScroll = () => {
    document.body.style.overflow = 'auto';
    const elements = document.querySelectorAll('.body-pan');
    elements.forEach((element) => {
      element.style.overflow = 'auto';
    });
  };
  useEffect(() => {
    disableWindowScroll();
    return () => {
      enableWindowScroll();
    };
  }, []);
  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          {t('Devices')}
        </Typography>
        <Breadcrumbs separator={<BreadcrumbsSeparator />}>
          <BreadcrumbsItem href={paths['dashboard']} type="start" />
          <BreadcrumbsItem type="end">{t('Devices')}</BreadcrumbsItem>
        </Breadcrumbs>
        <Grid container spacing={3}>
          <Grid lg={4} xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Device Name</FormLabel>
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
              <FormLabel>Client Name</FormLabel>
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
              <FormLabel>Status</FormLabel>
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
        <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
          <div className="scroll-table-container" onScroll={handleScroll}>
            {devices && devices.length ? (
              <DeviceTable rows={devices} />
            ) : (
              <Typography fontSize={{ xs: 'xl0', lg: 'xl0' }} level="h4">
                No Devices Found
              </Typography>
            )}
          </div>
        </Card>
      </Stack>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    devices: state.device.devices,
    total: state.device.total,
  };
};

export default connect(mapStateToProps)(devices);
