'use client';

import * as React from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { get_tenant_devices } from '@/reduxData/tenant/tenantAction';
import { useDispatch } from 'react-redux';
import { switch_to_original_account, switch_to_tenant } from '@/reduxData/user/userAction';
import { useNavigate } from 'react-router';

const environmentMapping = {
  dev: 'Development',
  qa: 'QA',
  prod: 'Production',
};

const Popup = styled(Popper)({
  maxWidth: '288px',
  width: '100%',
  zIndex: 'var(--joy-zIndex-popup)',
  height:'170px',
  overflowY:'scroll',
});





export function OrganizationsPopover({ anchorEl, onChange, onClose, open,onDataFromChild, organizations = [] }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleTenant = (data)=>{
    onDataFromChild(data)
    get_tenant_devices(dispatch,data?._id)
    if(data?.tenant_name=='Select an Option'){
      switch_to_original_account(dispatch,navigate)
      return
    }else{

      switch_to_tenant(data?._id,dispatch,navigate)
    }
  }

  return (
    <Popup
      anchorEl={anchorEl}
      disablePortal
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]}
      open={open}
      placement="bottom"
      role={undefined}
    >
      <ClickAwayListener onClickAway={() => onClose?.()}>
        <Sheet
          sx={{
            bgcolor: 'var(--joy-palette-neutral-800)',
            borderRadius: 'var(--joy-radius-sm)',
            boxShadow: 'var(--joy-shadow-lg)',
            color: 'var(--joy-palette-common-white)',
            p: 1,
          }}
        >
          <Stack divider={<Divider sx={{ bgcolor: 'var(--joy-palette-neutral-900)' }} />} spacing={1}>
            {organizations.map((organization) => {
              const environment = environmentMapping[organization.environment] ?? 'Unknown';

              return (
                <Box
                  key={organization._id}
                  onClick={() => {
                    onChange?.(organization._id);
                    onClose?.();
                  }}
                  role="button"
                  sx={{
                    borderRadius: 'var(--joy-radius-sm)',
                    cursor: 'pointer',
                    p: '8px 12px',
                    '&:hover': {
                      bgcolor: 'var(--joy-palette-neutral-900)',
                    },
                  }}
                >
                  <Typography level="title-sm" textColor="inherit" onClick={()=>handleTenant(organization)}>
                    {organization.tenant_name} 
                  </Typography>
                </Box>
              );
            })}
         
          </Stack>
        </Sheet>
      </ClickAwayListener>
    </Popup>
  );
}
