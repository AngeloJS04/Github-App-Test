import config from "@/config";
import paramsSerializerUtils from "@/utils/paramsSerializer.utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RepositoryProps } from "../users/user.interface";
import { MeI } from "./me.interface";


// use localstorage into header
const token = localStorage.getItem("auth-token");


export const userRTKProvider = createApi({
    reducerPath: "me",
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.api.url}`,
        credentials: "same-origin",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
        }
        ,
        paramsSerializer(params) {
            return paramsSerializerUtils(params);
        },
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getMe: builder.query<MeI, object>({

            query: () => ({
                url: "/user",
                method: "GET",
            }),

            transformResponse: (res: MeI) => {
                return res;
            },
            transformErrorResponse(baseQueryReturnValue) {
                return baseQueryReturnValue.data;
            }
        }),
        getRepostories: builder.query<RepositoryProps, object>({
            query: () => ({
                url: "/user/repos",
                method: "GET",
            }),
        }),
    }),
});


export const { useGetMeQuery,
    useGetRepostoriesQuery,
} = userRTKProvider;