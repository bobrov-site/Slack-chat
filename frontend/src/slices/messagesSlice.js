import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';
import useSetHeaders from '../hooks';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery(
    { baseUrl: routes.messages(), prepareHeaders: useSetHeaders, tagTypes: ['Messages'] },
  ),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messagesApi;
