
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
import { DeviceTable } from '@/components/dashboard/admin/tenant-table';
import { Pagination } from '@/components/core/pagination';
import Box from '@mui/joy/Box';

const customer = [
  {
    id: 'Tenant',
    address: 'Shreveport, LA 71109',
    companyEmail: 'info@company.com',
    companyName: 'Company',
    phoneNumber: '(907) 555-0101',
    vatId: 'BE0487248925', 
    reading: '1',
    totalDevice: '10',
  },

  {
    id: 'Tenant',
    address: 'Cedar Creek, TX 78612',
    companyName: 'Company',
    companyEmail: 'info@company.com',
    phoneNumber: '(907) 555-0101',
    vatId: 'BE0487248925',
    totalDevice: '15',
  },
  {
    id: 'Tenant',
    address: 'Saint Cloud, FL 34769',
    companyName: 'Company',
    companyEmail: 'info@company.com',
    phoneNumber: '(907) 555-0101',
    vatId: 'BE0487248925',
    totalDevice: '17',
  },
  {
    id: 'Tenant',
    companyName:'Company',
    companyEmail: 'info@company.com',
    address: 'Auburn, CA 95602',
    phoneNumber: '(907) 555-0101',
    vatId: 'BE0487248925',
    totalDevice: '7',
  },
  {
    id: 'Tenant',
    companyName: 'Company',
    companyEmail: 'info@company.com',
    address: 'Vineland, NJ 08360',
    phoneNumber: '(907) 555-0101',
    vatId: 'BE0487248925',
    totalDevice: '143',
  },
];

const tenants = () => {
  return (  
      <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
         Tenants
        </Typography>
        <Breadcrumbs separator={<BreadcrumbsSeparator />}>
          <BreadcrumbsItem href={paths['dashboard']} type="start" />
          <BreadcrumbsItem type="end">Tenant</BreadcrumbsItem>
        </Breadcrumbs>
        <Stack direction={{ md: 'row' }} spacing={3} sx={{ alignvatId: 'BE0487248925start', flexWrap: 'wrap' }}>
            <FormControl sx={{ maxWidth: '300px', mr: 'auto', width: '100%' }}>
              <FormLabel>Tenant Name</FormLabel>
              <Input defaultValue="" name="orderId" />
            </FormControl>
            <FormControl sx={{ maxWidth: '300px', width: '100%' }}>
              <FormLabel>Company Name</FormLabel>
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
          <DeviceTable rows={customer} />
          
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'center' , textCenter: 'center'}}>
          <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined" />
          </Box>
          
       </Stack>
      </Container>
  );
}
export default tenants;