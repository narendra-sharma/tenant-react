'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (_, index) => {
      return (
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'var(--joy-palette-background-level1)',
            borderRadius: 'var(--joy-radius-sm)',
            display: 'flex',
            height: '32px',
            justifyContent: 'center',
            width: '32px',
          }}
        >
          {index + 1}
        </Box>
      );
    },
    name: '#',
    width: '60px',
  },
  { field: 'title', name: 'Title', width: '40%' },
  {
    formatter: (row) => new Intl.NumberFormat('en-US').format(row.clicks),
    name: 'Clicks',
    width: '20%',
  },
  {
    formatter: (row) => new Intl.NumberFormat('en-US').format(row.impressions),
    name: 'Impressions',
    width: '20%',
  },
  {
    formatter: (row) => `${row.ctr}%`,
    name: 'CTR',
    width: '20%',
  },
];

export function MostVisitedPages({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Most Visited Pages</Typography>
      <CardOverflow sx={{ mb: 'var(--CardOverflow-offset)', mx: 'var(--CardOverflow-offset)' }}>
        <DataTable
          columns={columns}
          rows={data}
          stripe="even"
          sx={{ '--TableCell-paddingX': '8px', '--TableCell-paddingY': '12px' }}
          uniqueRowId={(row) => row.title}
        />
      </CardOverflow>
    </Card>
  );
}
