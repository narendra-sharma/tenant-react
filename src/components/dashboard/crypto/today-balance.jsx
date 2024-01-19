import * as React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function TodayBalance({ amount, diff, trend }) {
  const trendColor = trend === 'up' ? 'success' : 'danger';
  const trendSymbol = trend === 'up' ? '+' : '-';

  return (
    <Card>
      <Typography level="h4">Today&apos;s Balance</Typography>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography level="h2" sx={{ flexGrow: 1 }}>
          {amount}
        </Typography>
        <Chip color={trendColor} size="sm" variant="soft">
          {trendSymbol} {diff}%
        </Chip>
      </Stack>
    </Card>
  );
}
