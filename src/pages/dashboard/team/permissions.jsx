import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Permissions } from '@/components/dashboard/team/permissions';

const metadata = {
  title: `Permissions | Team | Dashboard | ${config.site.name}`,
};

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

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Permissions groups={groups} />
      </main>
    </React.Fragment>
  );
}
