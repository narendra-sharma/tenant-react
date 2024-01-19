'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Cell, Label, Pie, PieChart, Tooltip } from 'recharts';

import { NoSSR } from '@/components/core/no-ssr';

export function PowerUsageByRoom({ data = [] }) {
  const chartSize = 200;
  const chartThickness = 30;

  return (
    <Card>
      <Typography level="h4">Consumption By Room</Typography>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexGrow: 1 }}>
        <NoSSR fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
          <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
            <Pie
              animationDuration={300}
              cx={chartSize / 2}
              cy={chartSize / 2}
              data={data}
              dataKey="value"
              innerRadius={chartSize / 2 - chartThickness}
              nameKey="name"
              outerRadius={chartSize / 2}
              strokeWidth={0}
            >
              {data.map((room) => (
                <Cell fill={room.color} key={room.id} />
              ))}
              <Label content={<LabelContent value="657kWh" />} position="center" />
            </Pie>
            <Tooltip animationDuration={200} content={<TooltipContent />} />
          </PieChart>
        </NoSSR>
        <Legend payload={data} />
      </Stack>
    </Card>
  );
}

function LabelContent({ viewBox, value }) {
  const { cx, cy } = viewBox ?? { cx: 0, cy: 0 };

  return (
    <text dominantBaseline="middle" textAnchor="middle" x={cx} y={cy}>
      <tspan
        fill="var(--joy-palette-text-primary)"
        fontSize="var(--joy-fontSize-lg)"
        fontWeight="var(--joy-fontWeight-lg)"
      >
        {value}
      </tspan>
    </text>
  );
}

function Legend({ payload }) {
  return (
    <Stack spacing={1}>
      {payload?.map((entry) => (
        <Stack direction="row" key={entry.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: entry.color,
              borderRadius: 'var(--joy-radius-xs)',
              height: '8px',
              width: '8px',
            }}
          />
          <Typography textColor="text.secondary">{entry.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
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
      {payload?.map((entry) => (
        <Stack direction="row" key={entry.name} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: entry.payload.fill,
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
    </Sheet>
  );
}
