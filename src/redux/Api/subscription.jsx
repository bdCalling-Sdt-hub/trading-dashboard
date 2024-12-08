import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        allSubscription : builder.query({
            query : ()=>{
                return {
                    url  : '/subscription/all',
                    method : 'GET'
                }
            },
            providesTags : ['subscription']
        }),
        updateSubscription : builder.mutation({
            query : ({id, data})=>{
                console.log(id);
                return {
                    url : `/subscription/edit/${id}`,
                    method : "PATCH",
                    body : data
                }
            },
            invalidatesTags : ['subscription']
        })
    })
})

export const { useAllSubscriptionQuery , useUpdateSubscriptionMutation }  = subscriptionApi;