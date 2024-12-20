import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
console.log(BASE_URL);
const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => {
    registerUser: builder.mutation({
      query: (userData) => ({
        url:"/api/user/"
      }),
    });
  },
});
