import { GET_TENANTS, GET_TENANT_DEVICES } from './tenantTypes';

const initialState = {
  tenants: [],
  total: 0,
  selectedTenantDevices: null,
};

export const tenantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TENANTS:
      // const combinedArray = [...state.tenants, ...(action.payload?.data || [])];
      // const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
      return {
        ...state,
        tenants: action.payload?.data,
        total: action.payload?.total || 0,
      };

    case GET_TENANT_DEVICES:
      // const combinedArray = [...state.tenants, ...(action.payload?.data || [])];
      // const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
      return {
        selectedTenantDevices:action.payload ,
      };

    default:
      return state;
  }
};

export default tenantReducer;
