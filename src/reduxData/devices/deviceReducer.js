import { GET_DEVICES } from "./deviceTypes"; 

const initialState = {
    devices: [],
    total:0
  };

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEVICES:
        const combinedArray = [...state.devices, ...(action.payload?.data || [])];
        const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
        return {
          ...state,
          devices: uniqueArray,
          total:action.payload?.total || 0
        };
      
      default:
        return state;
    }
  };
  
  export default deviceReducer;