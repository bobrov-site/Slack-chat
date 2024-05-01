import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';
import useSetHeaders from '../hooks';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery(
    { baseUrl: routes.channels(), prepareHeaders: useSetHeaders },
  ),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetChannelsQuery,
} = channelsApi;
