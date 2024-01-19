'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CurrencyBtc as CurrencyBtcIcon } from '@phosphor-icons/react/dist/ssr/CurrencyBtc';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { CurrencyEth as CurrencyEthIcon } from '@phosphor-icons/react/dist/ssr/CurrencyEth';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { DataTable } from '@/components/core/data-table';
import { NoSSR } from '@/components/core/no-ssr';

const coinMapping = {
  BTC: {
    color: 'warning',
    icon: CurrencyBtcIcon,
  },
  ETH: {
    color: 'primary',
    icon: CurrencyEthIcon,
  },
  USDT: {
    color: 'success',
    icon: CurrencyDollarIcon,
  },
  SOL: {
    color: 'neutral',
    icon: CurrencyBtcIcon,
  },
};

const columns = [
  {
    formatter: (row) => {
      const { color, icon: Icon } = coinMapping[row.id] ?? {
        color: 'neutral',
        icon: CurrencyBtcIcon,
      };

      return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar
            color={color}
            sx={{
              '--Avatar-size': '24px',
              '--Avatar-radius': 'var(--joy-radius-sm)',
              '--Icon-fontSize': 'var(--joy-fontSize-lg)',
            }}
          >
            <Icon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </Avatar>
          <Typography>{row.name}</Typography>
        </Stack>
      );
    },
    name: 'Name',
    width: '120px',
  },
  { field: 'price', name: 'Price', width: '130px' },
  {
    formatter: (row) => {
      const trendColor = row.trend1d === 'up' ? 'success' : 'danger';
      const trendSymbol = row.trend1d === 'up' ? '+' : '-';

      return (
        <Typography color={trendColor} whiteSpace="nowrap">
          {trendSymbol} {row.diff1d}%
        </Typography>
      );
    },
    name: '24h',
    width: '75px',
  },
  {
    formatter: (row) => {
      const trendColor = row.trend7d === 'up' ? 'success' : 'danger';
      const trendSymbol = row.trend7d === 'up' ? '+' : '-';

      return (
        <Typography color={trendColor} whiteSpace="nowrap">
          {trendSymbol} {row.diff7d}%
        </Typography>
      );
    },
    name: '7d',
    width: '75px',
  },
  { field: 'marketCap', name: 'Market Cap', width: '100px' },
  { field: 'volume1d', name: 'Volume 24h', width: '100px' },
  {
    formatter: (row) => <Summary data={row.summary} />,
    name: 'Last 7 days',
    width: '100px',
  },
];

export function MarketValues({ data }) {
  return (
    <Card>
      <Typography level="h4">Market Values</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          rows={data}
          stripe="even"
          sx={{ '--TableCell-paddingX': '12px', '--TableCell-paddingY': '8px' }}
        />
      </Box>
    </Card>
  );
}

function Summary({ data: dataRaw = [] }) {
  const chartHeight = 60;
  const data = dataRaw.map((entry, index) => ({
    name: `Entry-${index}`,
    value: entry,
  }));

  const dataRawSorted = [...dataRaw].sort((a, b) => a - b);
  const minValue = dataRawSorted[0];
  const maxValue = dataRawSorted[dataRawSorted.length - 1];

  return (
    <NoSSR fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
      <ResponsiveContainer height={chartHeight}>
        <LineChart data={data} margin={{ top: 10, right: 0, bottom: -20, left: -60 }}>
          <XAxis axisLine={false} dataKey="name" tick={false} />
          <YAxis axisLine={false} dataKey="value" domain={[minValue, maxValue]} tick={false} />
          <Line
            animationDuration={200}
            dataKey="value"
            dot={false}
            stroke="var(--joy-palette-success-400)"
            strokeWidth="2"
            type="basis"
          />
        </LineChart>
      </ResponsiveContainer>
    </NoSSR>
  );
}
