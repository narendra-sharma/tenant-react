import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Drop as DropIcon } from '@phosphor-icons/react/dist/ssr/Drop';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';
import { Plugs as PlugsIcon } from '@phosphor-icons/react/dist/ssr/Plugs';
import { Power as PowerIcon } from '@phosphor-icons/react/dist/ssr/Power';
import { useTranslation } from 'react-i18next';

export function DeviceSummary({ total, active, completed, canceled }) {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 2,
        '& > *': {
          px: {
            sm: 2,
          },
          py: {
            xs: 2,
            sm: 0,
          },
          '&:not(:last-of-type)': {
            borderBottom: {
              xs: '1px solid var(--joy-palette-divider)',
              sm: 'none',
            },
            borderRight: {
              lg: '1px solid var(--joy-palette-divider)',
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
          label: t('TotalDevices'),
          value: total,
          icon: PowerIcon,
        },
        {
          id: 2,
          label: t('WaterMeters'),
          value: active,
          icon: DropIcon,
        },
        {
          id: 3,
          label: t('ElectricityMeters'),
          value: completed,
          icon: LightningIcon,
        },
        {
          id: 4,
          label: t('OfflineDevices'),
          value: canceled,
          icon: PlugsIcon,
        },
      ].map((entry) => {
        const Icon = entry.icon;

        return (
          <Stack direction="row" key={entry.id} spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar sx={{ '--Icon-fontSize': 'var(--joy-fontSize-xl)' }} variant="soft">
              <Icon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
            </Avatar>
            <div>
              <Typography level="body-sm" style={{whiteSpace:'nowrap'}}>{entry.label}</Typography>
              <Typography level="h2">{entry.value}</Typography>
            </div>
          </Stack>
        );
      })}
    </Card>
  );
}
