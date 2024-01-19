import * as React from 'react';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { IncomeSummary } from '@/components/dashboard/logistics/income-summary';
import { OrdersStatus } from '@/components/dashboard/logistics/orders-status';
import { ShippingHistory } from '@/components/dashboard/logistics/shipping-history';
import { ShippingSummary } from '@/components/dashboard/logistics/shipping-summary';
import { Statistics } from '@/components/dashboard/logistics/statistics';
import { TopCountries } from '@/components/dashboard/logistics/top-countries';
import { TopDrivers } from '@/components/dashboard/logistics/top-drivers';
import { VehicleTypes } from '@/components/dashboard/logistics/vehicle-types';
import { VehiclesStatus } from '@/components/dashboard/logistics/vehicles-status';

const metadata = {
  title: `Logistics | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={3}>
            <div>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                Logistics
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid lg={3} md={4} xs={12}>
                <Statistics delivered={43} ongoing={104} shipped={92} />
              </Grid>
              <Grid lg={9} md={8} xs={12}>
                <ShippingSummary
                  data={[
                    { name: 'Jan', value: 409 },
                    { name: 'Feb', value: 460 },
                    { name: 'Mar', value: 417 },
                    { name: 'Apr', value: 489 },
                    { name: 'May', value: 476 },
                    { name: 'Jun', value: 501 },
                    { name: 'Jul', value: 510 },
                    { name: 'Aug', value: 484 },
                    { name: 'Sep', value: 490 },
                    { name: 'Oct', value: 604 },
                    { name: 'Nov', value: 649 },
                    { name: 'Dec', value: 723 },
                  ]}
                />
              </Grid>
              <Grid sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
                <IncomeSummary
                  data={[
                    { name: 'Jan', value: 578 },
                    { name: 'Feb', value: 610 },
                    { name: 'Mar', value: 605 },
                    { name: 'Apr', value: 622 },
                    { name: 'May', value: 628 },
                    { name: 'Jun', value: 607 },
                    { name: 'Jul', value: 583 },
                    { name: 'Aug', value: 600 },
                    { name: 'Sep', value: 630 },
                    { name: 'Oct', value: 608 },
                    { name: 'Nov', value: 659 },
                    { name: 'Dec', value: 678 },
                  ]}
                  expenses="$57,139"
                  expensesDiff="11"
                  expensesTrend="down"
                  income="$309,761"
                  incomeDiff="14"
                  incomeTrend="up"
                />
              </Grid>
              <Grid sx={{ '& > *': { height: '100%' } }} xl={4} xs={12}>
                <TopDrivers
                  data={[
                    { id: 'DRV-001', name: 'Courtney Henry', deliveries: 75, trend: 'up' },
                    { id: 'DRV-002', name: 'Eleanor Pena', deliveries: 64, trend: 'up' },
                    { id: 'DRV-003', name: 'Darlene Robertson', deliveries: 62, trend: 'down' },
                    { id: 'DRV-004', name: 'Albert Flores', deliveries: 58, trend: 'up' },
                    { id: 'DRV-005', name: 'Jane Cooper', deliveries: 55, trend: 'up' },
                  ]}
                />
              </Grid>
              <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={4} xs={12}>
                <VehicleTypes
                  data={[
                    {
                      id: 'trains',
                      name: 'Trains',
                      value: 445,
                      color: 'var(--joy-palette-primary-solidBg)',
                    },
                    {
                      id: 'cargoVans',
                      name: 'Cargo Vans',
                      value: 1497,
                      color: '#2E90FA',
                    },
                    {
                      id: 'planes',
                      name: 'Planes',
                      value: 326,
                      color: '#DD2590',
                    },
                    {
                      id: 'trucks',
                      name: 'Trucks',
                      value: 1088,
                      color: '#EAC54F',
                    },
                  ]}
                />
              </Grid>
              <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={4} xs={12}>
                <TopCountries
                  data={[
                    { country: 'us', amount: 35 },
                    { country: 'uk', amount: 25 },
                    { country: 'au', amount: 15 },
                    { country: 'de', amount: 11 },
                    { country: 'ca', amount: 7 },
                    { country: 'ae', amount: 5 },
                    { country: null, amount: 2 },
                  ]}
                />
              </Grid>
              <Grid xl={4} xs={12}>
                <Stack
                  direction={{ xs: 'column', md: 'row', xl: 'column' }}
                  spacing={3}
                  sx={{
                    height: '100%',
                    '& > *': {
                      flexGrow: 1,
                    },
                  }}
                >
                  <VehiclesStatus needRepair={4} onHold={2} onRoute={12} />
                  <OrdersStatus delayed={1032} inProgress={3981} onTime={2708} />
                </Stack>
              </Grid>
              <Grid xs={12}>
                <ShippingHistory
                  shipments={[
                    {
                      id: 'SHP-0058',
                      driverAvatar: '/assets/avatar-2.png',
                      driverName: 'Sienna Hewitt',
                      date: dayjs().format('MMMM D, YYYY'),
                      orderId: 'ORD-0019',
                      pickLocation: 'New York',
                      dropLocation: 'Austin',
                      weight: '3kg',
                      amount: '$432.09',
                      status: 'ongoing',
                    },
                    {
                      id: 'SHP-0057',
                      driverAvatar: '/assets/avatar-4.png',
                      driverName: 'Pippa Wilkinson',
                      date: dayjs().subtract(1, 'day').format('MMMM D, YYYY'),
                      orderId: 'ORD-0018',
                      pickLocation: 'Chicago',
                      dropLocation: 'Washingto',
                      weight: '1kg',
                      amount: '$3,201.99',
                      status: 'ongoing',
                    },
                    {
                      id: 'SHP-0056',
                      driverAvatar: '/assets/avatar-7.png',
                      driverName: 'Julius Vaughan',
                      date: dayjs().subtract(4, 'day').format('MMMM D, YYYY'),
                      orderId: 'ORD-0017',
                      pickLocation: 'San Francisco',
                      dropLocation: 'Denver',
                      weight: '2kg',
                      amount: '$23.07',
                      status: 'canceled',
                    },
                    {
                      id: 'SHP-0055',
                      driverAvatar: '/assets/avatar-1.png',
                      driverName: 'Zaid Schwartz',
                      date: dayjs().subtract(7, 'day').format('MMMM D, YYYY'),
                      orderId: 'ORD-0016',
                      pickLocation: 'Los Angeles',
                      dropLocation: 'Seattle',
                      weight: '18kg',
                      amount: '$984.01',
                      status: 'shipped',
                    },
                    {
                      id: 'SHP-0054',
                      driverAvatar: '/assets/avatar-6.png',
                      driverName: 'Mathilde Lewis',
                      date: dayjs().subtract(13, 'day').format('MMMM D, YYYY'),
                      orderId: 'ORD-0015',
                      pickLocation: 'San Diego',
                      dropLocation: 'Indianapolis',
                      weight: '23kg',
                      amount: '$1,198.00',
                      status: 'delivered',
                    },
                    {
                      id: 'SHP-0053',
                      driverAvatar: '/assets/avatar-5.png',
                      driverName: 'Olly Schroeder',
                      date: dayjs().subtract(24, 'day').format('MMMM D, YYYY'),
                      orderId: 'ORD-0014',
                      pickLocation: 'Seattle',
                      dropLocation: 'San Francisco',
                      weight: '5kg',
                      amount: '$119.00',
                      status: 'delivered',
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
