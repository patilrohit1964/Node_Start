import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
  tagTypes: ["Users", "AdminNotes"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/admin/all-users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/admin/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/api/admin/update-user/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/api/admin/add-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllNotes: builder.query({
      query: () => ({
        url: "/api/admin/all-notes",
        method: "GET",
      }),
      invalidatesTags: ["AdminNotes"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useAddUserMutation,
  useGetAllNotesQuery,
} = adminApi;

export default adminApi;
