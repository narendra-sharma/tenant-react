// import * as React from 'react';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Button from '@mui/joy/Button';
// import Checkbox from '@mui/joy/Checkbox';
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
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { paths } from '@/paths';
// import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
// import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
// import { TextEditor } from '@/components/core/text-editor';
// import { FileDropzone } from '@/components/dashboard/product/file-dropzone';
// import { ProductImage } from '@/components/dashboard/product/product-image';

// const metadata = {
//   title: `Create | Products | Dashboard | ${config.site.name}`,
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
//                   Create a Product
//                 </Typography>
//                 <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//                   <BreadcrumbsItem href={paths['dashboard']} type="start" />
//                   <BreadcrumbsItem href={paths['dashboard.products']}>Products</BreadcrumbsItem>
//                   <BreadcrumbsItem type="end">Create</BreadcrumbsItem>
//                 </Breadcrumbs>
//               </Stack>
//               <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
//                 <Button startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}>
//                   Create
//                 </Button>
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
//                         <Input name="name" />
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Category</FormLabel>
//                         <Select defaultValue="" name="category">
//                           <Option value="">Choose a category</Option>
//                           <Option value="shoes">Shoes</Option>
//                           <Option value="casio">Casio</Option>
//                           <Option value="headphones">Headphones</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Brand</FormLabel>
//                         <Select defaultValue="" name="brand">
//                           <Option value="">Choose a brand</Option>
//                           <Option value="puma">Puma</Option>
//                           <Option value="nike">Nike</Option>
//                           <Option value="adidas">Adidas</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <div>
//                     <FormControl>
//                       <FormLabel>Description</FormLabel>
//                       <TextEditor content="" placeholder="Write something..." />
//                     </FormControl>
//                   </div>
//                   <Stack spacing={2}>
//                     <FormControl>
//                       <FormLabel>Images</FormLabel>
//                       <FileDropzone />
//                     </FormControl>
//                     <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
//                       {[].map((image) => (
//                         <ProductImage key={image.id} url={image.url} />
//                       ))}
//                     </Stack>
//                   </Stack>
//                   <Stack spacing={2}>
//                     <Stack spacing="4px">
//                       <FormLabel>Metadata</FormLabel>
//                       <Grid container spacing={3}>
//                         <Grid md={6} xs={12}>
//                           <Input name="meta_key_0" placeholder="Key" />
//                         </Grid>
//                         <Grid md={6} xs={12}>
//                           <Input name="meta_value_0" placeholder="Value" />
//                         </Grid>
//                       </Grid>
//                     </Stack>
//                     <div>
//                       <Link
//                         level="body-sm"
//                         startDecorator={<PlusIcon style={{ fontSize: 'var(--joy-fontSize-md)' }} weight="bold" />}
//                       >
//                         Add More Metadata
//                       </Link>
//                     </div>
//                   </Stack>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Inventory</Typography>
//                 <Stack spacing={3} sx={{ maxWidth: 'md' }}>
//                   <div>
//                     <Checkbox checked label="This is a physical product" />
//                   </div>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>SKU</FormLabel>
//                         <Input placeholder="SKU-001" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Barcode</FormLabel>
//                         <Input name="barcode" value="" />
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Weight</FormLabel>
//                         <Input name="weight" value="" />
//                       </FormControl>
//                     </Grid>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Volume</FormLabel>
//                         <Input name="volume" value="" />
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <div>
//                     <FormLabel sx={{ m: '4px' }}>Dimensions</FormLabel>
//                     <Grid container spacing={3}>
//                       <Grid md={4} xs={12}>
//                         <Input endDecorator="cm" name="depth" placeholder="Depth" value="" />
//                       </Grid>
//                       <Grid md={4} xs={12}>
//                         <Input endDecorator="cm" name="width" placeholder="Width" value="" />
//                       </Grid>
//                       <Grid md={4} xs={12}>
//                         <Input endDecorator="cm" name="height" placeholder="Height" value="" />
//                       </Grid>
//                     </Grid>
//                   </div>
//                 </Stack>
//               </Stack>
//               <Stack spacing={3}>
//                 <Typography level="h4">Pricing</Typography>
//                 <Stack spacing={3} sx={{ maxWidth: 'md' }}>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Pricing Model</FormLabel>
//                         <Select name="pricingModel" value="standard">
//                           <Option value="standard">Standard Pricing</Option>
//                           <Option value="package">Package Pricing</Option>
//                           <Option value="graduated">Graduated Pricing</Option>
//                           <Option value="volume">Volume Pricing</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <Stack spacing="4px">
//                         <FormLabel>Price</FormLabel>
//                         <Input
//                           defaultValue=""
//                           endDecorator={
//                             <Select name="currency" size="sm" value="usd" variant="plain">
//                               <Option value="usd">USD</Option>
//                               <Option value="eur">EUR</Option>
//                             </Select>
//                           }
//                           name="price"
//                           placeholder="0.00"
//                           slotProps={{
//                             input: {
//                               lang: 'en',
//                               min: 0,
//                               step: 0.01,
//                             },
//                           }}
//                           startDecorator="$"
//                           sx={{
//                             pr: 0,
//                             '& .MuiInput-endDecorator': {
//                               borderLeft: '1px solid var(--joy-palette-divider)',
//                               p: '4px',
//                             },
//                           }}
//                           type="number"
//                         />
//                       </Stack>
//                     </Grid>
//                   </Grid>
//                   <Stack direction="row" spacing={2}>
//                     <Button color="primary" size="sm" variant="outlined">
//                       Recurring
//                     </Button>
//                     <Button color="neutral" size="sm" variant="outlined">
//                       One Time
//                     </Button>
//                   </Stack>
//                   <Grid container spacing={3}>
//                     <Grid md={6} xs={12}>
//                       <FormControl>
//                         <FormLabel>Billing Cycle</FormLabel>
//                         <Select name="billingCycle" value="monthly">
//                           <Option value="daily">Daily</Option>
//                           <Option value="weekly">Weekly</Option>
//                           <Option value="monthly">Monthly</Option>
//                           <Option value="yearly">Yearly</Option>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                   </Grid>
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Stack>
//         </Container>
//       </main>
//     </React.Fragment>
//   );
// }
