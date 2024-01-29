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
  { field: 'address', name: 'Address' ,  width: '250px',},
  { field: 'phoneNumber', name: 'Phone Number' ,  width: '200px',},
  { field: 'vatId', name: 'VAT ID', width: '200px' },
  { field: 'totalDevice', name: 'Total Devices', width: '120px' },
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

export function DeviceTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
