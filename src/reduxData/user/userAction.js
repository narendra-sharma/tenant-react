import axios from 'axios';

import { LOG_OUT, SET_USER_TYPE } from './userTypes';

export const Logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const catchErrors = (error, dispatch) => {
  if (error.response) {
    // add the toast with error message here
  } else {
    // add toast with error message
  }
};

export const Signup = async (user, role, navigate, dispatch) => {
  // start loading dispatch
  console.log('Started diapatch');
  try {
    const url = 'dummyurl.com';
    const Headers = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const res = await axios.post(url, user, Headers);
    if (res?.data?.status) {
      // send a toast success message
      navigate('/login');
    }
  } catch (error) {}
};

export const login = async (user, role, dispatch) => {
  role = role.toLowerCase();
  role = role.replace(' ', '');
  try {
    const url = 'dummyUrl';
    const Headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(url, user, Headers);
    if (res?.data?.status) {
      // show success toast message
    } else {
      // show error message
    }
  } catch (error) {}
};
export const set_user_type = (usertype) => {
  return {
    type: SET_USER_TYPE,
    payload: usertype,
  };
};
