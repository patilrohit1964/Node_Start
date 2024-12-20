import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;

const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (noteData) => ({
        url: "/add-note",
        method: "POST",
        body: noteData,
      }),
    }),
    getNotes:builder.query({
        query:()=>({
            url:"/"
        })
    })
  }),
});

export const { useCreateNoteMutation } = noteApi;
export default noteApi;
