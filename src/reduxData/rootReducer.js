import { combineReducers } from 'redux';
import loaderReducer from "./Loader/loaderReducer";
import userReducer from './user/useReducer';
import tenantReducer from './tenant/tenantReducer';

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  tenant:tenantReducer,
});

export default rootReducer;
