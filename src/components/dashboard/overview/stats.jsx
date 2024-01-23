import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

export function Stats({ color, diff, icon: Icon, label, trend, value }) {
  const TrendIcon = trend === 'up' ? TrendUpIcon : TrendDownIcon;

  return (
    <Card>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          color={color}
          sx={{
            '--Avatar-radius': 'var(--joy-radius-sm)',
            '--Avatar-size': '32px',
            '--Icon-fontSize': 'var(--joy-fontSize-lg)',
          }}
        >
          <Icon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </Avatar>
        <Typography level="body-sm">{label}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start' }}>
        <Typography level="h2" marginLeft={'6vh'}>
          {value}
        </Typography>
      </Stack>
    </Card>
  );
}
