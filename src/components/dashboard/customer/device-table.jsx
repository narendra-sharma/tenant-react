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
import { IconButton } from '@mui/joy';
import { Box } from '@mui/system';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

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
        {row.device_name}
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
            {row.client_firstname}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Client Name',
    width: '120px',
  },
  {
    formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'),
    name: 'Date Last Reading Water',
    width: '200px',
  },
  { formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'), name: 'Last Reading Water (Liters)' ,  width: '220px',},
  {
    formatter: (row) => dayjs(row.createdAt).format('YYYY-MM-DD'),
    name: 'Date Last Reading Electricity',
    width: '230px',
  },
 
  { field: 'last_reading_electricity_kwh', name: 'Last Reading Electricity (kWh)', width: '250px' },
  {
    formatter: (row) => {
      const { label, color } = statusMapping[row.status] ?? {
        label: 'Online',
        color: 'green',
      };

      return (
        <Chip color={color} size="sm" variant="soft">
          {label}
        </Chip>
      );
    },
    name: 'Status',
    width: '120px',
  },
  {
    formatter: (row) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
         <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.admin.update.devices'](`${row._id}`)}
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

export function DeviceTable({ rows }) {
  return <DataTable columns={columns} rows={rows}  stripe="even" />;
}
