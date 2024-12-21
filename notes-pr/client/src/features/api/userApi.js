import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/user/register",
        method: "post",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/api/user/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // Store the entire auth data including token
          dispatch(
            userLoggedIn({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
            })
          );
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;

export default userApi;
