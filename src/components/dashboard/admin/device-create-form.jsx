'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function DeviceCreateForm() {
  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    navigate(paths['dashboard.admin.devices']);
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
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Device Name</FormLabel>
                  <Input defaultValue="" name="firstName"  type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Serial Number</FormLabel>
                  <Input defaultValue="" name="serailNumber"   type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Client First Name</FormLabel>
                  <Input defaultValue="" name="cfirstName" type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Client Last Name</FormLabel>
                  <Input defaultValue="" name="clastName" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
              <FormControl>
                    <FormLabel>Tenant</FormLabel>
                    <Select defaultValue="" name="tenant1" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} >
                      <Option value="">Tenant 1</Option>
                      <Option value="ca">Tenant 2</Option>
                      <Option value="uk">Tenant 3</Option>
                  
                    </Select>
                  </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue="" name="tenant2" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} >
                      <Option value="">Publish to Tenant</Option>
                      <Option value="ca">Publish to user</Option>
                    
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.devices']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Create Device</Button>
        </Stack>
      </Stack>
      
    </form>
  );
}
