'use client';

import * as React from 'react';
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
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';

const lineItems = [
  {
    id: 'LI-0065',
    name: 'Adidas Mens Adi Zoom M Sneaker Shoe',
    quantity: 1,
    unitPrice: '$40.00',
    amount: '$40.00',
  },
  {
    id: 'LI-0064',
    name: 'Allen Solly Men Bomber Jacket',
    quantity: 2,
    unitPrice: '$30.00',
    amount: '$60.00',
  },
  {
    id: 'LI-0063',
    name: 'Puma Men Brand Print Cap',
    quantity: 5,
    unitPrice: '$15.00',
    amount: '$75.00',
  },
];

const lineItemColumns = [
  { field: 'name', name: 'Name', width: '40%' },
  { field: 'quantity', name: 'Quantity' },
  { field: 'unitPrice', name: 'Unit Price' },
  { field: 'amount', name: 'Amount' },
  {
    formatter: () => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="neutral" size="sm" variant="plain">
          <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Box>
    ),
    hideName: true,
    name: 'Actions',
    width: '100px',
  },
];

// The business logic, how I see it, should make use of a React
// context located a level up, in the page component.
// It should handle theform data, state update and submit action.
// By doing so, you can place the submit button anyware, and be
// able to preview the invoice in a modal outside of this component.

export function InvoiceCreateForm() {
  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    navigate(paths['dashboard.invoices']);
  }, [navigate]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Customer</Typography>
          <Box sx={{ maxWidth: 'md' }}>
            <FormControl>
              <Input name="customer" placeholder="Find a customer" />
            </FormControl>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Payment</Typography>
          <Box sx={{ maxWidth: 'md' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Issue Date</FormLabel>
                  <Input defaultValue={dayjs().format('YYYY-MM-DD')} name="issueDate" type="date" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input defaultValue={dayjs().add(2, 'week').format('YYYY-MM-DD')} name="dueDate" type="date" />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Checkbox checked label="This is a recurring invoice" />
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Billing Cycle</FormLabel>
                  <Select defaultValue="monthly" name="billingCycle">
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Next Cycle Date</FormLabel>
                  <Input defaultValue={dayjs().add(1, 'month').format('YYYY-MM-DD')} name="startDate" type="date" />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl>
                  <FormLabel>Recipients</FormLabel>
                  <Input defaultValue="" name="recipients" placeholder="Add emails" />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Link fontSize="sm">Copy payment link</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Items</Typography>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <DataTable columns={lineItemColumns} rows={lineItems} stripe="even" sx={{ minWidth: '800px' }} />
          </Card>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                color="neutral"
                size="sm"
                startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                variant="outlined"
              >
                Add Item
              </Button>
            </Box>
            <Stack spacing={2}>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Subtotal</Typography>
                <Typography>$175.00</Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="sm">Taxes</Typography>
                <Typography>$35.00</Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize="lg">Total</Typography>
                <Typography level="h4">$210.00</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Additional Note</Typography>
          <Stack spacing={1} sx={{ maxWidth: 'md' }}>
            <FormControl>
              <Textarea maxRows={5} minRows={3} name="note" placeholder="" />
            </FormControl>
            <Typography level="body-sm">* This is a public note, it will appear on the invoice</Typography>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
