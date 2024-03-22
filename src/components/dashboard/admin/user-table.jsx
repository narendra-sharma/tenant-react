'use client';

import * as React from 'react';
import { Chip } from '@mui/joy';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { t } from 'i18next';
// import { useTranslation } from 'react-i18next';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import { useDispatch } from 'react-redux';
import { delete_user } from '@/reduxData/user/userAction';
import { toast } from '@/components/core/toaster';

export function UserTable({ rows }) {
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const userRole = JSON.parse(localStorage.getItem('authUser'))?.role;
  const dispatch = useDispatch()

  const deleteUser=(data)=>{
    if(data.role=='admin'){
      toast.error("Sorry you can not delete Admin");
    }else{
      delete_user(data?._id,dispatch)
    }
  }

  const columns = [
    {
      formatter: (row) => (
        <Link
          component={RouterLink}
          fontSize="sm"
          fontWeight="md"
          href={paths['dashboard.admin.update.user'](`${row._id}`)}
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
          {(row.role!='admin' || userRole=='admin' || permissions['ADMIN Management']?.can_delete_users) && <Trash style={{ fontSize: '17px', color:'red', marginLeft:'10px', cursor:'pointer' }} onClick={()=>deleteUser(row)} disabled={true} />}
        </Box>
      ),
      hideName: true,
      name: t('Actions'),
      width: '100px',
    },
  ];

  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
