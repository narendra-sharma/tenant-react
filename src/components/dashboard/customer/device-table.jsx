'use client';

import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import dayjs from 'dayjs';
import { paths } from '@/paths';
import Typography from '@mui/joy/Typography';
import { getInitials } from '@/lib/get-initials';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const statusMapping = {
  offline: {
    label: 'offline',
    color: 'danger',
  },
  online: {
    label: 'online',
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
        href={paths['dashboard.orders.details']}
        underline="none"
      >
        {row.id}
      </Link>
    ),
    name: 'Device Name',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography level="body-sm" textColor="text.primary">
            {row.customerName}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Client Name',
    width: '150px',
  },
  {
    formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'),
    name: 'Date Last Reading Water',
    width: '200px',
  },
  { field: 'reading', name: 'Last Reading Water (Liters)' ,  width: '260px',},
  {
    formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'),
    name: 'Date Last Reading Electricity',
    width: '250px',
  },
 
  { field: 'items', name: 'Last Reading Electricity (kWh)', width: '250px' },
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
    width: '140px',
  },
];

export function DeviceTable({ rows }) {
  return <DataTable columns={columns} rows={rows}  stripe="even" />;
}
