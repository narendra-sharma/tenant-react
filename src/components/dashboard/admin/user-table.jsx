'use client';

import * as React from 'react';
import { Chip } from '@mui/joy';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

export function UserTable({ rows }) {
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
          {row.first_name}
        </Link>
      ),
      name: t('UserName'),
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div>
            <Typography>{row.email}</Typography>
          </div>
        </Stack>
      ),
      name: t('UserEmail'),
      width: '200px',
    },
    { field: 'phone_number', name: 'Phone Number', width: '170px' },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div>
            {row.tenant_ids.map((res) => (
              <Typography>{res?.tenant_name}</Typography>
            ))}
          </div>
        </Stack>
      ),
      name: t('Tenant'),
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div>
            <Typography>{row.company_name}</Typography>
            <Typography level="body-xs">{row.company_name}</Typography>
            <Typography level="body-xs">{row.company_name}</Typography>
          </div>
        </Stack>
      ),
      name: t('Company'),
      width: '170px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div style={{ textTransform: 'capitalize' }}>
            <Typography>{row.role ? row?.role.replace(/_/g, ' ') : ''}</Typography>
          </div>
        </Stack>
      ),
      name: t('PermissionProfile'),
      width: '170px',
    },
    {
      formatter: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            component={RouterLink}
            fontSize="sm"
            fontWeight="md"
            href={paths['dashboard.admin.update.user'](`${row._id}`)}
            underline="none"
          >
            <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </Link>
        </Box>
      ),
      hideName: true,
      name: t('Actions'),
      width: '100px',
    },
  ];

  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
