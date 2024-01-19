import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { SessionItem } from '@/components/dashboard/account/session-item';

const metadata = {
  title: `Security | Account | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Change Password</Typography>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl>
              <FormLabel>Current password</FormLabel>
              <Input defaultValue="" name="password" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>New password</FormLabel>
              <Input defaultValue="" name="newPassword" type="password" />
              <FormHelperText>Your new password must be more than 8 characters.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Confirm new password</FormLabel>
              <Input defaultValue="" name="passwordConfirm" type="password" />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button color="neutral" variant="outlined">
              Discard
            </Button>
            <Button>Save Changes</Button>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <div>
            <Typography level="h4">Login History</Typography>
            <Typography level="body-sm">Your recent login activity</Typography>
          </div>
          <List sx={{ '--List-gap': '24px' }}>
            {[
              {
                id: 'SES-002',
                device: 'desktop',
                agent: 'Chrome, Mac OS 116.0.5845.50',
                location: 'California, USA',
                date: dayjs().format('D MMM [at] hh:mm A'),
                active: true,
              },
              {
                id: 'SES-001',
                device: 'mobile',
                agent: 'Chrome, Android 116.0.5845.51',
                location: 'Denver, USA',
                date: dayjs()
                  .subtract(2, 'day')
                  .subtract(5, 'hours')
                  .subtract(45, 'minute')
                  .format('D MMM [at] hh:mm A'),
              },
            ].map((session) => (
              <SessionItem key={session.id} session={session} />
            ))}
          </List>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
