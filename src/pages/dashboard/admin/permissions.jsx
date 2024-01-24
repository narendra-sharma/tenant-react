import React from 'react'

import { Permissions } from '@/components/dashboard/admin/permissions';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Container from '@mui/joy/Container';
const groups = [
  {
    name: 'Tenant Management',
    permissions: [
      {
        name: 'Can view devices',
        readOnly: true,
        manager: true,
        admin: true,
      },
      {
        name: 'Can view device details ',
        readOnly: true,
        manager: true,
        admin: true,
      },
      {
        name: 'Can change own details',
        readOnly: true,
        manager: true,
        admin: true,
      },
      {
        name: 'Can change device details (except serial number)',
        member: true,
        manager: true,
        admin: true,
      },
      {
        name: 'Can change device rename password',
        member: true,
        manager: true,
        admin: true,
      },
      {
        name: 'Can change company details',
        member: true,
        manager: true,
        admin: true,
      },
    ],
  },
  {
    name: 'ADMIN Management',
    permissions: [
      {
        name: 'Can create tenants',
        admin: true,
      },
      {
        name: 'Can create new users', 
        admin: true,
      },
      {
        name: 'Can create new devices',
        admin: true,
      },
      {
        name: 'Can assign devices to tenants',
        admin: true,
      },
      {
        name: 'Can delete tenants',
        admin: true,
      },
      {
        name: 'Can delete users',
        admin: true,
      },
      {
        name: 'Can delete devices',
        admin: true,
      },
      {
        name: 'Can change serial number of devices',
        admin: true,
      },
    ],
  },
];
const permissions = () => {
  return (
    <main>
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          Permissions
          </Typography>
          <Breadcrumbs separator={<BreadcrumbsSeparator />}>
            <BreadcrumbsItem href={paths['dashboard']} type="start" />
            <BreadcrumbsItem href={paths['dashboard.admin']}>Admin</BreadcrumbsItem>
            <BreadcrumbsItem type="end">Permissions</BreadcrumbsItem>
          </Breadcrumbs>
          <Permissions groups={groups} />
        </Stack>
      </Container>
    </main>

  )
}

export default permissions