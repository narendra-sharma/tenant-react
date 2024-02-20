import { GET_TENANTS } from "./tenantTypes";

const initialState = {
    tenants: [],
    total:0
  };

export const tenantReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TENANTS:
        // const combinedArray = [...state.tenants, ...(action.payload?.data || [])];
        // const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
        return {
          ...state,
          tenants: action.payload?.data,
          total:action.payload?.total || 0
        };
      
      default:
        return state;
    }
  };
  
  export default tenantReducer;