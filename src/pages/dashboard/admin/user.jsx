import React, { useEffect, useState } from 'react';
import { get_users } from '@/reduxData/user/userAction';
// import { FormControl, Input } from '@mui/base';
import { FormControl, FormLabel, Input } from '@mui/joy';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { UserTable } from '@/components/dashboard/admin/user-table';

const Users = ({ users, total }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const { t } = useTranslation();
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;

  const dispatch = useDispatch();
  useEffect(() => {
    get_users(dispatch, page, limit, user, company, status);
  }, [page, limit, user, company, status]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && total > users.length) {
      get_users(dispatch, page + 1, limit, user, company, status);
      setPage(page + 1);
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
        <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              {t('User')}
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <BreadcrumbsItem href={paths['dashboard']} type="start" />
              <BreadcrumbsItem href={paths['dashboard.admin']}>{t('Admin')}</BreadcrumbsItem>
              <BreadcrumbsItem type="end">{t('User')}</BreadcrumbsItem>
            </Breadcrumbs>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          {(userRole == 'admin' || permissions['ADMIN Management']?.can_create_new_user) &&  <Button
              component={RouterLink}
              href={paths['dashboard.admin.create.user']}
              startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            >
              {t('Create')}
            </Button>}
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          <Grid lg={4} xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>{t('UserName')}</FormLabel>
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
          </Grid>
        </Grid>
        <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
          <div className="scroll-table-container user-table" onScroll={handleScroll}>
            {users && users.length ? (
              <UserTable rows={users} />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>No User Found</div>
            )}
          </div>
        </Card>
      </Stack>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    total: state.user.tusers,
  };
};

export default connect(mapStateToProps)(Users);
