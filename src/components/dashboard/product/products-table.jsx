'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const statusMapping = {
  draft: {
    label: 'Draft',
    color: 'neutral',
  },
  published: {
    label: 'Published',
    color: 'success',
  },
};

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.products.details']('1')}
        underline="none"
      >
        {row.id}
      </Link>
    ),
    name: 'Product ID',
    width: '150px',
  },
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
    width: '400px',
  },
  {
    formatter: (row) => (
      <Chip size="sm" variant="soft">
        {row.category}
      </Chip>
    ),
    name: 'Category',
    width: '200px',
  },
  { field: 'stock', name: 'Stock', width: '200px' },
  { field: 'price', name: 'Price', width: '200px' },
  {
    formatter: (row) => {
      const { label, color } = statusMapping[row.status] ?? {
        label: 'Unknown',
        color: 'neutral',
      };

      return (
        <Chip color={color} size="sm" variant="soft">
          {label}
        </Chip>
      );
    },
    name: 'Status',
    width: '200px',
  },
];

export function ProductsTable({ rows = [] }) {
  return <DataTable columns={columns} rows={rows} selectable stripe="even" />;
}
