'use client';

import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function InvoicesSummary({ draft, draftAmount, due, dueAmount, invoiced, invoicedAmount, paid, paidAmount }) {
  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        gap: 2,
        '& > *': {
          px: {
            sm: 2,
          },
          py: {
            xs: 2,
            sm: 0,
          },
          borderBottom: {
            xs: '1px solid var(--joy-palette-divider)',
            sm: 'none',
          },
          '&:not(:last-of-type)': {
            borderRight: {
              xl: '1px solid var(--joy-palette-divider)',
            },
            pr: 4,
          },
          '&:nth-of-type(odd)': {
            borderRight: {
              sm: '1px solid var(--joy-palette-divider)',
            },
          },
        },
      }}
    >
      {[
        {
          id: 1,
          label: 'Total Invoiced',
          count: invoiced,
          amount: invoicedAmount,
        },
        {
          id: 2,
          label: 'Total Paid',
          count: paid,
          amount: paidAmount,
        },
        {
          id: 3,
          label: 'Total Due',
          count: due,
          amount: dueAmount,
        },
        {
          id: 4,
          label: 'Total Draft',
          count: draft,
          amount: draftAmount,
        },
      ].map((entry) => (
        <Stack key={entry.id} spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Badge
              badgeContent={entry.count}
              color="neutral"
              size="sm"
              sx={{
                '& .MuiBadge-badge': {
                  top: '50%',
                  right: '-18px',
                },
              }}
              variant="soft"
            >
              <Typography level="body-sm" textAlign="center">
                {entry.label}
              </Typography>
            </Badge>
          </Stack>
          <Typography level="h2" textAlign="center">
            {entry.amount}
          </Typography>
        </Stack>
      ))}
    </Card>
  );
}
