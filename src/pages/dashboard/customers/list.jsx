// import * as React from 'react';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import Container from '@mui/joy/Container';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { paths } from '@/paths';
// import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
// import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
// import { RouterLink } from '@/components/core/link';
// import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
// import { CustomersTable } from '@/components/dashboard/customer/customers-table';

// const metadata = {
//   title: `List | Customers | Dashboard | ${config.site.name}`,
// };

// const customers = [
//   {
//     id: 'CUS-005',
//     avatar: '/assets/avatar-5.png',
//     name: 'Olly Schroeder',
//     email: 'olly.schroeder@domain.com',
//     phoneNumber: '(269) 278-4358',
//     country: 'United States',
//     state: 'Michigan',
//     city: 'Three Rivers',
//     zip: '49093',
//     orders: 0,
//     paid: '$0.00',
//   },
//   {
//     id: 'CUS-004',
//     avatar: '/assets/avatar-4.png',
//     name: 'Pippa Wilkinson',
//     email: 'pippa.wilkinson@domain.com',
//     phoneNumber: null,
//     country: 'United States',
//     state: 'Connecticut',
//     city: 'Bridgeport',
//     zip: '06604',
//     orders: 3,
//     paid: '$154.00',
//   },
//   {
//     id: 'CUS-003',
//     avatar: '/assets/avatar-3.png',
//     name: 'Ammar Foley',
//     email: 'ammar.foley@domain.com',
//     phoneNumber: '(787) 992-6937',
//     country: 'United States',
//     state: 'Michigan',
//     city: 'Watton',
//     zip: '49970',
//     orders: 1,
//     paid: '$75.25',
//   },
//   {
//     id: 'CUS-002',
//     avatar: '/assets/avatar-2.png',
//     name: 'Sienna Hewitt',
//     email: 'sienna.hewitt@domain.com',
//     phoneNumber: '(907) 555-0101',
//     country: 'United States',
//     state: 'Nebraska',
//     city: 'Omaha',
//     zip: '68164',
//     orders: 8,
//     paid: '$432.09',
//   },
//   {
//     id: 'CUS-001',
//     avatar: '/assets/avatar-1.png',
//     name: 'Zaid Schwartz',
//     email: 'zaid.schwartz@domain.com',
//     phoneNumber: '(801) 301-7140',
//     country: 'United States',
//     city: 'Louisville',
//     state: 'Kentucky',
//     zip: '40202',
//     orders: 1,
//     paid: '$600.00',
//   },
// ];

// export function Page() {
//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>
//       <main>
//         <Container maxWidth={false} sx={{ py: 3 }}>
//           <Stack spacing={3}>
//             <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
//               <Stack spacing={1} sx={{ flexGrow: 1 }}>
//                 <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
//                   Customers
//                 </Typography>
//                 <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem type="end">Customers</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
//                 <Button
//                   component={RouterLink}
//                   href={paths['dashboard.customers.create']}
//                   startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                 >
//                   Create
//                 </Button>
//               </Stack>
//             </Stack>
//             <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//               <CustomersTable rows={customers} />
//             </Card>
//             <CustomersPagination />
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
