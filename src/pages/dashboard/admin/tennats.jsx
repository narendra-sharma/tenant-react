
import React, { useEffect } from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/admin/tenant-table';
import { Pagination } from '@/components/core/pagination';
import Box from '@mui/joy/Box';
import { Button } from '@mui/joy';
import { RouterLink } from '@/components/core/link';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { get_tenants } from '@/reduxData/rootAction';
import { connect,useDispatch } from 'react-redux';

const Tenants = ({tenants}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
  get_tenants(dispatch)
  },[])

  return (  
      <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Tennants
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <BreadcrumbsItem href={paths['dashboard']} type="start" />
              <BreadcrumbsItem href={paths['dashboard.admin']}>ADMIN</BreadcrumbsItem>
              <BreadcrumbsItem type="end">Tennants</BreadcrumbsItem>
            </Breadcrumbs>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button
              component={RouterLink}
              href={paths['dashboard.admin.create.tenant']}
              startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            >
              Create
            </Button>
          </Stack>
        </Stack>
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
          <DeviceTable rows={tenants} />
          
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'center' , textCenter: 'center'}}>
          <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined" />
          </Box>
          
       </Stack>
      </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    tenants: state.tenant.tenants,
  };
};

export default connect(mapStateToProps)(Tenants);