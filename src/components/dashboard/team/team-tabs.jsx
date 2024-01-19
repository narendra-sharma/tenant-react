'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';

import { paths } from '@/paths';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';

function useSegment() {
  const pathname = usePathname();
  return pathname.split('/').pop() ?? 'members';
}

export function TeamTabs() {
  const segment = useSegment();

  return (
    <Box sx={{ display: 'flex' }}>
      <Tabs value={segment} variant="custom">
        <TabList>
          <Tab component={RouterLink} href={paths['dashboard.team.members']} value="members">
            Members
          </Tab>
          <Tab component={RouterLink} href={paths['dashboard.team.permissions']} value="permissions">
            Permissions
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
