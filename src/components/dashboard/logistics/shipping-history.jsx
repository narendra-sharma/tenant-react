'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { getInitials } from '@/lib/get-initials';
import { DataTable } from '@/components/core/data-table';

const statusMapping = {
  draft: {
    label: 'Draft',
    color: 'neutral',
  },
  ongoing: {
    label: 'Ongoing',
    color: 'primary',
  },
  shipped: {
    label: 'Shipped',
    color: 'warning',
  },
  delivered: {
    label: 'Delivered',
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
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Avatar src={row.driverAvatar}>{getInitials(row.driverName)}</Avatar>
        <Typography>{row.driverName}</Typography>
      </Stack>
    ),
    name: 'Driver',
    width: '200px',
  },
  { align: 'center', field: 'date', name: 'Date', width: '150px' },
  { align: 'center', field: 'orderId', name: 'Order', width: '120px' },
  { align: 'center', field: 'pickLocation', name: 'Pick Location', width: '150px' },
  { align: 'center', field: 'dropLocation', name: 'Drop Location', width: '150px' },
  { align: 'center', field: 'weight', name: 'Weight', width: '100px' },
  { align: 'center', field: 'amount', name: 'Amount', width: '100px' },
  {
    align: 'right',
    formatter: (row) => {
      const { label, color } = statusMapping[row.status];

      return (
        <Chip color={color} size="sm" variant="soft">
          {label}
        </Chip>
      );
    },
    name: 'Status',
    width: '150px',
  },
];

export function ShippingHistory({ shipments = [] }) {
  return (
    <Card sx={{ gap: 3 }}>
      <Typography level="h4">Shipping History</Typography>
      <CardOverflow sx={{ m: 'var(--CardOverflow-offset)', overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          rows={shipments}
          stripe="even"
          sx={{
            '--TableCell-paddingX': '16px',
            '--TableCell-paddingY': '12px',
            minWidth: '1120px',
          }}
        />
      </CardOverflow>
    </Card>
  );
}
