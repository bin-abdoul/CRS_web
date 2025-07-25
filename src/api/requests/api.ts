import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const backendUrl = "https://climatereportsystemapi-production.up.railway.app"
const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Incoming Messages"],
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});
