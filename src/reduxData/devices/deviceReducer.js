import { GET_DEVICES } from "./deviceTypes"; 

const initialState = {
    devices: [],
    total:0
  };

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEVICES:
        return {
          ...state,
          devices: action.payload?.data,
          total:action.payload?.total || 0
        };
      
      default:
        return state;
    }
  };
  
  export default deviceReducer;