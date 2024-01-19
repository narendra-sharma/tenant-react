'use client';

import * as React from 'react';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import { DataTable } from '@/components/core/data-table';

const statusMapping = {
  active: {
    label: 'Active',
    color: 'primary',
  },
  pending: {
    label: 'On Hold',
    color: 'warning',
  },
  completed: {
    label: 'Completed',
    color: 'success',
  },
};

const columns = [
  {
    formatter: (row) => <Typography noWrap>{row.title}</Typography>,
    name: 'Task',
    width: '200px',
  },
  { align: 'center', field: 'duration', name: 'Duration', width: '100px' },
  { align: 'center', field: 'assignee', name: 'Assigned To', width: '150px' },
  {
    align: 'right',
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
    width: '100px',
  },
];

export function Tasks({ tasks = [] }) {
  return (
    <Card>
      <Typography level="h4">Current Tasks</Typography>
      <CardOverflow sx={{ mx: 'var(--CardOverflow-offset)', overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          rows={tasks}
          stripe="even"
          sx={{
            minWidth: '550px',
            '& th, & td': {
              px: 2,
            },
          }}
        />
      </CardOverflow>
    </Card>
  );
}
