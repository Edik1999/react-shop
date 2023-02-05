import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGoods } from "../../models/models";

export const mockAPI = createApi({
    reducerPath: 'mockAPI/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://63df9b608b24964ae0f09892.mockapi.io/'
    }),
    endpoints: build => ({
        getGoods: build.query<IGoods, String>({
            query: (get: string) => ({
                url: 'goods',
                params: {}
            })
        })
    })
})

export const {useGetGoodsQuery} = mockAPI