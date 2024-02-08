import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_TENANTS} from './tenantTypes';

const url = import.meta.env.VITE_API_URL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':localStorage.getItem('custom-auth-token')

  },
};
const token =()=>{
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

  export const get_tenants = async (dispatch) => {
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.get(`${url}admin/tenant_list`, headers);
      if (res?.data?.status) {
        dispatch({ type: GET_TENANTS, payload: res?.data });
      } else {
        toast.error(res?.data?.message);
      }
      return res.data.data
    } catch (error) {
      dispatch(catch_errors_handle(error, dispatch));
    } finally {
      dispatch(stop_loading());
    }
  };

  export const create_tenant = async (data,dispatch) => {
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.post(`${url}admin/add_tenant`,data, headers);
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

  export const update_tenant = async (data,dispatch)=>{
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.put(`${url}admin/edit_tenant`,data, headers);
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        get_tenants(dispatch)
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch(catch_errors_handle(error, dispatch));
    } finally {
      dispatch(stop_loading());
    }
  }