import React, { useEffect, useState } from 'react';
import {
  get_device_bySerialNumber,
  get_single_device,
  get_today_device_reading,
  update_device,
} from '@/reduxData/devices/deviceAction';
import { FormControl } from '@mui/base';
import { Avatar, Button, Divider, FormHelperText, FormLabel, Grid, Table, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import { Box, Stack, textTransform } from '@mui/system';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { MeterGraph } from './meterGraph';

const DeviceData = ({ deviceData, todaysReading }) => {
  const dispatch = useDispatch();
  const { tenantId } = useParams();
  const serialNumber = tenantId;
  React.useEffect(() => {
    if (serialNumber) {
      get_device_bySerialNumber(serialNumber, dispatch);
      get_today_device_reading(serialNumber, dispatch);
    }
  }, [serialNumber]);
  const [device, setDevice] = React.useState({
    device_name: deviceData?.device_name,
    client_first_name: deviceData?.client_firstname,
    client_last_name: deviceData?.client_lastname,
    serial_number: deviceData?.serial_number,
    water_reading: deviceData?.meter_type == 'water' ? deviceData?.last_reading : '',
    electricity_reading: deviceData?.meter_type == 'electricity' ? deviceData?.last_reading : '',
  });

  useEffect(() => {
    setDevice({
      device_name: deviceData?.device_name,
      client_first_name: deviceData?.client_firstname,
      client_last_name: deviceData?.client_lastname,
      serial_number: deviceData?.serial_number,
      water_reading: deviceData?.meter_type == 'water' ? deviceData?.last_reading : '',
      electricity_reading: deviceData?.meter_type == 'electricity' ? deviceData?.last_reading : '',
    });
  }, [deviceData]);

  const [errors, setErrors] = React.useState({
    device_name: '',
    client_first_name: '',
    client_last_name: '',
  });
  const navigate = useNavigate();
  const handleElementChange = (value, label) => {
    setDevice((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]: !value ? 'required' : '',
    }));
  };

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(device);
    output.forEach(([key, value]) => {
      if (!value && key != 'electricity_reading' && key != 'water_reading') {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      }
    });
    return err;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkAllErrors()) {
      return;
    }
    let data = deviceData;
    data.client_firstname = device.client_first_name;
    data.client_lastname = device.client_last_name;
    data.device_name = device.device_name;
    data.serial_number = serialNumber;
    delete data.key2;
    update_device(data, dispatch, navigate);
    // navigate('/devices')
  };

  const convertDateFormat= (data)=>{
    const originalDate = new Date(data);
    return `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate.getFullYear()} - ${originalDate.getHours()}:${originalDate.getMinutes()}`;
  }

  return (
    <Box padding={3}>
      <Stack direction="row" padding={3} sx={{ alignItems: 'center' }}>
        <Box sx={{ '--Avatar-size': '120px', position: 'relative', marginRight: '10px' }}>
          <Avatar src="">{`${deviceData && deviceData?.client_firstname[0]}${
            deviceData && deviceData?.client_lastname[0]
          }`}</Avatar>
        </Box>
        <div style={{ textTransform: 'capitalize' }}>
          <Typography level="h4">{deviceData?.device_name}</Typography>
          <Typography level="body-sm">{deviceData?.tenant_ids[0]?.company_name}</Typography>
        </div>
      </Stack>

      <Stack component="main" divider={<Divider />} padding={3}>
        {/* <Typography level="h4">My details</Typography> */}
        <Box sx={{ maxWidth: 'lg', alignItems: 'center' }}>
          <form>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl value={device?.device_name || ''}>
                  <FormLabel>Device Name</FormLabel>
                  <Input
                    name="device_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'device_name')}
                  />
                  {errors.device_name && (
                    <FormHelperText style={{ color: 'red' }}>Device Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl disabled={true} value={deviceData?.serial_number || ''}>
                  <FormLabel>Serial Number</FormLabel>
                  <Input
                    value={deviceData?.serial_number}
                    name="serial_number"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl value={device?.client_first_name || ''}>
                  <FormLabel>Client First Name</FormLabel>
                  <Input
                    name="client_first_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'client_first_name')}
                  />
                  {errors.client_first_name && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.client_first_name && 'Client first name is invalid.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl value={device?.client_last_name || ''}>
                  <FormLabel>Client Last Name</FormLabel>
                  <Input
                    name="client_last_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'client_last_name')}
                  />
                  {errors.client_last_name && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.client_last_name && 'Client last name is invalid.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl disabled={true} value={device.water_reading || ''}>
                  <FormLabel>Last Reading Water (Liters)</FormLabel>
                  <Input name="water_reading" type="text" style={{ borderColor: '#EAEEF6', fontSize: '14px' }} />
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl disabled={true} value={device.electricity_reading || ''}>
                  <FormLabel>Last Reading Electricity (kWh)</FormLabel>
                  <Input name="" type="text" disabled={true} style={{ borderColor: '#EAEEF6', fontSize: '14px' }} />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Stack>
      <Stack direction="row" padding={3} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
          Discard
        </Button>
        <Button onClick={(event) => handleSubmit(event)}>Save Changes</Button>
      </Stack>

      <h3>
        Overview <span style={{ textTransform: 'capitalize' }}>{deviceData?.meter_type}</span> Usage
      </h3>
      <Grid container spacing={3} mt={3}>
        <Grid md={6} xs={12}>
          <table style={{border:'1px solid white', padding:'12px',borderRadius:'10px'}}>
            <thead>
              <tr>
                <th>
                  Date Reading <span style={{ textTransform: 'capitalize' }}>{deviceData?.meter_type}</span>
                </th>
                <th>
                  Reading <span style={{ textTransform: 'capitalize' }}>{deviceData?.meter_type}</span>{' '}
                  {deviceData?.meter_type == 'electricity' ? '(kWh)' : '(Liters)'}
                </th>
              </tr>
            </thead>
            <tbody>
              {todaysReading && todaysReading.length > 0 ? (
                todaysReading.map((reading) => (
                  <tr key={reading?._id}>
                    <td>{convertDateFormat(reading?.updatedAt)}</td>
                    <td>{reading?.last_reading}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No readings available for today</td>
                </tr>
              )}
            </tbody>
          </table>
        </Grid>
        <Grid md={6} xs={12}>
          <MeterGraph
            data={todaysReading}
            expenses="$57,139"
            expensesDiff="11"
            expensesTrend="down"
            income="$309,761"
            incomeDiff="14"
            incomeTrend="up"
            label={`${deviceData?.meter_type.charAt(0).toUpperCase() + deviceData?.meter_type.slice(1)} Usage ${deviceData?.meter_type=='water'?'(Liters)': '(kWh)'}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    deviceData: state.device.dashboardDevices?.data,
    todaysReading: state.device.deviceTodayReading,
  };
};

export default connect(mapStateToProps)(DeviceData);
