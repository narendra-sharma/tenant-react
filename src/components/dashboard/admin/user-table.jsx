'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.orders.details']}
        underline="none"
      >
        {row.first_name}
      </Link>
    ),
    name: 'User Name',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography>{row.email}</Typography>
        </div>
      </Stack>
    ),
    name: 'User Email',
    width: '200px',
  },
  { field: 'phone_number', name: 'Phone Number', width: '170px' },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography>{row.tenant}</Typography>
          <Typography level="body-xs">{row.tenant1}</Typography>
          <Typography level="body-xs">{row.tenant2}</Typography>
        </div>
      </Stack>
    ),
    name: 'Tenant(s)',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography>{row.company_name}</Typography>
          <Typography level="body-xs">{row.company_name}</Typography>
          <Typography level="body-xs">{row.company_name}</Typography>
        </div>
      </Stack>
    ),
    name: 'Company',
    width: '170px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography>{row.role}</Typography>
          <Typography level="body-xs">{row.role}</Typography>
          <Typography level="body-xs">{row.role}</Typography>
        </div>
      </Stack>
    ),
    name: 'Permission Profile',
    width: '170px',
  },
  {
    formatter: (row) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          component={RouterLink}
          fontSize="sm"
          fontWeight="md"
          href={paths['dashboard.admin.update.user'](`${row._id}`)}
          underline="none"
        >
          <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </Link>
      </Box>
    ),
    hideName: true,
    name: 'Actions',
    width: '100px',
  },
];

export function UserTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
