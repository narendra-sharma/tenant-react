import { DASHBOARD_DEVICES, GET_DEVICE, GET_DEVICES } from "./deviceTypes"; 

const initialState = {
    devices: [],
    total:0,
    device:null,
    dashboardDevices:null
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
      
        case GET_DEVICE:
          return {
            ...state,
            device: action.payload,
          };
        
        case DASHBOARD_DEVICES:
          return {
            ...state,
            dashboardDevices:action.payload
          }

      default:
        return state;
    }
  };
  
  export default deviceReducer;