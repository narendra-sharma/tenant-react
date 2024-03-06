'use client';

import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/system';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import { delete_devices } from '@/reduxData/devices/deviceAction';
import { useDispatch } from 'react-redux';

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

const permissions = JSON.parse(localStorage.getItem('permissions'));
const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;
export function DeviceTable({ rows }) {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const deleteDevice=(data)=>{
    delete_devices(data?._id,dispatch)
  }

  const columns = [
    {
      formatter: (row) => (
        <Link
          disabled={userRole=='admin'?false: !permissions['Tenant Management']?.can_view_device_detail}
          component={RouterLink}
          fontSize="sm"
          fontWeight="md"
          href={paths['dashboard.admin.device_details'](`${row.serial_number}`)}
          underline="none"
        >
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
      formatter: (row) => (row?.meter_type == 'water' ?row?.last_reading_date? dayjs(row?.last_reading_date).format('YYYY-MM-DD') : 'Meter not installed':''),
      name: t('DateLastReadingWater'),
      width: '200px',
    },
    {
      formatter: (row) => (row?.meter_type == 'water' ? row.last_reading : ''),
      name: t('LastReadingWaterLT'),
      width: '220px',
    },
    {
      formatter: (row) => (row?.meter_type == 'electricity' ?row?.last_reading_date? dayjs(row?.last_reading_date).format('YYYY-MM-DD') : 'Meter not installed':''),
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
            {(userRole=='admin' || permissions['ADMIN Management']?.can_delete_devices) && <Trash style={{ fontSize: '17px', color:'red', marginLeft:'10px', cursor:'pointer' }} onClick={()=>deleteDevice(row)} disabled={true} />}
        </Box>
      ),
      hideName: true,
      name: 'Actions',
      width: '100px',
    },
  ];
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
