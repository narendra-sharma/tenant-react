import React, { useEffect, useState } from 'react';
import { get_users } from '@/reduxData/user/userAction';
// import { FormControl, Input } from '@mui/base';
import { FormControl, FormLabel, Input } from '@mui/joy';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { connect, useDispatch } from 'react-redux';

import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import CustomPagination from '@/components/core/custom-pagination';
import { RouterLink } from '@/components/core/link';
import { Pagination } from '@/components/core/pagination';
import { UserTable } from '@/components/dashboard/admin/user-table';

const Users = ({ users, total }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [tenant, setTenant] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    get_users(dispatch, page, limit, user, company, status);
  }, [page, limit, user, company, status]);

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
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
              startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            >
              Create
            </Button>
          </Stack>
        </Stack>
        <FormControl sx={{ maxWidth: '300px', mr: 'auto', width: '100%' }}>
            <FormLabel>User Name</FormLabel>
            <Input
              defaultValue={user}
              name="tenant"
              onChange={(e) =>
                window.setTimeout(() => {
                  setUser(e.target.value);
                }, 1000)
              }
            />
          </FormControl>
        <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
          <UserTable rows={users?.data} />
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', textCenter: 'center' }}>
          {total > 0 && (
            <CustomPagination
              total={total}
              onPageChange={(newPage, perPage) => {
                setPage(newPage);
                setLimit(perPage);
              }}
            />
          )}
        </Box>
      </Stack>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    total: state.tenant.total,
  };
};

export default connect(mapStateToProps)(Users);
