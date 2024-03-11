// import * as React from 'react';
// import Alert from '@mui/joy/Alert';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import Container from '@mui/joy/Container';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Grid from '@mui/joy/Grid';
// import Input from '@mui/joy/Input';
// import Option from '@mui/joy/Option';
// import Select from '@mui/joy/Select';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
// import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
// import dayjs from 'dayjs';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { paths } from '@/paths';
// import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
// import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
// import { InvoicesTable } from '@/components/dashboard/customer/invoices-table';
// import { ShippingAddressCard } from '@/components/dashboard/customer/shipping-address-card';
// import { SubscriptionsTable } from '@/components/dashboard/customer/subscriptions-table';

// const metadata = {
//   title: `Details | Customers | Dashboard | ${config.site.name}`,
// };

// export function Page() {
//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>
//       <main>
//         <Container maxWidth={false} sx={{ py: 3 }}>
//           <Stack spacing={5}>
//             <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
//               <Stack spacing={1} sx={{ flexGrow: 1 }}>
//                 <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
//                   Customer Details
//                 </Typography>
//                 <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem href={paths['dashboard.customers']}>Customers</BreadcrumbsItem>
//                   <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
//                 <Button
//                   color="danger"
//                   startDecorator={<TrashIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                 >
//                   Delete
//                 </Button>
//               </Stack>
//             </Stack>
//             <div>
//               <Alert
//                 color="warning"
//                 startDecorator={<WarningIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                 variant="soft"
//               >
//                 Account will be suspended in 2 days due to unpaid invoices
//               </Alert>
//             </div>
//             <Stack divider={<Divider />} spacing={5}>
//               <Stack spacing={3}>
//                 <Typography level="h4">Basic Information</Typography>
//                 <Box
//                   sx={{
//                     bgcolor: 'var(--joy-palette-background-level1)',
//                     borderRadius: 'var(--joy-radius-md)',
//                     display: 'grid',
//                     gap: 3,
//                     gridTemplateColumns: {
//                       xs: '1fr',
//                       md: 'repeat(2, 1fr)',
//                       lg: 'repeat(4, 1fr)',
//                     },
//                     p: 3,
//                   }}
//                 >
//                   {[
//                     { label: 'Paid', value: '$600.00' },
//                     { label: 'Orders', value: 1 },
//                     { label: 'Charged off', value: '$0.00' },
//                     { label: 'Credits', value: '$100.00' },
//                   ].map((item) => (
//                     <Stack key={item.label} spacing={1}>
//                       <Typography level="h2">{item.value}</Typography>
//                       <Typography level="body-sm">{item.label}</Typography>
//                     </Stack>
//                   ))}
//                 </Box>
//                 <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
//                   <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
//                     <Avatar src="/assets/avatar-1.png">ZS</Avatar>
//                     <Box
//                       sx={{
//                         alignItems: 'center',
//                         borderRadius: '100%',
//                         color: 'var(--joy-palette-common-white)',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         height: '100%',
//                         justifyContent: 'center',
//                         left: 0,
//                         position: 'absolute',
//                         top: 0,
//                         width: '100%',
//                         '&:hover': {
//                           bgcolor: 'rgba(0, 0, 0, 0.4)',
//                         },
//                         '&:not(:hover) > *': {
//                           display: 'none',
//                         },
//                       }}
//                     >
//                       <PenIcon style={{ fontSize: 'var(--joy-fontSize-lg)' }} weight="bold" />
//                     </Box>
//                   </Box>
//                   <div>
//                     <Typography level="title-md">Profile Picture</Typography>
//                     <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
//                   </div>
//                 </Stack>
//                 <Box sx={{ maxWidth: 'lg' }}>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>ID</FormLabel>
//                         <Input disabled name="customerId" readOnly value="CUS-001" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Created At</FormLabel>
//                         <Input
//                           disabled
//                           name="createdAt"
//                           readOnly
//                           value={dayjs().subtract(3, 'month').format('MMMM D, YYYY hh:mm A')}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>First Name</FormLabel>
//                         <Input defaultValue="Zaid" name="firstName" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Last Name</FormLabel>
//                         <Input defaultValue="Schwartz" name="lastName" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Email</FormLabel>
//                         <Input defaultValue="zaid.schwartz@domain.com" name="email" type="email" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Phone Number</FormLabel>
//                         <Input defaultValue="" name="phoneNumber" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Country</FormLabel>
//                         <Select defaultValue="us" name="country">
//                           <Option value="">Choose a country</Option>
//                           <Option value="ca">Canada</Option>
//                           <Option value="uk">United Kingdom</Option>
//                           <Option value="us">United States</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>State</FormLabel>
//                         <Input defaultValue="Kentucky" name="state" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>City</FormLabel>
//                         <Input defaultValue="Louisville" name="city" />
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                 </Box>
//                 <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//                   <Button color="neutral" variant="outlined">
//                     Discard
//                   </Button>
//                   <Button>Save Changes</Button>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Shipping Addresses</Typography>
//                 <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
//                   {[
//                     {
//                       id: 'ADR-001',
//                       country: 'United States',
//                       state: 'Kentucky',
//                       city: 'Louisville',
//                       street: '3794 Broaddus Avenue',
//                       zip: '40202',
//                       primary: true,
//                     },
//                     {
//                       id: 'ADR-002',
//                       country: 'United States',
//                       state: 'Kentucky',
//                       city: 'Lexington',
//                       street: '3964 Black Stallion Road',
//                       zip: '40507',
//                     },
//                   ].map((address) => (
//                     <ShippingAddressCard address={address} key={address.id} />
//                   ))}
//                 </Stack>
//                 <div>
//                   <Button
//                     color="neutral"
//                     size="sm"
//                     startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                     variant="outlined"
//                   >
//                     Add Address
//                   </Button>
//                 </div>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Payments</Typography>
//                 <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//                   <InvoicesTable
//                     rows={[
//                       {
//                         id: 'INV-003',
//                         description: 'Customer Support Payment',
//                         issueDate: dayjs().set('date', 1).format('MMMM D, YYYY'),
//                         amount: '$300.00',
//                         status: 'pending',
//                       },
//                       {
//                         id: 'INV-002',
//                         description: 'Customer Support Payment',
//                         issueDate: dayjs().set('date', 1).subtract(1, 'month').format('MMMM D, YYYY'),
//                         amount: '$300.00',
//                         status: 'paid',
//                       },
//                       {
//                         id: 'INV-001',
//                         description: 'Customer Support Payment',
//                         issueDate: dayjs().set('date', 1).subtract(2, 'month').format('MMMM D, YYYY'),
//                         amount: '$300.00',
//                         status: 'paid',
//                       },
//                     ]}
//                   />
//                 </Card>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Subscriptions</Typography>
//                 <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//                   <SubscriptionsTable
//                     rows={[
//                       {
//                         id: 'SUB-001',
//                         stripeId: 'plan_2T1whhm5VhQ3Yj2',
//                         billingCycle: 'month',
//                         productName: 'Customer Support',
//                         amount: '$300.00',
//                         createdAt: dayjs().set('date', 1).subtract(2, 'month').valueOf(),
//                         updatedAt: dayjs().subtract(5, 'day').valueOf(),
//                       },
//                     ]}
//                   />
//                 </Card>
//                 <div>
//                   <Button
//                     color="neutral"
//                     size="sm"
//                     startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                     variant="outlined"
//                   >
//                     Add Subscription
//                   </Button>
//                 </div>
//               </Stack>
//             </Stack>
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
