import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userApi from "../features/api/userApi";
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  authReducer,
});

export default rootReducer;
