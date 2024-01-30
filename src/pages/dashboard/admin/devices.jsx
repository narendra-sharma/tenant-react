import React from 'react';
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
const user = {
  firstName: 'K1',
  lastName: 'Wells',
  serailNumber:  '86800001562435',
  cfirstName: 'Zaid',
  clastName: 'Schwartz',
  tenant1: "Tenant 1",
  tenant2:'Publish to Tenant',
}
const devices = () => {
  
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
              <BreadcrumbsItem href={paths['dashboard.admin']}>ADMIN</BreadcrumbsItem>
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
        
        <Stack direction={{ md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <FormControl sx={{ maxWidth: '240px', mr: 'auto', width: '100%' }}>
              <FormLabel>Device Name</FormLabel>
              <Input defaultValue="" name="orderId" />
            </FormControl>
            <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
              <FormLabel>Client Name</FormLabel>
              <Input defaultValue="" name="customer" />
            </FormControl>
            <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center' , textCenter: 'center'}}>
        <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined"/>
        </Box>
        </Stack>
      </Container>

  
  );
}
export default devices;