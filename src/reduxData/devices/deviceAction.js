import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_DEVICES } from './deviceTypes';

const url = import.meta.env.VITE_API_URL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('custom-auth-token'),
  },
};
const token = () => {
  return localStorage.getItem('custom-auth-token');
};

export const catch_errors_handle = (error, dispatch) => {
  if (error.response) {
    toast.error(error.response.data.message || error.response.data.error);
    if (error.response.status === 401) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('custom-auth-token');
      dispatch(set_update_user(''));
    }
  } else {
    toast.error(error.message);
  }
};

export const get_devices = async (dispatch, page, limit, device, client, status) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(
      `${url}admin/device_list?page=${page}&limit=${limit}${device ? '&device=' + device : ''}${
        client ? '&client=' + client : ''
      }${status == 'online' ? '&status=' + true :status == 'offline'? '&status=' + false :''}`,
      headers
    );
    if (res?.data?.status) {
      dispatch({ type: GET_DEVICES, payload: res?.data });
    } else {
      toast.error(res?.data?.message);
    }
    return res.data.data;
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const create_devices = async (data, dispatch) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.post(`${url}admin/add_device`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const update_device = async (data, dispatch) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.put(`${url}admin/edit_device`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
