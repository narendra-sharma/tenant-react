'use client';

import * as React from 'react';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Typography from '@mui/joy/Typography';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import Box from '@mui/joy/Box';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.admin.create.tenant']}
        underline="none"
      >
        {row.tenant_user_name}
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
            {row.tenant_user_name}
          </Typography>
          <Typography level="body-xs">{row.companyEmail}</Typography>
        </div>
      </Stack>
    ),
    name: 'Company Name',
    width: '230px',
  },
  { field: 'address', name: 'Address' ,  width: '250px',},
  { field: 'company_phone_number', name: 'Phone Number' ,  width: '200px',},
  { field: 'vat_number', name: 'VAT ID', width: '200px' },
  { field: 'totalDevice', name: 'Total Devices', width: '120px' },
  {
    formatter: (row) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.admin.update.tenant'](`${row._id}`)}
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
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
