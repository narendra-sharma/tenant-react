'use client';

import * as React from 'react';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Typography from '@mui/joy/Typography';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';


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
        {row.userName}
      </Link>
    ),
    name: 'User Name',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography >{row.userEmail}</Typography>
        </div>
      </Stack>
    ),
    name: 'User Email',
    width: '200px',
  },
  { field: 'phoneNumber', name: 'Phone Number' ,  width: '170px',},
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
          <Typography>{row.userCompany}</Typography>
          <Typography level="body-xs">{row.userCompany1}</Typography>
          <Typography level="body-xs">{row.userCompany2}</Typography>
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
          <Typography>{row.permissionProfile}</Typography>
          <Typography level="body-xs">{row.permissionProfile1}</Typography>
          <Typography level="body-xs">{row.permissionProfile2}</Typography>
        </div>
      </Stack>
    ),
    name: 'Permission Profile',
    width: '170px',
  },
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

export function UserTable({ rows }) {
  return <DataTable columns={columns} rows={rows}  stripe="even" />;
}
