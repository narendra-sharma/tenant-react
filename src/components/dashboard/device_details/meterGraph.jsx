'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSSR } from '@/components/core/no-ssr';

export function MeterGraph({
  income: incomeAmount,
  incomeDiff,
  incomeTrend,
  expenses: expensesAmount,
  expensesDiff,
  expensesTrend,
  data = [],
  label
}) {
  const chartHeight = 240;

  return (
    <Card sx={{ gap: 2 }}>
      <Typography level="h4">{label}</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: '260px 1fr',
            lg: '320px 1fr',
          },
        }}
      >
        
        <NoSSR fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight} width="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--joy-palette-primary-400)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="var(--joy-palette-primary-100)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--joy-palette-neutral-300)" strokeDasharray="1 4" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="name"
                interval={2}
                tick={{
                  fill: 'var(--joy-palette-text-secondary)',
                  fontSize: 'var(--joy-fontSize-xs)',
                }}
                tickLine={false}
                type="category"
              />
              <YAxis
                axisLine={false}
                domain={[0, 1000]}
                tick={{
                  fill: 'var(--joy-palette-text-secondary)',
                  fontSize: 'var(--joy-fontSize-xs)',
                }}
                tickLine={false}
                type="number"
              />
              <Area
                animationDuration={300}
                dataKey="value"
                dot={<Dot />}
                fill="url(#area)"
                fillOpacity={1}
                name="Income"
                stroke="var(--joy-palette-primary-400)"
                strokeWidth={2}
                type="monotone"
              />
              <Tooltip animationDuration={200} content={<TooltipContent />} cursor={false} />
            </AreaChart>
          </ResponsiveContainer>
        </NoSSR>
      </Box>
    </Card>
  );
}

function Dot({ active, cx, cy, payload }) {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill="var(--joy-palette-primary-solidBg)" r={6} />;
  }

  return null;
}

function TooltipContent({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <Sheet
      sx={{
        boxShadow: 'var(--joy-shadow-lg)',
        borderRadius: 'var(--joy-radius-sm)',
        border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        p: 1,
      }}
    >
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack
            direction="row"
            key={entry.name}
            spacing={3}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.stroke, borderRadius: '4px', height: '8px', width: '8px' }} />
              <Typography fontSize="sm" fontWeight="md">
                {entry.name}
              </Typography>
            </Stack>
            <Typography fontSize="sm" textColor="text.secondary">
              {entry.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Sheet>
  );
}
