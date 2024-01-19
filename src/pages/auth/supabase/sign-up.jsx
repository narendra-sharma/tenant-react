import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';

import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { SplitLayout } from '@/components/auth/split-layout';
import { SignUpForm } from '@/components/auth/supabase/sign-up-form';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

export const metadata = {
  title: 'Sign Up',
};

export function Page() {
  return (
    <SplitLayout strategy={AuthStrategy.SUPABASE}>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Box component={RouterLink} href={paths['home']} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={154} />
          </Box>
        </Stack>
        <Tabs value="sign-up" variant="custom">
          <TabList>
            <Tab component={RouterLink} href={paths['auth.supabase.sign-in']} value="sign-in">
              Sign In
            </Tab>
            <Tab component={RouterLink} href={paths['auth.supabase.sign-up']} value="sign-up">
              Create Account
            </Tab>
          </TabList>
        </Tabs>
        <SignUpForm />
      </Stack>
    </SplitLayout>
  );
}
