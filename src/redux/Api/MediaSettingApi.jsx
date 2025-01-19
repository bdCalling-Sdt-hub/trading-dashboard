import { baseApi } from "./baseApi";

const mediaSettingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAds: builder.query({
            query: ({ page }) => {
                return {
                    url: `/adds/all-adds?page=${page}`,
                    method: 'GET'
                }
            },
            providesTags: ['ads']
        }),
        getAllVideos: builder.query({
            query: () => {
                return {
                    url: '/adds/all-video-adds',
                    method: 'GET'
                }
            },
            providesTags: ['videoAds']
        }),
        getSecondVideo : builder.query({
            query : ()=>{
                return {
                   url : '/adds/get-small-banner?limit=100',
                   method : 'GET' 
                }
            },
            providesTags : ['secondVideo']
        }),
        createSecondVideo: builder.mutation({
            query: (data) => {
                return {
                    url: '/adds/create-small-banner',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['secondVideo']
        }),
        deleteSecondVideo: builder.mutation({
            query: (id) => {
                return {
                    url: `/adds/delete-small-banner/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['secondVideo']
        }),
        updateSecondVideo : builder.mutation({
            query : ({id,formData})=>{
                console.log(formData)
                return {
                    url : `/adds/edit-video-adds/${id}`,
                    method :  "PATCH",
                    body : formData
                }
            },
            invalidatesTags : ['secondVideo']
        }),
        createAds: builder.mutation({
            query: (data) => {
                return {
                    url: '/adds/create-adds',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['ads']
        }),
        deleteAds: builder.mutation({
            query: (id) => {
                return {
                    url: `/adds/delete-adds/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['ads']
        }),
        deleteVideoAds: builder.mutation({
            query: (id) => {
                return {
                    url: `/adds/delete-video-adds/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['videoAds']
        }),
        updateAdds: builder.mutation({
            query: ({ id, data }) => {
                console.log(id);
                return {
                    url: `/adds/edit-adds/${id}`,
                    method: 'PATCH',
                    body: data
                }
            }, invalidatesTags: ['ads']
        }),
        addVideo: builder.mutation({
            query: (data) => {
                return {
                    url: '/adds/create-video-adds',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags : ['videoAds']
        }),
        updateVideo : builder.mutation({
            query : ({id,formData})=>{
                console.log(formData)
                return {
                    url : `/adds/edit-video-adds/${id}`,
                    method :  "PATCH",
                    body : formData
                }
            },
            invalidatesTags : ['videoAds']
        })
    })
})

export const { useGetAllAdsQuery, useGetAllVideosQuery, useCreateAdsMutation, useDeleteAdsMutation, useDeleteVideoAdsMutation, useUpdateAddsMutation , useAddVideoMutation , useUpdateVideoMutation , useGetSecondVideoQuery , useCreateSecondVideoMutation , useDeleteSecondVideoMutation , useUpdateSecondVideoMutation} = mediaSettingApi;