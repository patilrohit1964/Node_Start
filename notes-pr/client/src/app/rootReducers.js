import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
