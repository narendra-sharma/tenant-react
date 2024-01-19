'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { DataTable } from '@/components/core/data-table';

const products = [
  {
    id: 'PRD-001',
    name: 'Adidas Mens Adi Zoom M Sneaker Shoe',
    image: '',
    quantity: 1,
    unitPrice: '$150.00',
    amount: '$150.00',
  },
];

const productColumns = [
  { field: 'id', name: 'ID', width: '60px' },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          src={row.image}
          sx={{
            '--Avatar-radius': 'var(--joy-radius-sm)',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            height: '42px',
            width: '42px',
          }}
        >
          <PackageIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </Avatar>
        <Typography>{row.name}</Typography>
      </Stack>
    ),
    name: 'Name',
    width: '160px',
  },
  { field: 'quantity', name: 'Qty', width: '60px' },
  { field: 'unitPrice', name: 'Unit Price', width: '60px' },
  { field: 'amount', name: 'Amount', width: '60px' },
  {
    formatter: () => (
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton color="neutral" size="sm" variant="plain">
          <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Stack>
    ),
    hideName: true,
    name: 'Actions',
    width: '40px',
  },
];

export function OrderCreateForm({ compact, onSubmit }) {
  const sectionsSpacing = compact ? 3 : 5;
  const sectionSpacing = compact ? 2 : 3;
  const sectionTitleLevel = compact ? 'title-lg' : 'h4';

  return (
    <form onSubmit={onSubmit}>
      <Stack divider={<Divider />} spacing={sectionsSpacing}>
        <Stack spacing={sectionSpacing}>
          <Typography level={sectionTitleLevel}>Customer</Typography>
          <Box sx={{ maxWidth: 'md' }}>
            <FormControl>
              <Input defaultValue="" name="customerName" placeholder="Find a customer" />
            </FormControl>
          </Box>
        </Stack>
        <Stack spacing={sectionSpacing}>
          <Typography level={sectionTitleLevel}>Products</Typography>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <DataTable columns={productColumns} rows={products} stripe="even" sx={{ minWidth: '800px' }} />
          </Card>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                color="neutral"
                size="sm"
                startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                variant="outlined"
              >
                Add Product
              </Button>
            </Box>
            <Stack spacing={2}>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Subtotal</Typography>
                <Typography>$150.00</Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Taxes</Typography>
                <Typography>$35.00</Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="lg">Total</Typography>
                <Typography level="h4">$185.00</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={sectionSpacing}>
          <Typography level={sectionTitleLevel}>Billing Information</Typography>
          <Grid container disableEqualOverflow spacing={3} sx={{ maxWidth: 'md' }}>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select defaultValue="" name="shippingCountry">
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
                <Input defaultValue="" name="shippingState" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input defaultValue="" name="shippingCity" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel>Zip Code</FormLabel>
                <Input defaultValue="" name="shippingZip" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Textarea defaultValue="" maxRows={3} minRows={2} name="shippingStreet" />
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={sectionSpacing}>
          <Typography level={sectionTitleLevel}>Shipping Details</Typography>
          <Checkbox checked label="Same as billing address" />
        </Stack>
        <Stack spacing={sectionSpacing}>
          <Typography level={sectionTitleLevel}>Additional Notes</Typography>
          <Stack spacing={1} sx={{ maxWidth: 'md' }}>
            <FormControl>
              <Textarea defaultValue="" maxRows={5} minRows={3} name="note" />
            </FormControl>
            <Typography level="body-sm">* This is a public note, it will appear on the order</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" type="submit" variant="outlined">
            Save as Draft
          </Button>
          <Button type="submit">Publish</Button>
        </Stack>
      </Stack>
    </form>
  );
}
