// import * as React from 'react';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import Chip from '@mui/joy/Chip';
// import Container from '@mui/joy/Container';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Grid from '@mui/joy/Grid';
// import Input from '@mui/joy/Input';
// import Link from '@mui/joy/Link';
// import Option from '@mui/joy/Option';
// import Select from '@mui/joy/Select';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { paths } from '@/paths';
// import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
// import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
// import { PropertyItem } from '@/components/core/property-item';
// import { PropertyList } from '@/components/core/property-list';
// import { TextEditor } from '@/components/core/text-editor';
// import { FileDropzone } from '@/components/dashboard/product/file-dropzone';
// import { ProductImage } from '@/components/dashboard/product/product-image';
// import { VariantsTable } from '@/components/dashboard/product/variants-table';

// const metadata = {
//   title: `Details | Products | Dashboard | ${config.site.name}`,
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
//                   Product Details
//                 </Typography>
//                 <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem href={paths['dashboard.products']}>Products</BreadcrumbsItem>
//                   <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="column" spacing={2} sx={{ alignItems: { sm: 'flex-end' } }}>
//                 <div>
//                   <Button>Publish</Button>
//                 </div>
//                 <Stack>
//                   <Typography
//                     endDecorator={
//                       <Chip component="span" size="sm" variant="soft">
//                         Draft
//                       </Chip>
//                     }
//                     level="body-sm"
//                   >
//                     Status
//                   </Typography>
//                 </Stack>
//               </Stack>
//             </Stack>
//             <Stack divider={<Divider />} spacing={5}>
//               <Stack spacing={3}>
//                 <Typography level="h4">Information</Typography>
//                 <Stack spacing={3} sx={{ maxWidth: 'md' }}>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Display Name</FormLabel>
//                         <Input defaultValue="Puma XForce Sneakers" name="name" />
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Category</FormLabel>
//                         <Select defaultValue="shoes" name="category">
//                           <Option value="">Choose a category</Option>
//                           <Option value="shoes">Shoes</Option>
//                           <Option value="wallet">Wallet</Option>
//                           <Option value="headphone">Headphones</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Brand</FormLabel>
//                         <Select defaultValue="puma" name="brand">
//                           <Option value="">Choose a brand</Option>
//                           <Option value="puma">Puma</Option>
//                           <Option value="nike">Nike</Option>
//                           <Option value="adidas">Adidas</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <div>
//                     <TextEditor
//                       content={
//                         "<p>Elevate your running game with the Puma FlexRide Men's Running Shoes, designed to provide the perfect blend of style, comfort, and performance. Whether you're hitting the track, pounding the pavement, or simply strolling through the city, these shoes are your ideal companion.</p><h5>Features</h5><ul><li><b>Optimized Flexibility</b>: The FlexRide technology in these shoes ensures that your every step feels natural and effortless. </li><li><b>Sleek and Stylish</b>: Puma's iconic design elements are showcased in these shoes, making them a fashion statement on and off the track. </li></ul><p>Order yours today and experience the difference in every step. It's time to unleash your inner athlete with Puma!</p>"
//                       }
//                       editable={false}
//                       placeholder="Write something..."
//                     />
//                   </div>
//                 </Stack>
//                 <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//                   <Button color="neutral" variant="outlined">
//                     Discard
//                   </Button>
//                   <Button>Save Changes</Button>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Images</Typography>
//                 <Stack spacing={3} sx={{ maxWidth: 'md' }}>
//                   <FileDropzone />
//                   <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
//                     {[
//                       {
//                         id: 'PRD-IMG-001',
//                         url: '/assets/product-1.png',
//                       },
//                     ].map((image) => (
//                       <ProductImage key={image.id} url={image.url} />
//                     ))}
//                   </Stack>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Metadata</Typography>
//                 <Stack spacing={2}>
//                   <PropertyList>
//                     {[
//                       { key: 'delivery', value: 'FedEx' },
//                       { key: 'manufacturer', value: 'Bose' },
//                       { key: 'audience', value: 'Business Professionals' },
//                     ].map((row) => (
//                       <PropertyItem key={row.key} name={row.key} value={row.value} />
//                     ))}
//                   </PropertyList>
//                   <div>
//                     <Link
//                       level="body-sm"
//                       startDecorator={<PenIcon style={{ fontSize: 'var(--joy-fontSize-md)' }} weight="bold" />}
//                     >
//                       Edit Metadata
//                     </Link>
//                   </div>
//                 </Stack>
//               </Stack>
//               <Stack spacing={2}>
//                 <Typography level="h4">Inventory</Typography>
//                 <Stack spacing={3} sx={{ maxWidth: 'md' }}>
//                   <PropertyList>
//                     {[
//                       { key: 'SKU', value: 'SKU-001' },
//                       { key: 'Barcode', value: '' },
//                       { key: 'Volume', value: '' },
//                       { key: 'Dimensions', value: '' },
//                     ].map((row) => (
//                       <PropertyItem key={row.key} name={row.key} value={row.value} />
//                     ))}
//                   </PropertyList>
//                   <div>
//                     <Link
//                       level="body-sm"
//                       startDecorator={<PenIcon style={{ fontSize: 'var(--joy-fontSize-md)' }} weight="bold" />}
//                     >
//                       Edit Inventory
//                     </Link>
//                   </div>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Pricing</Typography>
//                 <Stack spacing={2}>
//                   <PropertyList>
//                     {[
//                       { key: 'Pricing Model', value: 'Standard Pricing' },
//                       { key: 'Price', value: '$150.00' },
//                       { key: 'Payment Type', value: 'Recurring' },
//                       { key: 'Billing Cycle', value: 'Monthly' },
//                     ].map((row) => (
//                       <PropertyItem key={row.key} name={row.key} value={row.value} />
//                     ))}
//                   </PropertyList>
//                   <div>
//                     <Link
//                       level="body-sm"
//                       startDecorator={<PenIcon style={{ fontSize: 'var(--joy-fontSize-md)' }} weight="bold" />}
//                     >
//                       Edit Pricing
//                     </Link>
//                   </div>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Variants</Typography>
//                 <Stack spacing={2}>
//                   <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
//                     <VariantsTable
//                       rows={[
//                         {
//                           id: 'PRD-002',
//                           name: 'Bose Headphones Slim',
//                           image: '/assets/product-1.png',
//                           inventory: 0,
//                           price: 250,
//                           sku: 'SKU-002',
//                         },
//                       ]}
//                     />
//                   </Card>
//                   <div>
//                     <Button
//                       color="neutral"
//                       size="sm"
//                       startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//                       variant="outlined"
//                     >
//                       Add Variant
//                     </Button>
//                   </div>
//                 </Stack>
//               </Stack>
//               <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
//                 <Button color="danger" variant="outlined">
//                   Delete
//                 </Button>
//               </Stack>
//             </Stack>
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
