import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";
import authSlice from "../features/authSlice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
