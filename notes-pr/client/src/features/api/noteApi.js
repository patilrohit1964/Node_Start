import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "multipart/form-data");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (formData) => ({
        url: "/api/note/add-note",
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      }),
    }),
    getNotes: builder.query({
      query: (userId) => ({
        url: `/api/note/all-notes/${userId}`,
        method: "GET",
      }),
      providesTags: ["Note"],
    }),
    getNoteDetails: builder.query({
      query: (noteId) => ({
        url: `/api/note/get-note/${noteId}`,
        method: "GET",
      }),
      providesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `/api/note/delete-note/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useGetNotesQuery,
  useGetNoteDetailsQuery,
  useDeleteNoteMutation,
} = noteApi;

export default noteApi;
