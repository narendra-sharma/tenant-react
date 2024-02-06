import React, { useEffect, useState } from 'react'

import { Permissions } from '@/components/dashboard/admin/permissions';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { paths } from '@/paths';
import Container from '@mui/joy/Container';
import { connect, useDispatch, useSelector } from 'react-redux';
import { get_permissions } from '@/reduxData/rootAction';
const permissions = ({permissions}) => {

  const [groups, setGroups]= useState([]);
  const dispatch = useDispatch()
  useEffect(()=>{
    get_permissions(dispatch)
  },[])
  useEffect(()=>{
   setGroups([...permissions]);
  },[permissions])
  return (
    <main>
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
          Permissions
          </Typography>
          <Breadcrumbs separator={<BreadcrumbsSeparator />}>
            <BreadcrumbsItem href={paths['dashboard']} type="start" />
            <BreadcrumbsItem href={paths['dashboard.admin']}>Admin</BreadcrumbsItem>
            <BreadcrumbsItem type="end">Permissions</BreadcrumbsItem>
          </Breadcrumbs>
          <Permissions groups={groups} />
        </Stack>
      </Container>
    </main>

  )
}

const mapStateToProps = (state) => {
  return {
    permissions: state.user.permissions,
  };
};

export default connect(mapStateToProps)(permissions);