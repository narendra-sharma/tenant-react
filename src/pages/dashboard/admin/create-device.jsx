import React from 'react'

import { Permissions } from '@/components/dashboard/admin/permissions';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Container from '@mui/joy/Container';

const createdevice = () => {
    return (  
        <Container maxWidth={false} sx={{ py: 3 }}>
           <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
            Devices
          </Typography>
          </Stack>
        </Container>
    );
}
export default createdevice;