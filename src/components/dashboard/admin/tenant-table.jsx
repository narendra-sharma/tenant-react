'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { useTranslation } from 'react-i18next';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

export function DeviceTable({ rows }) {
  const { t } = useTranslation();
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
          {row.tenant_name}
        </Link>
      ),
      name: t('TenantName'),
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div>
            <Typography level="body-sm" textColor="text.primary">
              {row.tenant_company_name}
            </Typography>
            <Typography level="body-xs">{row.companyEmail}</Typography>
          </div>
        </Stack>
      ),
      name: 'Company Name',
      width: '230px',
    },
    { field: 'company_address', name: 'Address', width: '250px' },
    { field: 'company_phone_number', name: 'Phone Number', width: '200px' },
    { field: 'company_tax_id', name: 'VAT ID', width: '200px' },
    { field: 'devices_assigned', name: 'Total Devices', width: '120px' },
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

  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
