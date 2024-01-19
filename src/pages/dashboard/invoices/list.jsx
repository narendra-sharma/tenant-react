import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { InvoicesFiltersButton } from '@/components/dashboard/invoice/invoices-filters-button';
import { InvoicesFiltersCard } from '@/components/dashboard/invoice/invoices-filters-card';
import { InvoicesPagination } from '@/components/dashboard/invoice/invoices-pagination';
import { InvoicesSummary } from '@/components/dashboard/invoice/invoices-summary';
import { InvoicesTable } from '@/components/dashboard/invoice/invoices-table';

const metadata = {
  title: `List | Invoices | Dashboard | ${config.site.name}`,
};

const invoices = [
  {
    id: 'INV-005',
    status: 'draft',
    customerAvatar: '/assets/avatar-1.png',
    customerName: 'Zaid Schwartz',
    customerEmail: 'zaid.schwartz@domain.com',
    issueDate: '28 Jul 2023',
    dueDate: '14 Aug 2023',
    amount: '$99.00',
  },
  {
    id: 'INV-004',
    status: 'pending',
    customerAvatar: '/assets/avatar-5.png',
    customerName: 'Olly Schroeder',
    customerEmail: 'olly.schroeder@domain.com',
    issueDate: '17 Jul 2023',
    dueDate: '01 Aug 2023',
    amount: '$192.00',
  },
  {
    id: 'INV-003',
    status: 'late',
    customerAvatar: '/assets/avatar-3.png',
    customerName: 'Ammar Foley',
    customerEmail: 'ammar.foley@domain.com',
    issueDate: '05 Jun 2023',
    dueDate: '19 Jun 2023',
    amount: '$41.40',
  },
  {
    id: 'INV-002',
    status: 'paid',
    customerAvatar: '/assets/avatar-4.png',
    customerName: 'Pippa Wilkinson',
    customerEmail: 'pippa.wilkinson@domain.com',
    issueDate: '05 Jun 2023',
    dueDate: '19 Jun 2023',
    amount: '$52.86',
  },
  {
    id: 'INV-001',
    status: 'canceled',
    customerAvatar: '/assets/avatar-2.png',
    customerName: 'sienna.hewitt@domain.com',
    customerEmail: 'Sienna Hewitt',
    issueDate: '01 Jun 2023',
    dueDate: '15 Jun 2023',
    amount: '$432.09',
  },
];

export function Page() {
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
                  Invoices
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem type="end">Invoices</BreadcrumbsItem>
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
                  component={RouterLink}
                  href={paths['dashboard.invoices.create']}
                  startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  lg: '340px 1fr',
                },
              }}
            >
              <InvoicesFiltersCard />
              <Stack spacing={3} sx={{ overflow: 'hidden' }}>
                <InvoicesSummary
                  draft={4}
                  draftAmount="$4,521.64"
                  due={12}
                  dueAmount="$3,081.18"
                  invoiced={76}
                  invoicedAmount="$75,189.08"
                  paid={64}
                  paidAmount="$72,104.90"
                />
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                  <Stack sx={{ alignItems: 'flex-start', flexGrow: 1 }}>
                    <Tabs size="sm" value="all" variant="custom">
                      <TabList>
                        <Tab value="all">All</Tab>
                        <Tab value="paid">Paid</Tab>
                      </TabList>
                    </Tabs>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <InvoicesFiltersButton />
                  </Stack>
                </Stack>
                <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                  <InvoicesTable rows={invoices} />
                </Card>
                <InvoicesPagination />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
