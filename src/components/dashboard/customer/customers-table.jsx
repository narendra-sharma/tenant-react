'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { paths } from '@/paths';
import { getInitials } from '@/lib/get-initials';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.customers.details']('1')}
        underline="none"
      >
        {row.id}
      </Link>
    ),
    name: 'Device ID',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Avatar src={row.avatar ?? ''}>{getInitials(row.name)}</Avatar>
        <div>
          <Typography level="body-sm" textColor="text.primary">
            {row.name}
          </Typography>
          <Typography level="body-xs">{row.email}</Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '300px',
  },
  {
    formatter: (row) => `${row.state}, ${row.city}, ${row.zip}`,
    name: 'Address',
    width: '250px',
  },
  { field: 'phoneNumber', name: 'Phone Number', width: '200px' },
  { field: 'orders', name: 'Orders', width: '100px' },
  { field: 'paid', name: 'Paid', width: '140px' },
  {
    formatter: () => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="neutral" size="sm" variant="plain">
          <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Box>
    ),
    hideName: true,
    name: 'Actions',
    width: '100px',
  },
];

export function CustomersTable({ rows }) {
  return <DataTable columns={columns} rows={rows} selectable stripe="even" />;
}
