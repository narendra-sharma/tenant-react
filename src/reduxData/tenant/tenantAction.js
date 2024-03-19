import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_TENANTS, GET_TENANT_DEVICES} from './tenantTypes';

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

  export const get_tenants = async (dispatch,page,limit,tenant,company,status) => {
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.get(`${url}admin/tenant_list?page=${page}&limit=${limit}${tenant?'&tenant='+tenant:''}${company?'&company='+company:''}${status?'&status='+status:''}`, headers);
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

  export const create_tenant = async (data,dispatch,navigate) => {
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.post(`${url}admin/add_tenant`,data, headers);
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        navigate("../../../admin/tennants")
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

  export const delete_tenant = async (id,dispatch)=>{
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] = token();
      const res = await axios.delete(
        `${url}admin/remove_tenant/${id}`,
        headers
      );
      if (res?.data?.status) {
        toast.success(res?.data?.message)
        // dispatch({ type: GET_DASHBOARD_DEVICES, payload: res?.data });
        get_tenants(dispatch)
      } else {
        toast.error(res?.data?.message);
      }
      return res.data.data;
    } catch (error) {
      dispatch(catch_errors_handle(error, dispatch));
    } finally {
      dispatch(stop_loading());
    }
  }

  export const get_tenant_devices = async (dispatch,id) => {
    dispatch(start_loading());
    try {
      headers.headers['x-access-token'] =token();
      const res = await axios.get(`${url}admin/tenant_devices/${id}`, headers);
      if (res?.data?.status) {
        dispatch({ type: GET_TENANT_DEVICES, payload: res?.data?.data });
        // dispatch({ type: GET_TENANTS, payload: res?.data });
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