'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';

import { paths } from '@/paths';
import { getInitials } from '@/lib/get-initials';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const statusMapping = {
  draft: {
    label: 'Draft',
    color: 'neutral',
  },
  pending: {
    label: 'Pending',
    color: 'warning',
  },
  paid: {
    label: 'Paid',
    color: 'success',
  },
  late: {
    label: 'Late',
    color: 'danger',
  },
  canceled: {
    label: 'Canceled',
    color: 'danger',
  },
};

const columns = [
  {
    formatter: (row) => (
      <Link
        component={RouterLink}
        fontSize="sm"
        fontWeight="md"
        href={paths['dashboard.invoices.details']('1')}
        underline="none"
      >
        {row.id}
      </Link>
    ),
    name: 'Invoice ID',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Avatar src={row.customerAvatar}>{getInitials(row.customerName)}</Avatar>
        <div>
          <Typography level="body-sm" textColor="text.primary">
            {row.customerName}
          </Typography>
          <Typography level="body-xs">{row.customerEmail}</Typography>
        </div>
      </Stack>
    ),
    name: 'Customer',
    width: '300px',
  },
  { field: 'issueDate', name: 'Placed On', width: '150px' },
  { field: 'dueDate', name: 'Due On', width: '150px' },
  { field: 'amount', name: 'Amount', width: '150px' },
  {
    formatter: (row) => {
      const { color, label } = statusMapping[row.status] ?? {
        label: 'Unknown',
        color: 'neutral',
      };

      return (
        <Chip color={color} size="sm" variant="soft">
          {label}
        </Chip>
      );
    },
    name: 'Status',
    width: '100px',
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

export function InvoicesTable({ rows = [] }) {
  return <DataTable columns={columns} rows={rows} selectable stripe="even" />;
}
