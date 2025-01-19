import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://backend.swiftswapp.com',
    // baseUrl: 'http://10.0.60.37:5071/',
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


// export const imageUrl = 'http://10.0.60.37:5071/'
export const imageUrl = 'https://backend.swiftswapp.com'