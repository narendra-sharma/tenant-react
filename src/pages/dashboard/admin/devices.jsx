import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import dayjs from 'dayjs';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/customer/device-table';
import { Pagination } from '@/components/core/pagination';

import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import { RouterLink } from '@/components/core/link';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { connect, useDispatch } from 'react-redux';
import { get_devices } from '@/reduxData/devices/deviceAction';
import CustomPagination from '@/components/core/custom-pagination';
const customers = [
  {
    id: 'k5',
    createdAt: dayjs().subtract(1, 'day').valueOf(), 
    customerName: 'Chris Glasser',
    reading: '25,40',
    items: '13,04', 
    reading: '1',
    status: 'online',
  },
  {
    id: 'k4',
    createdAt: dayjs().subtract(1, 'day').valueOf(),
    customerName: 'Iva Ryan',
    reading:'25,40',
    items: '13,04',
    status: 'online',
  },
  {
    id: 'k2',
    createdAt: dayjs().subtract(3, 'day').subtract(3, 'hour').valueOf(),
    customerName: 'Ricky Smith',
    reading: '25,40',
    items: '13,04',
    status: 'offline',
  },
  {
    id: 'k3',
    createdAt: dayjs().subtract(3, 'day').valueOf(),
    customerName: 'Kenneth Allen',
    reading: '25,40',
    items: '13,04',
    status: 'online',
  },
  {
    id: 'k1',
    createdAt: dayjs().subtract(2, 'day').valueOf(),
    customerName: 'Mary Freund',
    reading: '25,40',
    items: '13,04',
    status: 'offline',
  },
];
// const user = {
//   firstName: 'K1',
//   lastName: 'Wells',
//   serailNumber:  '86800001562435',
//   cfirstName: 'Zaid',
//   clastName: 'Schwartz',
//   tenant1: "Tenant 1",
//   tenant2:'Publish to Tenant',
// }
const Devices = ({devices,total}) => {

  const dispatch = useDispatch()
  const [tenant, setDevices] = useState(null);
  const [company, setCompany] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    get_devices(dispatch, page, limit, company, status);
  }, [page, limit, company, status]);
  
  return (  
      <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Devices
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <BreadcrumbsItem href={paths['dashboard']} type="start" />
              <BreadcrumbsItem type="end"> ADMIN</BreadcrumbsItem>
              <BreadcrumbsItem type="end">Devices</BreadcrumbsItem>
            </Breadcrumbs>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button
              component={RouterLink}
              href={paths['dashboard.admin.create.device']}
              startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            >
              Create
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Device Name</FormLabel>
              <Input defaultValue="" name="orderId" />
            </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
            <FormLabel>Client Name</FormLabel>
            <Input defaultValue="" name="customer" />
          </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
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
          <DeviceTable rows={devices} />
        </Card>
        {total > 0 && <CustomPagination total={total} onPageChange={(newPage, perPage) =>{setPage(newPage);setLimit(perPage);}} />}
        {/* <Box sx={{ display: 'flex', justifyContent: 'center' , textCenter: 'center'}}>
        <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined"/>
        </Box> */}
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

export default connect(mapStateToProps)(Devices);