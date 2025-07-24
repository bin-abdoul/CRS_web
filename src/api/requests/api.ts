import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const backendUrl = "http://localhost:3000";
// const backendUrl = "https://5h046r87-3000.uks1.devtunnels.ms";
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
