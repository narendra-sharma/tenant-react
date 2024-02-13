import * as React from 'react';
import Stack from '@mui/joy/Stack';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';
import { DeviceRename } from '@/components/auth/custom/device-rename';

const metadata = {
  title: `Device Renaming  | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SplitLayout>
        <Stack spacing={3}>
          <DeviceRename />
        </Stack>
      </SplitLayout>
    </React.Fragment>
  );
}
