'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          src={row.image}
          sx={{
            '--Avatar-radius': 'var(--joy-radius-sm)',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            height: '42px',
            width: '42px',
          }}
        >
          <PackageIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </Avatar>
        <Typography>{row.name}</Typography>
      </Stack>
    ),
    name: 'Items',
    width: '400px',
  },
  { field: 'quantity', name: 'Qty', width: '100px' },
  { field: 'unitPrice', name: 'Unit Price', width: '100px' },
  { field: 'amount', name: 'Amount', width: '100px' },
  {
    formatter: () => (
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton color="neutral" size="sm" variant="plain">
          <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Stack>
    ),
    hideName: true,
    name: 'Actions',
    width: '50px',
  },
];

export function ItemsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" sx={{ minWidth: '800px' }} />;
}
