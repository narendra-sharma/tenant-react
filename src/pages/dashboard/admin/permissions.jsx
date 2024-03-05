import React, { useEffect, useState } from 'react';
import { get_permissions } from '@/reduxData/rootAction';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { Permissions } from '@/components/dashboard/admin/permissions';

const permissions = ({ permissions }) => {
  const [groups, setGroups] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setGroups([...permissions]);
  }, [permissions]);
  return (
    <main>
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
            {t('Permissions')}
          </Typography>
          <Breadcrumbs separator={<BreadcrumbsSeparator />}>
            <BreadcrumbsItem href={paths['dashboard']} type="start" />
            <BreadcrumbsItem href={paths['dashboard.admin']}>{t('Admin')}</BreadcrumbsItem>
            <BreadcrumbsItem type="end">{t('Permissions')}</BreadcrumbsItem>
          </Breadcrumbs>
          <Permissions groups={groups} />
        </Stack>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.user.permissions,
  };
};

export default connect(mapStateToProps)(permissions);
