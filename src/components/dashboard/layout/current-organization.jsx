'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { usePopover } from '@/hooks/use-popover';
import { Image } from '@/components/core/image';

import { OrganizationsPopover } from './organizations-popover';
import {  useDispatch, useSelector } from 'react-redux';
import { get_tenants } from '@/reduxData/rootAction';

export function CurrentOrganization() {
  const [tenants, setTenants] = React.useState()
  const dispatch= useDispatch()
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_tenants(dispatch);
        setTenants(data)
      } catch (error) {
      }
    };
  
    fetchData();
  }, []);
  const select = useSelector((state)=>state)
  const [organizationId, setOrganizationId] = React.useState('ORG-002');
  const popover = usePopover();


  const [dataFromChild, setDataFromChild] = React.useState(null);
const handleDataFromChild = (data) => {
  setDataFromChild(data);
};

  return (
    <React.Fragment>
      <Box
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          bgcolor: 'var(--joy-palette-neutral-900)',
          borderRadius: 'var(--joy-radius-sm)',
          color: 'var(--joy-palette-common-white)',
          cursor: 'pointer',
          p: '8px',
          '&:hover': {
            bgcolor: 'var(--joy-palette-neutral-800)',
          },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: 'var(--joy-palette-neutral-950)',
              borderRadius: 'var(--joy-radius-sm)',
              fontSize: 0,
              height: '40px',
              p: '8px',
              width: '40px',
              display:'none',
            }}
          >
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            {organization?.logo ? <Image alt="" height={24} src={organization.logo} width={24} style={{display:"none"}} /> : null}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize="xs" textColor="neutral.400">
              Tenant
=======
            {/* {organization?.logo ? <Image alt="" height={24} src={organization.logo} width={24} /> : null} */}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize="xs" textColor="neutral.400">
              {dataFromChild ? dataFromChild?.tenant_name:"Select Tenant" }
>>>>>>> Stashed changes
=======
            {/* {organization?.logo ? <Image alt="" height={24} src={organization.logo} width={24} /> : null} */}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize="xs" textColor="neutral.400">
              {dataFromChild ? dataFromChild?.tenant_name:"Select Tenant" }
>>>>>>> Stashed changes
            </Typography>
            <Typography fontSize="sm" fontWeight="md" textColor="inherit">
              {/* {organization?.name} */}
            </Typography>
          </Box>
          <CaretUpDownIcon fill="var(--joy-palette-neutral-400)" fontSize="var(--joy-fontSize-lg)" />
        </Stack>
      </Box>
      <OrganizationsPopover
        anchorEl={popover.anchorRef.current}
        onChange={setOrganizationId}
        onClose={popover.handleClose}
        open={popover.open}
        organizations={tenants}
        onDataFromChild={handleDataFromChild}
      />
    </React.Fragment>
  );
}

