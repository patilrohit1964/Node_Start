import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";
import userApi from "../features/api/userApi";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
