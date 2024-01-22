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
  const segment = pathname.split('/account')[1] || '/profile';
  return segment.split('/')[1];
}

export function AccountTabs() {
  const segment = useSegment();

  return (
    <Box sx={{ display: 'flex' }}>
      <Tabs value={segment} variant="custom" >
        <TabList className="auth-tab-list" style={{background: "#EAEEF6"}}>
          <Tab component={RouterLink} href={paths['dashboard.account']} value="profile">
            Profile
          </Tab>
          <Tab component={RouterLink} href={paths['dashboard.account.security']} value="security">
            Security
          </Tab>
          {/* <Tab component={RouterLink} href={paths['dashboard.account.billing']} value="billing">
            Billing
          </Tab> */}
        </TabList>
      </Tabs>
    </Box>
  );
}
