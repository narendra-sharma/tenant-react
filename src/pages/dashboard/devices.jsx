import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/customer/device-table';
import CustomPagination from '@/components/core/custom-pagination';
import { connect,useDispatch } from 'react-redux';
import { get_devices } from '@/reduxData/rootAction';

const devices = ({devices,total}) => {
  
  const dispatch = useDispatch()
  const [device, setDevices] = useState(null);
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    get_devices(dispatch, page, limit,device,client, status);
  }, [page, limit, device,client, status]);
  return (  
      <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          Devices
        </Typography>
        <Breadcrumbs separator={<BreadcrumbsSeparator />}>
          <BreadcrumbsItem href={paths['dashboard']} type="start" />
          <BreadcrumbsItem type="end">Devices</BreadcrumbsItem>
        </Breadcrumbs>
        <Grid container spacing={3}>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Device Name</FormLabel>
              <Input defaultValue={device} name="device" 
                onChange={(e)=>window.setTimeout(() => {
                  setDevices(e.target.value)
                }, 1000)}
              />
            </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
            <FormLabel>Client Name</FormLabel>
            <Input defaultValue={client} name="client" 
                onChange={(e)=>window.setTimeout(() => {
                  setClient(e.target.value)
                }, 1000)}
              />
          </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Status</FormLabel>
              <select defaultValue={status} name="status" onChange={(e)=>setStatus(e.target.value)} className="form-control">
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </FormControl>

          </Grid>
        </Grid>
        <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
          <DeviceTable rows={devices} />
        </Card>
        {total > 0 && <CustomPagination total={total} onPageChange={(newPage, perPage) =>{setPage(newPage);setLimit(perPage);}} />}
          
       </Stack>
      </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    devices: state.device.devices,
    total: state.device.total,
  };
};

export default connect(mapStateToProps)(devices);