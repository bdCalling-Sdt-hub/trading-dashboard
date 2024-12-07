import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        allSubscription : builder.query({
            query : ()=>{
                return {
                    url  : '/subscription/all',
                    method : 'GET'
                }
            }
        })
    })
})

export const { useAllSubscriptionQuery }  = subscriptionApi