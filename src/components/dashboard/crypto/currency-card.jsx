import * as React from 'react';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CurrencyBtc as CurrencyBtcIcon } from '@phosphor-icons/react/dist/ssr/CurrencyBtc';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { CurrencyEth as CurrencyEthIcon } from '@phosphor-icons/react/dist/ssr/CurrencyEth';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

const colorsMapping = {
  BTC: 'warning',
  ETH: 'primary',
  USDT: 'success',
  SOL: 'neutral',
};

const iconsMapping = {
  BTC: CurrencyBtcIcon,
  ETH: CurrencyEthIcon,
  USDT: CurrencyDollarIcon,
  SOL: CurrencyBtcIcon,
};

export function WalletCard({ wallet }) {
  const { coin, diff, amount, value, trend } = wallet;
  const color = colorsMapping[coin] ?? 'neutral';
  const Icon = iconsMapping[coin] ?? CurrencyBtcIcon;
  const trendColor = trend === 'up' ? 'success' : 'danger';
  const TrendIcon = trend === 'up' ? TrendUpIcon : TrendDownIcon;

  return (
    <Card color={color} sx={{ boxShadow: 'none' }} variant="soft">
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <Icon style={{ fontSize: 'var(--joy-fontSize-lg)' }} weight="bold" />
        <Typography fontSize="sm" fontWeight="xl" sx={{ flexGrow: 1 }}>
          {coin}
        </Typography>
        <Chip
          color={trendColor}
          size="sm"
          startDecorator={<TrendIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
          variant="plain"
        >
          {diff}%
        </Chip>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography level="h2" sx={{ flexGrow: 1 }}>
          {amount}
        </Typography>
        <Typography level="body-sm">{value}</Typography>
      </Stack>
    </Card>
  );
}
