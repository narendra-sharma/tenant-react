
import React,{ useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { DeviceTable } from '@/components/dashboard/admin/tenant-table';
import { Button } from '@mui/joy';
import { RouterLink } from '@/components/core/link';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { get_tenants } from '@/reduxData/rootAction';
import { connect, useDispatch } from 'react-redux';
import Grid from '@mui/joy/Grid';
import CustomPagination from '@/components/core/custom-pagination';

const Tenants = ({tenants,total}) => {
  const dispatch = useDispatch()
  const [tenant, setTenant] = useState(null);
  const [company, setCompany] = useState(null);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  useEffect(()=>{
    get_tenants(dispatch,page,limit,tenant,company,status);
  },[page,limit,tenant,company,status]);


  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && (+total>+tenants.length)) {
      setPage(page+1);
      get_tenants(dispatch,page+1,limit,tenant,company,status);
    }
  };
    const disableWindowScroll = () => {
      document.body.style.overflow = 'hidden';
      const elements = document.querySelectorAll('.body-pan');
      elements.forEach(element => {
        element.style.overflow = 'hidden';
      });
    };
    const enableWindowScroll = () => {
      document.body.style.overflow = 'auto';
      const elements = document.querySelectorAll('.body-pan');
      elements.forEach(element => {
        element.style.overflow = 'auto';
      });
    };
    useEffect(() => {
      disableWindowScroll();
      return () => {
        enableWindowScroll();
      };
    }, []);
  return (  
      <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
              Tennants
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <BreadcrumbsItem href={paths['dashboard']} type="start" />
              <BreadcrumbsItem href={paths['dashboard.admin']}>ADMIN</BreadcrumbsItem>
              <BreadcrumbsItem type="end">Tennants</BreadcrumbsItem>
            </Breadcrumbs>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button
              component={RouterLink}
              href={paths['dashboard.admin.create.tenant']}
              startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            >
              Create
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={3}  sx={{ alignvatId: 'BE0487248925start' }}>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Tenant Name</FormLabel>
              <Input defaultValue={tenant} name="tenant" 
                onChange={(e)=>window.setTimeout(() => {
                  setTenant(e.target.value)
                }, 1000)}
              />
            </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
          <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
            <FormLabel>Company Name</FormLabel>
            <Input defaultValue={company} name="company" 
              onChange={(e)=>window.setTimeout(() => {
                setCompany(e.target.value)
              }, 1000)}
            />
            </FormControl>
          </Grid>
          <Grid lg={4}  xl={4} xs={12}>
            <FormControl sx={{ maxWidth: '100%', width: '100%' }}>
              <FormLabel>Status</FormLabel>
              <select defaultValue={status} name="status" className="form-control" onChange={(e)=>setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </FormControl>
          </Grid>
        </Grid>
          <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
            <div  className="scroll-table-container" onScroll={handleScroll}>
              <DeviceTable rows={tenants} />
            </div>
          </Card>
       </Stack>
      </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    tenants: state.tenant.tenants,
    total: state.tenant.total,
  };
};

export default connect(mapStateToProps)(Tenants);