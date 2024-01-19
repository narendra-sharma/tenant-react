'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';

import { DataTable } from '@/components/core/data-table';

const statusMapping = {
  pending: {
    label: 'Pending',
    color: 'warning',
  },
  paid: {
    label: 'Paid',
    color: 'success',
  },
  canceled: {
    label: 'Canceled',
    color: 'danger',
  },
};

const columns = [
  {
    formatter: (row) => (
      <Link fontSize="sm" fontWeight="md" underline="none">
        {row.id}
      </Link>
    ),
    name: 'Invoice ID',
    width: '120px',
  },
  { field: 'description', name: 'Description', width: '150px' },
  { field: 'issueDate', name: 'Billing Date', width: '200px' },
  { field: 'amount', name: 'Amount', width: '120px' },
  {
    formatter: (row) => {
      const { label, color } = statusMapping[row.status] ?? {
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
    width: '120px',
  },
  {
    formatter: () => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="neutral" size="sm" variant="plain">
          <PrinterIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Box>
    ),
    hideName: true,
    name: 'Actions',
    width: '100px',
  },
];

export function InvoicesTable({ rows }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      stripe="even"
      sx={{ '--TableCell-paddingX': '20px', '--TableCell-paddingY': '20px' }}
    />
  );
}
