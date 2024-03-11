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
// import { ProductsFiltersButton } from '@/components/dashboard/product/products-filters-button';
// import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
// import { ProductsTable } from '@/components/dashboard/product/products-table';

// const metadata = {
//   title: `List | Products | Dashboard | ${config.site.name}`,
// };

// const products = [
//   {
//     id: 'PRD-005',
//     name: 'Retro Polaroid Camera',
//     image: '/assets/product-5.png',
//     status: 'draft',
//     category: 'Camera',
//     price: '$256.00',
//     stock: 4,
//   },
//   {
//     id: 'PRD-004',
//     name: 'Bose Wireless Headphones',
//     image: '/assets/product-4.png',
//     status: 'published',
//     category: 'Shoes',
//     price: '$150.00',
//     stock: 42,
//   },
//   {
//     id: 'PRD-003',
//     name: 'Nike Sportswear Unisex Backpack',
//     image: '/assets/product-3.png',
//     status: 'draft',
//     category: 'Backpack',
//     price: '$67.25',
//     stock: 37,
//   },
//   {
//     id: 'PRD-002',
//     name: 'Luxe Leather Wallet',
//     image: '/assets/product-2.png',
//     status: 'published',
//     category: 'published',
//     price: '$75.00',
//     stock: 120,
//   },
//   {
//     id: 'PRD-001',
//     name: 'Puma XForce Sneakers',
//     image: '/assets/product-1.png',
//     status: 'published',
//     category: 'Shoes',
//     price: '$152.75',
//     stock: 12,
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
//                   Products
//                 </Typography>
//                 <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem type="end">Products</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
//                 <Button
//                   component={RouterLink}
//                   href={paths['dashboard.products.create']}
//                   startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                 >
//                   Create
//                 </Button>
//               </Stack>
//             </Stack>
//             <Stack direction="row" spacing={3} sx={{ justifyContent: 'flex-end' }}>
//               <ProductsFiltersButton />
//             </Stack>
//             <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//               <ProductsTable rows={products} />
//             </Card>
//             <ProductsPagination />
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
