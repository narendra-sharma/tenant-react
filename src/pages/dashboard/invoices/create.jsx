// import * as React from 'react';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Button from '@mui/joy/Button';
// import Container from '@mui/joy/Container';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
// import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { paths } from '@/paths';
// import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
// import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
// import { InvoiceCreateForm } from '@/components/dashboard/invoice/invoice-create-form';

// const metadata = {
//   title: `Create | Invoices | Dashboard | ${config.site.name}`,
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
//                 <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1" whiteSpace="nowrap">
//                   Create an Invoice
//                 </Typography>
//                 <Breadcrumbs
//                   separator={<BreadcrumbsSeparator />}
//                   sx={{
//                     '& .MuiBreadcrumbs-ol': {
//                       flexWrap: 'nowrap',
//                     },
//                   }}
//                 >
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem href={paths['dashboard.invoices']}>Invoices</BreadcrumbsItem>
//                   <BreadcrumbsItem type="end">Create</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="column" spacing={2} sx={{ alignItems: { sm: 'flex-end' } }}>
//                 <Stack direction="row" spacing={2}>
//                   <Button
//                     color="neutral"
//                     startDecorator={<PrinterIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                     variant="outlined"
//                   >
//                     Preview
//                   </Button>
//                   <Button
//                     startDecorator={<PaperPlaneTiltIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                   >
//                     Send Invoice
//                   </Button>
//                 </Stack>
//                 <Typography level="body-xs">Draft saved 4 minutes ago</Typography>
//               </Stack>
//             </Stack>
//             <InvoiceCreateForm />
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
