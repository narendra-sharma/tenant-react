import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { Logo } from '@/components/core/logo';
import { LineItemsTable } from '@/components/dashboard/invoice/line-items-table';

const metadata = {
  title: `Details | Invoices | Dashboard | ${config.site.name}`,
};

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
                  Invoice Details
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <BreadcrumbsItem href={paths['dashboard']} type="start" />
                  <BreadcrumbsItem href={paths['dashboard.invoices']}>Invoices</BreadcrumbsItem>
                  <BreadcrumbsItem type="end">Details</BreadcrumbsItem>
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
                  color="primary"
                  startDecorator={<PaperPlaneTiltIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                  variant="solid"
                >
                  Send Invoice
                </Button>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                spacing={2}
                sx={{
                  alignItems: {
                    sm: 'flex-start',
                  },
                }}
              >
                <Stack spacing={3} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: 'var(--joy-palette-primary-solidBg)',
                        borderRadius: 'var(--joy-radius-sm)',
                        color: 'var(--joy-palette-primary-solidColor)',
                        display: 'flex',
                        height: '48px',
                        justifyContent: 'center',
                        width: '48px',
                      }}
                    >
                      <Logo color="light" height={32} width={32} />
                    </Box>
                    <div>
                      <Typography fontSize="xl" fontWeight="xl" lineHeight="sm">
                        {config.site.name}
                      </Typography>
                      <Typography level="body-sm">contact@domain.com</Typography>
                    </div>
                  </Stack>
                  <Typography fontSize="sm">
                    4601 Cambridge Place
                    <br />
                    Baltimore, Maryland
                    <br />
                    United States, 21218
                  </Typography>
                </Stack>
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Chip color="success" variant="soft">
                    Paid
                  </Chip>
                  <Typography level="h4">INV-001</Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: {
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                }}
              >
                <Stack spacing={1}>
                  <Typography fontSize="xs" fontWeight="bold" textColor="text.primary" textTransform="uppercase">
                    Customer Details
                  </Typography>
                  <Typography fontSize="sm">
                    Zaid Schwartz <br />
                    zaid.schwartz@domain.com <br />
                    (801) 301-7140
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography fontSize="xs" fontWeight="bold" textColor="text.primary" textTransform="uppercase">
                    Billing Address
                  </Typography>
                  <Typography fontSize="sm">
                    3794 Broaddus Avenue, Louisville, <br /> Kentucky, United States, 4020
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography fontSize="xs" fontWeight="bold" textColor="text.primary" textTransform="uppercase">
                    Issue Date
                  </Typography>
                  <Typography fontSize="sm">{dayjs().format('MMMM D, YYYY')}</Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography fontSize="xs" fontWeight="bold" textColor="text.primary" textTransform="uppercase">
                    Due Date
                  </Typography>
                  <Typography fontSize="sm">{dayjs().add(30, 'day').format('MMMM D, YYYY')}</Typography>
                </Stack>
              </Box>
              <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
                <LineItemsTable
                  rows={[
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
                  ]}
                />
              </Card>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Subtotal</Typography>
                  </Box>
                  <Typography>$730</Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Tax</Typography>
                  </Box>
                  <Typography>$20</Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Shipping</Typography>
                    <Typography level="body-sm">via FedEx International</Typography>
                  </Box>
                  <Typography>$25</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography level="h4">Total</Typography>
                  </Box>
                  <Typography level="h4">$775</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
