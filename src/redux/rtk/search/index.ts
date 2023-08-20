


import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const searchRTKProvider = createApi({
    reducerPath: "search",
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.api.url}`,
        credentials: "same-origin",
    }),
    endpoints(builder) {
        return {
            searchUsers: builder.query({
                query: ({ data, offset }) => ({
                    url: `/search/users?q=${data}&per_page=${15}&page=${offset}`,
                    method: "GET",
                }),
            }),
            searchRepositories: builder.query({
                query: ({ data, offset }) => ({
                    url: `/search/repositories?q=${data}&per_page=${15}&page=${offset}`,
                    method: "GET",
                }),
            }),
        };
    }
});

export const {  useLazySearchRepositoriesQuery,
 useLazySearchUsersQuery,
} = searchRTKProvider;

