'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cube as CubeIcon } from '@phosphor-icons/react/dist/ssr/Cube';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import dayjs from 'dayjs';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => {
      return (
        <Stack direction="row" spacing={1}>
          <Avatar
            color="primary"
            sx={{
              '--Avatar-radius': 'var(--joy-radius-sm)',
              '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            }}
            variant="solid"
          >
            <CubeIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="duotone" />
          </Avatar>
          <div>
            <Typography whiteSpace="nowrap">{row.productName}</Typography>
            <Typography level="body-sm">
              {row.amount}/{row.billingCycle}
            </Typography>
          </div>
        </Stack>
      );
    },
    name: 'Name',
    width: '200px',
  },
  { field: 'stripeId', name: 'Stripe ID', width: '150px' },
  {
    formatter: (row) => dayjs(row.createdAt).format('MMMM D, YYYY'),
    name: 'Created',
    width: '150px',
  },
  {
    formatter: (row) => dayjs(row.updatedAt).format('MMMM D, YYYY'),
    name: 'Updated',
    width: '150px',
  },
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

export function SubscriptionsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" sx={{ minWidth: '950px' }} />;
}
