import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { getInitials } from '@/lib/get-initials';

const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};

const user = {
  avatar: '/assets/avatar.png',
  firstName: 'Rene',
  lastName: 'Wells',
  email: 'rene@devias.io',
  bio: "Hi there! I'm Rene, a seasoned developer with a heart that belongs to both the digital realm and the breathtaking mountains. Let's connect and code the future together!",
  website: 'devias.io',
  country: 'us',
  state: 'Colorado',
  city: 'Denver',
  zip: '80218',
  street: 'Street Roy Alley 1155, house 1B',
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
            <Avatar src={user.avatar}>{getInitials(`${user.firstName} ${user.lastName}`)}/</Avatar>
            <Box
              sx={{
                alignItems: 'center',
                borderRadius: '100%',
                color: 'var(--joy-palette-common-white)',
                cursor: 'pointer',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                },
                '&:not(:hover) > *': {
                  display: 'none',
                },
              }}
            >
              <PenIcon style={{ fontSize: 'var(--joy-fontSize-lg)' }} weight="bold" />
            </Box>
          </Box>
          <div>
            <Typography level="h4">Profile Picture</Typography>
            <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
          </div>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Basic details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input defaultValue={user.firstName} name="firstName" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input defaultValue={user.lastName} name="lastName" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input defaultValue={user.email} name="email" type="email" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Textarea defaultValue={user.bio} maxRows={5} minRows={3} name="bio" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input
                      defaultValue={user.website}
                      name="website"
                      startDecorator={
                        <Chip size="sm" variant="soft">
                          www.
                        </Chip>
                      }
                    />
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3}>
            <Typography level="h4">Location</Typography>
            <Box sx={{ maxWidth: 'lg' }}>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Select defaultValue={user.country} name="country">
                      <Option value="">Choose a country</Option>
                      <Option value="ca">Canada</Option>
                      <Option value="uk">United Kingdom</Option>
                      <Option value="us">United States</Option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>State</FormLabel>
                    <Input defaultValue={user.state} name="state" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input defaultValue={user.city} name="city" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Zip Code</FormLabel>
                    <Input defaultValue={user.zip} name="zip" />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea defaultValue={user.street} maxRows={3} minRows={2} name="street" />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" variant="outlined">
            Discard
          </Button>
          <Button>Save Changes</Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
