import { baseApi } from "./baseApi";

const useApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        totalUserCount: builder.query({
            query: (data) => {
                return {
                    url: '/dashboard/total-user_count',
                    method: 'GET',
                }
            }
        }),
        getUserGrowth: builder.query({
            query: (year) => {
                return {
                    url: `/dashboard/user-growth?year=${year}`, method: 'GET'
                }
            }
        }),
        planSubscriber: builder.query({
            query: () => {
                return {
                    url: '/plan/subscribers',
                    method: 'GET'
                }
            }
        }),
        /** category api integration */
        getAllCategory: builder.query({
            query: () => {
                return {
                    url: '/category/get-all',
                    method: 'GET'
                }
            },
            providesTags: ['allCategory']
        }),
        createCategory: builder.mutation({
            query: (data) => {
                return {
                    url: '/category/add-category',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['allCategory']
        }),
        deleteCategory : builder.mutation({
            query : (id)=>{
                return {
                    url : `/category/delete/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags: ['allCategory']
        }),
        editCategory : builder.mutation({
            query : ({formData, id})=>{
                console.log(formData , id);
                return {
                    url : `/category/edit/${id}`,
                    method : 'PATCH',
                    body : formData
                }
            },
            invalidatesTags: ['allCategory']
        }),
        getSingleSubscribePlan: builder.query({
            query: (id) => {
                return {
                    url: `/plan/subscribe/${id}`,
                    method: 'GET'
                }
            },
            invalidatesTags: ['allCategory']
        }),
        approveDeclineMemberRequest: builder.mutation({
            query: ({ id, status }) => {
                return {
                    url: `/plan/subscribe/${id}/request?status=${status}`,
                    method: 'PATCH'
                }
            }
        }),
        /** Get all Notification */
        getAllNotification: builder.query({
            query: () => {
                return {
                    url: '/notification/get-all-notifications',
                    method: 'GET'
                }
            },
            providesTags : ['notification']
        }),
        /** Delete Notification */
        deleteNotification : builder.mutation({
            query : (id)=>{
                return {
                    url : `/notification/delete/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags :['notification']
        }),
        /** Get all user */
        getAllUser : builder.query({
            query : ({search})=>{
                return {
                    url : `/auth/users?searchTerm=${search}`,
                    method : 'GET'
                }
            },
            providesTags : ['blockUser']
        }),
        /** Block user */
        blockUser : builder.mutation({
            query : (id)=>{
                return {
                    url : `/auth/user-block-unblock/${id}`,
                    method : 'PATCH',
                
                }
            },
            invalidatesTags : ['blockUser']
        }),
        /** Setting APIs */
        getAboutUs : builder.query({
            query : ()=>{
                return {
                    url : '/rules/get-about-us',
                    method : 'GET'
                }
            },
            providesTags : ['aboutUs']
        }),
        updateAboutUs : builder.mutation({
            query : (data)=>{
                return {
                    url : '/rules/add-about-us',
                    method : "POST",
                    body :  data
                }
            },invalidatesTags :['aboutUs']
        }),
        getRulesAndRegulation :  builder.query({
            query : ()=>{
                return {
                    url : '/rules/get-rules',
                    method : 'GET'
                }
            },

            providesTags : ['terms']
        }),
        updateRulesAndRegulation : builder.mutation({
            query :  (data)=>{
                return {
                    url : '/rules/add-rules',
                    method : 'POST',
                    body : data
                }
            }
        }),
        getFacts :  builder.query({
            query : ()=>{
                return {
                    url : '/rules/get-facts',
                    method : 'GET'
                }
            },

            providesTags : ['terms']
        }),
        updateFacts : builder.mutation({
            query :  (data)=>{
                return {
                    url : '/rules/add-facts',
                    method : 'POST',
                    body : data
                }
            }
        }),
        

    })
})

export const { useTotalUserCountQuery, useGetUserGrowthQuery, usePlanSubscriberQuery, useGetAllCategoryQuery, useCreateCategoryMutation, useGetSingleSubscribePlanQuery, useApproveDeclineMemberRequestMutation , useGetAllNotificationQuery , useDeleteNotificationMutation, useGetAllUserQuery , useBlockUserMutation , useUpdateAboutUsMutation , useGetAboutUsQuery , useGetRulesAndRegulationQuery, useUpdateRulesAndRegulationMutation , useUpdateFactsMutation, useGetFactsQuery , useDeleteCategoryMutation , useEditCategoryMutation} = useApi