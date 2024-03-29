// import * as React from 'react';
// import Card from '@mui/joy/Card';
// import Container from '@mui/joy/Container';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Grid from '@mui/joy/Grid';
// import Input from '@mui/joy/Input';
// import Option from '@mui/joy/Option';
// import Select from '@mui/joy/Select';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { CoinVertical as CoinVerticalIcon } from '@phosphor-icons/react/dist/ssr/CoinVertical';
// import { ShoppingCart as ShoppingCartIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCart';
// import { UsersThree as UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';
// import dayjs from 'dayjs';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { DeviceTable } from '@/components/dashboard/customer/device-table';
// import { Inbox } from '@/components/dashboard/overview/inbox';
// import { Orders } from '@/components/dashboard/overview/orders';
// import { SessionsByDevice } from '@/components/dashboard/overview/sessions-by-device';
// import { Stats } from '@/components/dashboard/overview/stats';
// import { Tasks } from '@/components/dashboard/overview/tasks';
// import { UsersRealtime } from '@/components/dashboard/overview/users-realtime';
// import { PowerUsageToday } from '@/components/dashboard/smart-home/power-usage-today';

// const customers = [
//   {
//     id: 'k5',
//     createdAt: dayjs().subtract(1, 'day').valueOf(),
//     customerName: 'Chris Glasser',
//     reading: '25,40',
//     items: '13,04',
//     reading: '1',
//     status: 'online',
//   },
//   {
//     id: 'k4',
//     createdAt: dayjs().subtract(1, 'day').valueOf(),
//     customerName: 'Iva Ryan',
//     reading: '25,40',
//     items: '13,04',
//     status: 'online',
//   },
//   {
//     id: 'k2',
//     createdAt: dayjs().subtract(3, 'day').subtract(3, 'hour').valueOf(),
//     customerName: 'Ricky Smith',
//     reading: '25,40',
//     items: '13,04',
//     status: 'offline',
//   },
//   {
//     id: 'k3',
//     createdAt: dayjs().subtract(3, 'day').valueOf(),
//     customerName: 'Kenneth Allen',
//     reading: '25,40',
//     items: '13,04',
//     status: 'online',
//   },
//   {
//     id: 'k1',
//     createdAt: dayjs().subtract(2, 'day').valueOf(),
//     customerName: 'Mary Freund',
//     reading: '25,40',
//     items: '13,04',
//     status: 'offline',
//   },
// ];
// const metadata = {
//   title: `Dashboard | ${config.site.name}`,
// };

// export function Page() {
//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>
//       <main>
//         <Container maxWidth={false} sx={{ py: 3 }}>
//           <Stack spacing={3}>
//             <div>
//               <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
//                 DashBoard
//               </Typography>
//             </div>
//             <Grid container spacing={3}>
//               <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
//                 <Stats color="primary" icon={ShoppingCartIcon} label="Total Devices" value="220" />
//               </Grid>
//               <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
//                 <Stats
//                   color="danger"
//                   diff={16}
//                   icon={CoinVerticalIcon}
//                   label="Water Meters"
//                   trend="up"
//                   value="$92,175"
//                 />
//               </Grid>
//               <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
//                 <Stats
//                   color="success"
//                   diff={24}
//                   icon={UsersThreeIcon}
//                   label="Electricity Meters"
//                   trend="up"
//                   value="560,410"
//                 />
//               </Grid>
//               <Grid md={3} sx={{ '& > *': { height: '100%' } }} xs={12}>
//                 <Stats
//                   color="success"
//                   diff={24}
//                   icon={UsersThreeIcon}
//                   label="Offline Meters"
//                   trend="up"
//                   value="560,410"
//                 />
//               </Grid>
//             </Grid>

//             <Stack direction={{ md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
//               <FormControl sx={{ maxWidth: '240px', mr: 'auto', width: '100%' }}>
//                 <FormLabel>Device Name</FormLabel>
//                 <Input defaultValue="" name="orderId" />
//               </FormControl>
//               <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
//                 <FormLabel>Client Name</FormLabel>
//                 <Input defaultValue="" name="customer" />
//               </FormControl>
//               <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
//                 <FormLabel>Status</FormLabel>
//                 <Select defaultValue="all" name="status">
//                   <Option value="all">All</Option>
//                   <Option value="active">Online</Option>
//                   <Option value="canceled">Offline</Option>
//                 </Select>
//               </FormControl>
//             </Stack>
//             <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//               <DeviceTable rows={customers} />
//             </Card>
//             <Grid container spacing={3}>
//               <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
//                 <PowerUsageToday
//                   data={[
//                     { name: '12AM', v1: 506, v2: 549 },
//                     { name: '1AM', v1: 479, v2: 531 },
//                     { name: '2AM', v1: 678, v2: 504 },
//                     { name: '3AM', v1: 642, v2: 438 },
//                     { name: '4AM', v1: 523, v2: 409 },
//                     { name: '5AM', v1: 575, v2: 611 },
//                     { name: '6AM', v1: 588, v2: 518 },
//                     { name: '7AM', v1: 697, v2: 662 },
//                     { name: '8AM', v1: 615, v2: 561 },
//                     { name: '9AM', v1: 672, v2: 547 },
//                     { name: '10AM', v1: 631, v2: 521 },
//                     { name: '11AM', v1: 624, v2: 0 },
//                     { name: '12PM', v1: 437, v2: 0 },
//                     { name: '1PM', v1: 482, v2: 0 },
//                     { name: '2PM', v1: 663, v2: 0 },
//                     { name: '3PM', v1: 459, v2: 0 },
//                     { name: '4PM', v1: 460, v2: 0 },
//                     { name: '5PM', v1: 500, v2: 0 },
//                     { name: '6PM', v1: 623, v2: 0 },
//                     { name: '7PM', v1: 474, v2: 0 },
//                     { name: '8PM', v1: 400, v2: 0 },
//                     { name: '9PM', v1: 513, v2: 0 },
//                     { name: '10PM', v1: 547, v2: 0 },
//                     { name: '11PM', v1: 409, v2: 0 },
//                   ]}
//                 />
//               </Grid>
//               <Grid lg={6} sx={{ '& > *': { height: '100%' } }} xl={8} xs={12}>
//                 <Orders
//                   data={[
//                     { name: 'January', v1: 400, v2: 200, v3: 300 },
//                     { name: 'February', v1: 300, v2: 100, v3: 500 },
//                     { name: 'March', v1: 200, v2: 400, v3: 100 },
//                     { name: 'April', v1: 278, v2: 300, v3: 150 },
//                     { name: 'May', v1: 189, v2: 500, v3: 350 },
//                     { name: 'June', v1: 239, v2: 150, v3: 450 },
//                   ]}
//                 />
//               </Grid>
//             </Grid>
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
