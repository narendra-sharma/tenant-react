import React from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import dayjs from 'dayjs';
import Typography from '@mui/joy/Typography';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/customer/device-table';
import { Pagination } from '@/components/core/pagination';

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

const devices = () => {
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
        <Stack direction={{ md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <FormControl sx={{ maxWidth: '300px', mr: 'auto', width: '100%' }}>
              <FormLabel>Device Name</FormLabel>
              <Input defaultValue="" name="orderId" />
            </FormControl>
            <FormControl sx={{ maxWidth: '300px', width: '100%' }}>
              <FormLabel>Client Name</FormLabel>
              <Input defaultValue="" name="customer" />
            </FormControl>
            <FormControl sx={{ maxWidth: '300px', width: '100%' }}>
              <FormLabel>Status</FormLabel>
              <Select defaultValue="all" name="status">
                <Option value="all">All</Option>
                <Option value="active">Online</Option>
                <Option value="canceled">Offline</Option>
                
              </Select>
            </FormControl>
           
          </Stack>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <DeviceTable rows={customers} />
          </Card>
          <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined" />
          
       </Stack>
      </Container>
  );
}
export default devices;