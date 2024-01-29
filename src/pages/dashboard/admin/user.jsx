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
          startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
        >
          Create
        </Button>
      </Stack>
    </Stack>
      
   </Stack>
  </Container>
};

export default user;
