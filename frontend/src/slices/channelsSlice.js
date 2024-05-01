import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: routes.channels() }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetChannelsQuery,
} = channelsApi;
