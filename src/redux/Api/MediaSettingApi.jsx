import { baseApi } from "./baseApi";

const mediaSettingApi = baseApi.injectEndpoints({
    endpoints  :(builder)=>({
        getAllAds  :builder.query({
            query :({page})=>{
                return {
                    url : `/adds/all-adds?page=${page}`,
                    method : 'GET'
                }
            },
            providesTags : ['ads']
        }),
        getAllVideos  :builder.query({
            query :()=>{
                return {
                    url : '/adds/all-video-adds',
                    method : 'GET'
                }
            },
            providesTags : ['videoAds']
        }),
        createAds : builder.mutation({
            query : (data)=>{
                return {
                    url : '/adds/create-adds',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ['ads']
        }),
        deleteAds : builder.mutation({
            query : (id)=>{
                return {
                    url : `/adds/delete-adds/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['ads']
        }),
        deleteVideoAds : builder.mutation({
            query : (id)=>{
                return {
                    url : `/adds/delete-video-adds/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['videoAds']
        })
    })
})

export const {useGetAllAdsQuery, useGetAllVideosQuery, useCreateAdsMutation , useDeleteAdsMutation , useDeleteVideoAdsMutation} = mediaSettingApi;