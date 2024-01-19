'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { ClockCountdown as ClockCountdownIcon } from '@phosphor-icons/react/dist/ssr/ClockCountdown';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { ShieldCheckered as ShieldCheckeredIcon } from '@phosphor-icons/react/dist/ssr/ShieldCheckered';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { getInitials } from '@/lib/get-initials';

import { MemberMenu } from './member-menu';

const roleMapping = {
  admin: {
    label: 'Admin',
    icon: ShieldCheckeredIcon,
  },
  member: {
    label: 'Member',
    icon: UserIcon,
  },
  readOnly: {
    label: 'Read Only',
    icon: EyeIcon,
  },
};

const statusMapping = {
  online: 'success',
  offline: 'neutral',
  away: 'warning',
  busy: 'danger',
};

const tagMapping = {
  All: 'neutral',
  Marketing: 'primary',
  Design: 'success',
  Development: 'warning',
};

export function MemberCard({ member, onView }) {
  const { avatar, name, role, position, tags, status, pending } = member;
  const { label: roleLabel, icon: RoleIcon } = roleMapping[role] ?? {
    label: 'Unknown',
    icon: UserIcon,
  };

  return (
    <Card>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color={statusMapping[status]}
          size="sm"
          sx={{
            '& .MuiBadge-badge': {
              right: '6px',
              bottom: '6px',
            },
          }}
        >
          <Avatar onClick={onView} src={avatar} sx={{ '--Avatar-size': '48px', cursor: 'pointer' }}>
            {getInitials(name)}
          </Avatar>
        </Badge>
        <MemberMenu onView={onView} pending={pending} />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack spacing={0.5}>
          <Link fontWeight="md" level="body-sm" onClick={onView} textColor="text.primary" underline="none">
            {name}
          </Link>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <RoleIcon color="var(--joy-palette-primary-800)" fontSize="var(--joy-fontSize-md)" />
            <Typography level="body-xs">{roleLabel}</Typography>
          </Stack>
        </Stack>
        {pending ? (
          <Tooltip title="Invitation sent" variant="solid">
            <Avatar color="warning" size="sm" sx={{ '--Icon-fontSize': 'var(--joy-fontSize-xl)' }}>
              <ClockCountdownIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
            </Avatar>
          </Tooltip>
        ) : null}
      </Stack>
      <Divider />
      <Stack spacing={0.5}>
        <Typography level="body-xs" textTransform="uppercase">
          Position
        </Typography>
        <Typography level="body-sm" textColor="text.primary">
          {position}
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography level="body-xs" textTransform="uppercase">
          Tags
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          {tags.map((tag) => {
            const color = tagMapping[tag] ?? 'neutral';

            return (
              <Chip color={color} key={tag} size="sm" variant="soft">
                {tag}
              </Chip>
            );
          })}
        </Stack>
      </Stack>
    </Card>
  );
}
