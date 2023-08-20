import config from "@/config";
import paramsSerializerUtils from "@/utils/paramsSerializer.utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const usersRTKProvider = createApi({
    reducerPath: 'usersRTKProvider',

    baseQuery: fetchBaseQuery({
        baseUrl: `${config.api.url}`,
        credentials: "same-origin",
        paramsSerializer(params) {
            return paramsSerializerUtils(params);
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (username) => `/users/${username}`
        }),
        getRepos: builder.query({
            query: (username) => `/users/${username}/repos`
        }),
        getEvents: builder.query({
            query: (username) => `/users/${username}/received_events`
        }),

    })
})

export const {
    useGetReposQuery,
    useGetEventsQuery,
    useGetUserQuery } = usersRTKProvider
