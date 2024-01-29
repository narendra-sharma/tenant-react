import React from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { Pagination } from '@/components/core/pagination';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { RouterLink } from '@/components/core/link';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UserTable } from '@/components/dashboard/admin/user-table';
import Box from '@mui/joy/Box';
const customer = [
  {
    userName: 'Full Name',
    userEmail: 'user@company.com',
    phoneNumber: '(907) 555-0101',
    tenant:'Tenant',
    userCompany:'Company',
    permissionProfile: 'Tenant Read-Only',
  },

  {
    userName: 'Full Name',
    userEmail: 'user@company.com',
    phoneNumber: '(907) 555-0101',
    tenant1:'Tenant 1',
    tenant2:'Tenant 2',
    userCompany1:'Company 1',
    userCompany2:'Company 2',
    permissionProfile1: 'Tenant User',
    permissionProfile2: 'Tenant Manager',
  },
  {
    userName: 'Full Name',
    userEmail: 'user@company.com',
    phoneNumber: '(907) 555-0101',
    tenant:'Tenant',
    userCompany:'Company',
    permissionProfile: 'Tenant Manager',
  },
  {
    userName: 'Full Name',
    userEmail: 'user@company.com',
    phoneNumber: '(907) 555-0101',
    tenant:'Tenant',
    userCompany:'Company',
    permissionProfile: 'Tenant Manager',
  },
  {
    userName: 'Full Name',
    userEmail: 'user@company.com',
    phoneNumber: '(907) 555-0101',
    tenant:'Tenant',
    userCompany:'Company',
    permissionProfile: 'Tenant User',
  },
];
const user = () => {
  return <Container maxWidth={false} sx={{ py: 3 }}>
  <Stack spacing={3}>
    <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          Users
        </Typography>
        <Breadcrumbs separator={<BreadcrumbsSeparator />}>
          <BreadcrumbsItem href={paths['dashboard']} type="start" />
          <BreadcrumbsItem href={paths['dashboard.admin']}>ADMIN</BreadcrumbsItem>
          <BreadcrumbsItem type="end">Users</BreadcrumbsItem>
        </Breadcrumbs>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Button
          component={RouterLink}
          href={paths['dashboard.admin.create.user']}
          startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}>
          Create
        </Button>
      </Stack>
      
    </Stack>
    <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
      <UserTable rows={customer}/>
  </Card>
  <Box sx={{ display: 'flex', justifyContent: 'center' , textCenter: 'center'}}>
    <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined" />
  </Box>
   </Stack>
  </Container>
};

export default user;
