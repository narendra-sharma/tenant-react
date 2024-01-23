import * as React from 'react';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CoinVertical as CoinVerticalIcon } from '@phosphor-icons/react/dist/ssr/CoinVertical';
import { ShoppingCart as ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';
import { UsersThree as UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Inbox } from '@/components/dashboard/overview/inbox';
import { Orders } from '@/components/dashboard/overview/orders';
import { SessionsByDevice } from '@/components/dashboard/overview/sessions-by-device';
import { Stats } from '@/components/dashboard/overview/stats';
import { Tasks } from '@/components/dashboard/overview/tasks';
import { UsersRealtime } from '@/components/dashboard/overview/users-realtime';
import { PowerUsageToday } from '@/components/dashboard/smart-home/power-usage-today';

const metadata = {
  title: `Dashboard | ${config.site.name}`,
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
                DashBoard
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Stats color="primary" icon={ShoppingCartIcon} label="Total Devices" value="220" />
              </Grid>
              <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Stats
                  color="danger"
                  diff={16}
                  icon={CoinVerticalIcon}
                  label="Water Meters"
                  trend="up"
                  value="$92,175"
                />
              </Grid>
              <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Stats
                  color="success"
                  diff={24}
                  icon={UsersThreeIcon}
                  label="Electricity Meters"
                  trend="up"
                  value="560,410"
                />
              </Grid>
              <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Stats
                  color="success"
                  diff={24}
                  icon={UsersThreeIcon}
                  label="Offline Meters"
                  trend="up"
                  value="560,410"
                />
              </Grid>
              {/* <Grid md={4} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Stats color="danger" icon={CoinVerticalIcon} label="Offline Devices" value="200" />
              </Grid> */}
              <Grid md={12} sx={{ '& > *': { height: '100%' } }} xs={12}>
                <Tasks
                  tasks={[
                    {
                      id: 'TSK-001',
                      status: 'active',
                      title: 'Create a landing page for app',
                      assignee: 'John Dukes',
                      duration: '3h',
                    },
                    {
                      id: 'TSK-002',
                      status: 'active',
                      title: 'Copywriting for the website',
                      assignee: 'Ricky Smith',
                      duration: '1h',
                    },
                    {
                      id: 'TSK-003',
                      status: 'pending',
                      title: 'Landing page development',
                      assignee: 'Amélie Laurent',
                      duration: '2h',
                    },
                    {
                      id: 'TSK-004',
                      status: 'active',
                      title: 'Discuss KPI with the team',
                      assignee: 'Jerry Helfer',
                      duration: '4h',
                    },
                    {
                      id: 'TSK-005',
                      status: 'completed',
                      title: 'Product Review for market',
                      assignee: 'Rhonda Rhodes',
                      duration: '12h',
                    },
                    {
                      id: 'TSK-006',
                      status: 'completed',
                      title: 'UX research for landing page',
                      assignee: 'Paula Mora',
                      duration: '8h',
                    },
                    {
                      id: 'TSK-007',
                      status: 'completed',
                      title: 'Competitor Analysis',
                      assignee: 'Kenneth Allen',
                      duration: '5h',
                    },
                  ]}
                />
              </Grid>
              <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
                <PowerUsageToday
                  data={[
                    { name: '12AM', v1: 506, v2: 549 },
                    { name: '1AM', v1: 479, v2: 531 },
                    { name: '2AM', v1: 678, v2: 504 },
                    { name: '3AM', v1: 642, v2: 438 },
                    { name: '4AM', v1: 523, v2: 409 },
                    { name: '5AM', v1: 575, v2: 611 },
                    { name: '6AM', v1: 588, v2: 518 },
                    { name: '7AM', v1: 697, v2: 662 },
                    { name: '8AM', v1: 615, v2: 561 },
                    { name: '9AM', v1: 672, v2: 547 },
                    { name: '10AM', v1: 631, v2: 521 },
                    { name: '11AM', v1: 624, v2: 0 },
                    { name: '12PM', v1: 437, v2: 0 },
                    { name: '1PM', v1: 482, v2: 0 },
                    { name: '2PM', v1: 663, v2: 0 },
                    { name: '3PM', v1: 459, v2: 0 },
                    { name: '4PM', v1: 460, v2: 0 },
                    { name: '5PM', v1: 500, v2: 0 },
                    { name: '6PM', v1: 623, v2: 0 },
                    { name: '7PM', v1: 474, v2: 0 },
                    { name: '8PM', v1: 400, v2: 0 },
                    { name: '9PM', v1: 513, v2: 0 },
                    { name: '10PM', v1: 547, v2: 0 },
                    { name: '11PM', v1: 409, v2: 0 },
                  ]}
                />
              </Grid>
              <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
                <Orders
                  data={[
                    { name: 'January', v1: 400, v2: 200, v3: 300 },
                    { name: 'February', v1: 300, v2: 100, v3: 500 },
                    { name: 'March', v1: 200, v2: 400, v3: 100 },
                    { name: 'April', v1: 278, v2: 300, v3: 150 },
                    { name: 'May', v1: 189, v2: 500, v3: 350 },
                    { name: 'June', v1: 239, v2: 150, v3: 450 },
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
