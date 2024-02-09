import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_TENANTS } from './tenantTypes';

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


