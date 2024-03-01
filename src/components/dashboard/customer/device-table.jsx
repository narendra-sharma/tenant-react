'use client';

import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/system';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { paths } from '@/paths';
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

const userPermissions = JSON.parse(localStorage.getItem('permissions'));
const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;
export function DeviceTable({ rows }) {
  const { t } = useTranslation();
  const columns = [
    {
      formatter: (row) => (
        <Link
          disabled={currentUserRole=='admin'?false: !permissions['Tenant Management']?.can_view_device_detail}
          component={RouterLink}
          fontSize="sm"
          fontWeight="md"
          href={paths['dashboard.admin.device_details'](`${row.serial_number}`)}
          underline="none"
          disabled={currentUserRole=='admin'?false: !permissions['Tenant Management']?.can_change_device_detail}
        >
          <PenIcon  style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          {row.device_name}
        </Link>
      ),
      name: t('DeviceName'),
      width: '150px',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <div>
            <Typography level="body-sm" textColor="text.primary">
              {row?.tenant_ids[0]?.tenant_name}
            </Typography>
          </div>
        </Stack>
      ),
      name: t('Tenant'),
      width: '120px',
    },
    {
      formatter: (row) => (row?.meter_type == 'water' ? dayjs(row?.last_reading_date).format('YYYY-MM-DD') : ''),
      name: t('DateLastReadingWater'),
      width: '200px',
    },
    {
      formatter: (row) => (row?.meter_type == 'water' ? row.last_reading : ''),
      name: t('LastReadingWaterLT'),
      width: '220px',
    },
    {
      formatter: (row) => (row?.meter_type == 'electricity' ? dayjs(row?.last_reading_date).format('YYYY-MM-DD') : ''),
      name: t('DateLastReadingElectricity'),
      width: '230px',
    },

    {
      formatter: (row) => (row?.meter_type == 'electricity' ? row.last_reading : ''),
      name: t('LastReadingElectricitykWH'),
      width: '250px',
    },
    {
      formatter: (row) => {
        const { label, color } = statusMapping[row?.device_status] ?? {
          label: t('Online'),
          color: 'green',
        };

        return (
          <Chip color={color} size="sm" variant="soft">
            {label}
          </Chip>
        );
      },
      name: t('Status'),
      width: '120px',
    },
    {
      formatter: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            component={RouterLink}
            fontSize="sm"
            fontWeight="md"
            href={paths['dashboard.admin.update.devices'](`${row.serial_number}`)}
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
