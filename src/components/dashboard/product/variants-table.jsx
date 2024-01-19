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
  { field: 'id', name: 'ID', width: '150px' },
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
    name: 'Name',
    width: '300px',
  },
  {
    formatter: (row) => {
      return row.inventory === 0 ? 'N/A' : row.inventory;
    },
    name: 'Inventory',
    width: '120px',
  },
  {
    formatter: (row) => `$${row.price} USD`,
    name: 'Price',
    width: '120px',
  },
  { field: 'sku', name: 'SKU', width: '150px' },
  {
    align: 'right',
    formatter: () => (
      <IconButton size="sm">
        <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
      </IconButton>
    ),
    hideName: true,
    name: 'Actions',
    width: '80px',
  },
];

export function VariantsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
