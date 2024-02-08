import { GET_TENANTS } from "./tenantTypes";

const initialState = {
    tenants: [],
    total:0
  };

export const tenantReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TENANTS:
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