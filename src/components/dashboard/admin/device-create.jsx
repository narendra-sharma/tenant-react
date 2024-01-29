'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function DeviceCreateForm() {
  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    navigate(paths['dashboard.']);
  }, [navigate]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Account Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input defaultValue="" name="firstName" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input defaultValue="" name="lastName" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue="" name="email" type="email" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input defaultValue="" name="phoneNumber" />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Billing Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select defaultValue="" name="country">
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
                  <Input defaultValue="" name="state" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input defaultValue="" name="city" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Zip Code</FormLabel>
                  <Input defaultValue="" name="zip" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Shipping Details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Checkbox checked label="Same as billing address" />
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Time Zone</FormLabel>
                  <Select name="timeZone" value="">
                    <Option value="">Choose a time zone</Option>
                    <Option value="us_new_york">US - New York</Option>
                    <Option value="us_california">US - California</Option>
                    <Option value="us_california">UK - London</Option>
                    <Option value="uk_lonon">FR - Paris</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Language</FormLabel>
                  <Select name="language" value="">
                    <Option value="">Choose a language</Option>
                    <Option value="en_us">English</Option>
                    <Option value="es">Spanish</Option>
                    <Option value="de">German</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Currency</FormLabel>
                  <Select name="currency" value="">
                    <Option value="">Choose a currency</Option>
                    <Option value="usd">USD</Option>
                    <Option value="eur">EUR</Option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography level="h4">Tax Status</Typography>
            <Typography level="body-sm">
              <Link>Review our guide</Link> on tax statuses to select the best fit for this customer.
            </Typography>
          </Stack>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  <FormControl>
                    <Select name="taxStatus" value="taxable">
                      <Option value="taxable">Taxable</Option>
                      <Option value="exempt">Exempt</Option>
                      <Option value="reverse_charge">Reverse Charge</Option>
                    </Select>
                  </FormControl>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
                    <FormControl>
                      <FormLabel>Tax ID</FormLabel>
                      <Select name="taxIdType" sx={{ width: '150px' }} value="">
                        <Option value="">Tax Type</Option>
                        <Option value="ad_nrt">Andora NRT</Option>
                        <Option value="ro_vat">Romania VAT</Option>
                      </Select>
                    </FormControl>
                    <Input defaultValue="" name="taxId" placeholder="123456789" sx={{ flexGrow: 1 }} />
                  </Stack>
                  <div>
                    <Link fontSize="sm">Add another ID</Link>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.customers']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </Stack>
      </Stack>
    </form>
  );
}
