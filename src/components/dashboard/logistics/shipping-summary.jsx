'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSSR } from '@/components/core/no-ssr';

export function ShippingSummary({ data = [] }) {
  const chartHeight = 290;

  return (
    <Card>
      <Typography level="h4">Shipping</Typography>
      <NoSSR fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight}>
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="var(--joy-palette-neutral-300)" strokeDasharray="1 4" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="name"
              interval={1}
              tick={{
                fill: 'var(--joy-palette-text-secondary)',
                fontSize: 'var(--joy-fontSize-xs)',
              }}
              tickLine={false}
              type="category"
            />
            <YAxis
              axisLine={false}
              domain={[0, 800]}
              tick={{
                fill: 'var(--joy-palette-text-secondary)',
                fontSize: 'var(--joy-fontSize-xs)',
              }}
              tickLine={false}
              type="number"
            />
            <Bar
              animationDuration={300}
              barSize={16}
              dataKey="value"
              fill="var(--joy-palette-primary-solidBg)"
              name="Shipping"
              radius={[6, 6, 6, 6]}
            />
            <Tooltip animationDuration={200} content={<TooltipContent />} cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      </NoSSR>
    </Card>
  );
}

function TooltipContent({ active, payload, label }) {
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
        <Typography level="title-md">{label}</Typography>
        <div>
          {payload?.map((entry) => (
            <Stack direction="row" key={entry.name} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: entry.fill,
                  borderRadius: '4px',
                  height: '8px',
                  mr: 1,
                  width: '8px',
                }}
              />
              <Typography level="body-sm" sx={{ mr: 2 }} textColor="text.primary">
                {entry.name}:
              </Typography>
              <Typography level="body-xs">{entry.value}</Typography>
            </Stack>
          ))}
        </div>
      </Stack>
    </Sheet>
  );
}
