'use client';

import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { useModal } from '@/hooks/use-modal';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { OrderCreateModal } from '@/components/dashboard/order/order-create-modal';
import { OrdersPagination } from '@/components/dashboard/order/orders-pagination';
import { OrdersSummary } from '@/components/dashboard/order/orders-summary';
import { OrdersTable } from '@/components/dashboard/order/orders-table';

const metadata = {
  title: `List | Orders | Dashboard | ${config.site.name}`,
};

const orders = [
  {
    id: 'ORD-005',
    createdAt: dayjs().subtract(1, 'day').valueOf(),
    customerAvatar: '/assets/avatar-1.png',
    customerName: 'Zaid Schwartz',
    customerEmail: 'zaid.schwartz@domain.com',
    items: 1,
    amount: '$600.00',
    status: 'pending',
  },
  {
    id: 'ORD-004',
    createdAt: dayjs().subtract(1, 'day').valueOf(),
    customerAvatar: '/assets/avatar-3.png',
    customerName: 'Ammar Foley',
    customerEmail: 'ammar.foley@domain.com',
    items: 2,
    amount: '$240.00',
    status: 'completed',
  },
  {
    id: 'ORD-002',
    createdAt: dayjs().subtract(3, 'day').subtract(3, 'hour').valueOf(),
    customerAvatar: '/assets/avatar-7.png',
    customerName: 'Julius Vaughan',
    customerEmail: 'julius.vaughan@domain.com',
    items: 1,
    amount: '$56.24',
    status: 'completed',
  },
  {
    id: 'ORD-003',
    createdAt: dayjs().subtract(3, 'day').valueOf(),
    customerAvatar: '/assets/avatar-4.png',
    customerName: 'Pippa Wilkinson',
    customerEmail: 'pippa.wilkinson@domain.com',
    items: 1,
    amount: '$14.99',
    status: 'completed',
  },
  {
    id: 'ORD-001',
    createdAt: dayjs().subtract(2, 'day').valueOf(),
    customerAvatar: '/assets/avatar-6.png',
    customerName: 'Mathilde Lewis',
    customerEmail: 'mathilde.lewis@domain.com',
    items: 3,
    amount: '$432.09',
    status: 'canceled',
  },
];

export function Page() {
  const createModal = useModal();

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                  Orders
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem type="end">Orders</BreadcrumbsItem>
                </Breadcrumbs>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Button
                  color="neutral"
                  startDecorator={<PrinterIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                  variant="outlined"
                >
                  Download
                </Button>
                <Button
                  onClick={createModal.handleOpen}
                  startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
            <OrdersSummary active={268} canceled={4} completed={623} total={891} />
            <Stack direction={{ md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <FormControl sx={{ maxWidth: '240px', mr: 'auto', width: '100%' }}>
                <FormLabel>Order ID</FormLabel>
                <Input defaultValue="" name="orderId" />
              </FormControl>
              <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
                <FormLabel>Status</FormLabel>
                <Select defaultValue="all" name="status">
                  <Option value="all">All</Option>
                  <Option value="active">Active</Option>
                  <Option value="canceled">Canceled</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </FormControl>
              <FormControl sx={{ maxWidth: '240px', width: '100%' }}>
                <FormLabel>Customer</FormLabel>
                <Input defaultValue="" name="customer" />
              </FormControl>
            </Stack>
            <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
              <OrdersTable rows={orders} />
            </Card>
            <OrdersPagination />
          </Stack>
        </Container>
      </main>
      <OrderCreateModal onClose={createModal.handleClose} open={createModal.open} />
    </React.Fragment>
  );
}
