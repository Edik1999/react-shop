import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mockAPI = createApi({
    reducerPath: 'mockAPI/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://63df9b608b24964ae0f09892.mockapi.io/'
    }),
    endpoints: build => ({
        getGoods: build.query<any, String>({
            query: () => 'goods',
        }),
        getSingleGood: build.query<any, String>({
            query: (id) => `goods?id=${id}`,
        })
    }),
})


export const {useGetGoodsQuery, useGetSingleGoodQuery} = mockAPI