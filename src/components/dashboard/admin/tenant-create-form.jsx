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
import Chip from '@mui/joy/Chip';

export function TenantCreateForm() {
  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    navigate(paths['dashboard.admin.tenants']);
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
          <Typography level="h4">Account Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Name</FormLabel>
                  <Input defaultValue="" name="companyName" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Tenant Name</FormLabel>
                  <Input defaultValue="" name="tenantName" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Company Email</FormLabel>
                  <Input defaultValue="" name="cfirstName" type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Phone Number</FormLabel>
                  <Input defaultValue="" name="phoneNumber" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                   <FormLabel>TAX ID</FormLabel>
                   <Input defaultValue="" name="taxId" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input  name="website"
                    startDecorator={
                      <Chip size="sm" variant="soft">
                        www.
                      </Chip>
                    }
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    
                  />
                 
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Address
          </Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select defaultValue="" name="country">
                    <Option value="">Choose a country</Option>
                    <Option value="ca">Canada</Option>
                    <Option value="uk">United Kingdom</Option>
                    <Option value="us">United States</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input defaultValue="" name="city" type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Zip Code</FormLabel>
                  <Input defaultValue="" name="zip" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
           
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Settings Database
          </Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Endpoint URI</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                 
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Key</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Azure Cosmos DB Database Name</FormLabel>
                  <Input defaultValue="" name="city" type="text"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Water</FormLabel>
                  <Input defaultValue="" name="zip" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partition Key Path Water</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Electricityr</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partition Key Path Electricity</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
           
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Settings Timeframe Meters
          </Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>Watermeters Timeframe (Seconds)</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                 
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Electricitymeters Timeframe (Seconds)</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              
            </Grid>
          </Box>
        </Stack>
        
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.tenants']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Create Device</Button>
        </Stack>
      </Stack>
      
    </form>
  );
}
