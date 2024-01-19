'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

import { paths } from '@/paths';
import { getInitials } from '@/lib/get-initials';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const statusMapping = {
  pending: {
    label: 'Pending',
    color: 'warning',
  },
  completed: {
    label: 'Completed',
    color: 'success',
  },
  canceled: {
    label: 'Canceled',
    color: 'danger',
  },
};

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.orders.details']('1')}
        underline="none"
      >
        {row.id}
      </Link>
    ),
    name: 'Order ID',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Avatar src={row.customerAvatar}>{getInitials(row.customerName)}</Avatar>
        <div>
          <Typography level="body-sm" textColor="text.primary">
            {row.customerName}
          </Typography>
          <Typography level="body-xs">{row.customerEmail}</Typography>
        </div>
      </Stack>
    ),
    name: 'Customer',
    width: '300px',
  },
  {
    formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'),
    name: 'Placed On',
    width: '200px',
  },
  { field: 'items', name: 'Items', width: '150px' },
  { field: 'amount', name: 'Amount', width: '150px' },
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
    width: '80px',
  },
  {
    formatter: () => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="neutral" size="sm" variant="plain">
          Archive
        </Button>
        <Button size="sm" variant="plain">
          Download
        </Button>
      </Stack>
    ),
    hideName: true,
    name: 'Actions',
    width: '200px',
  },
];

export function OrdersTable({ rows = [] }) {
  return <DataTable columns={columns} rows={rows} selectable stripe="even" />;
}
