import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { DASHBOARD_DEVICES, DEVICE_READING, GET_DASHBOARD_DEVICES, GET_DEVICE, GET_DEVICES } from './deviceTypes';

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

export const get_devices = async (dispatch, page, limit, device, client, status,is_for_admin) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(
      `${url}admin/device_list?page=${page}&limit=${limit}${device ? '&device=' + device : ''}${
        client ? '&client=' + client : ''
      }${status ?'&status=' + status :''}${is_for_admin?'&is_for_admin=' + false:true}`,
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

export const create_devices = async (data, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.post(`${url}admin/add_device`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      navigate('../../../admin/devices')
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const update_device = async (data, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.put(`${url}admin/edit_device`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      navigate('../')
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_device_bySerialNumber = async (serialNumber,dispatch) => {
  dispatch(start_loading());
  try {
    const res = await axios.get(`${url}admin/device?serial_numer=${serialNumber}`);
    if (res?.data?.status) {
      dispatch({type:DASHBOARD_DEVICES , payload:res?.data})
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

export const update_device_renaming = async (data, dispatch,isSave) => {
  
  dispatch(start_loading());
  try {
    const res = await axios.put(`${url}admin/device_renaming`, data);
    if (res?.data?.status) {
      if(isSave){
        const currentTimestamp = new Date().getTime();
        localStorage.setItem('serial_number',data?.device_renaming)
        localStorage.setItem('timestamp', currentTimestamp.toString());
      }
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

export const get_single_device = async (id, dispatch) => {
  
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(`${url}admin/single_device?device_id=${id}`, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      dispatch({ type: GET_DEVICE, payload: res?.data.data });

    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_dashboard_devices = async (dispatch, page, limit, device, client, status)=>{
  dispatch(start_loading());
  try{
    headers.headers['x-access-token'] = token();
    const res = await axios.get(`${url}admin/dashboard?page=${page}&limit=${limit}${device ? '&device=' + device : ''}${
      client ? '&client=' + client : ''
    }${status ?'&status=' + status :''}`,headers);
    if(res?.data?.status){
      // toast.success(res?.data?.message);
      dispatch({type:DASHBOARD_DEVICES , payload:res?.data})
    }else {
      toast.error(res?.data?.message)
    }
    return res?.data?.device_data;
  }catch (error){
    dispatch(catch_errors_handle(error, dispatch));
  }finally{
    dispatch(stop_loading());
  }

}


export const get_today_device_reading = async (id, dispatch)=>{
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(
      `${url}admin/current_date_reading?serial_number=${id}`,
      headers
    );
    if (res?.data?.status) {
      dispatch({ type: DEVICE_READING, payload: res?.data });
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

export const get_dashboard_devices_reading = async (dispatch)=>{
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(
      `${url}admin/all_devices_weekly`,
      headers
    );
    if (res?.data?.status) {
      dispatch({ type: GET_DASHBOARD_DEVICES, payload: res?.data });
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

export const delete_devices = async (id,dispatch)=>{
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.delete(
      `${url}admin/remove_device/${id}`,
      headers
    );
    if (res?.data?.status) {
      toast.success(res?.data?.message)
      get_devices(dispatch)
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