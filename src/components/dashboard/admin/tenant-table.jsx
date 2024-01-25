'use client';

import * as React from 'react';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Typography from '@mui/joy/Typography';
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
        {row.id}
      </Link>
    ),
    name: 'Tenant Name',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <div>
          <Typography level="body-sm" textColor="text.primary">
            {row.companyName}
          </Typography>
          <Typography level="body-xs">{row.companyEmail}</Typography>
        </div>
      </Stack>
    ),
    name: 'Company Name',
    width: '230px',
  },
  { field: 'address', name: 'Address' ,  width: '260px',},
  { field: 'phoneNumber', name: 'Phone Number' ,  width: '260px',},
  { field: 'vatId', name: 'VAT ID', width: '250px' },
  { field: 'totalDevice', name: 'Total Devices', width: '150px' },
  
];

export function DeviceTable({ rows }) {
  return <DataTable columns={columns} rows={rows} selectable stripe="even" />;
}
