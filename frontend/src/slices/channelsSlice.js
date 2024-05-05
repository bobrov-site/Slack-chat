import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';
import useSetHeaders from '../hooks';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery(
    { baseUrl: routes.channels(), prepareHeaders: useSetHeaders, tagTypes: ['Channels'] },
  ),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
} = channelsApi;
