import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";
import userApi from "../features/api/userApi";
import noteApi from "../features/api/noteApi";
import adminApi from "../features/api/adminApi";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      noteApi.middleware,
      adminApi.middleware
    ),
});

export default store;
