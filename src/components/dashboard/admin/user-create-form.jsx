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

export function UserCreateForm() {
  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    navigate(paths['dashboard.admin.user']);
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
                  <FormLabel>First Name</FormLabel>
                  <Input defaultValue="" name="firstName"  type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input defaultValue="" name="lastNumber"   type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue="" name="email" type="email"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input defaultValue="" name="phoneNumber" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
              <FormControl>
                    <FormLabel>Tenant(s)</FormLabel>
                    <Select defaultValue="" name="tenant1" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} >
                      <Option value="">Tenant 1</Option>
                      <Option value="">Tenant 2</Option>
                      <Option value="">Tenant 3</Option>
                  
                    </Select>
                  </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                    <FormLabel>Permision</FormLabel>
                    <Select defaultValue="" name="permission" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} >
                      <Option value="">Tenant Manager</Option>
                      <Option value="">Tenant User</Option>
                      <Option value="">Tenant</Option>
                  
                    
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.user']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Create Device</Button>
        </Stack>
      </Stack>
      
    </form>
  );
}
