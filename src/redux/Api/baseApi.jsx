import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://138.197.37.38:5071',
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['overview'],
    endpoints: () => ({})
});


export const imageUrl = 'http://138.197.37.38:5071'