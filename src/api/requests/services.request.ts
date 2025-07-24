import { api } from "./api";

interface Messages {
  _id: string;
  linkId: string;
  text: string;
  to: string;
  id: string;
  date: string;
  from: string;
  language: string;
  translatedText: string;
  receivedAt: string;
  location: string;
  issueType: string;
  alertLevel: string;
  similarReports: number;
  lat: number | null | undefined;
  lng: number | null | undefined;
  display_name: string | null | undefined;
}
interface GroupedReports {
  location: string;
  issueType: string;
  count: number;
  reports: Messages[];
}


export const servicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Messages[], string>({
      query: () => ({
        url: "/services/messages",
        method: "GET",
      }),
      providesTags: ["Incoming Messages"],
    }),
    getGroupedReports: builder.query<GroupedReports[], void>({
      query: () => ({
        url: "/services/grouped-reports",
        method: "GET",
      }),
      providesTags: ["Incoming Messages"],
    }),
  }),
});

export const { useGetMessagesQuery , useGetGroupedReportsQuery} = servicesApi;
