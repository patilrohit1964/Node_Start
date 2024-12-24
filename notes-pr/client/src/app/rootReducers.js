import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userApi from "../features/api/userApi";
import noteApi from "../features/api/noteApi";
import adminApi from "../features/api/adminApi";
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  authReducer,
});

export default rootReducer;
