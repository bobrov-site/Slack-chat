/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useSetHeaders from '../hooks';
import { apiPaths } from '../routes';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery(
    { baseUrl: apiPaths.origin(), prepareHeaders: useSetHeaders, tagTypes: ['Auth'] },
  ),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: '/login',
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: ({ username, password }) => ({
        method: 'POST',
        url: '/signup',
        body: { username, password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authApi;
