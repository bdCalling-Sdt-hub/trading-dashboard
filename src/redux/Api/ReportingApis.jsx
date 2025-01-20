import { baseApi } from "./baseApi";

const ReportingApis = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllReport :  builder.query({
            query : (page)=>{
                return {
                    url : `/swap/get-reports?limit=10&page=${page}`,
                    method : 'GET'
                }
            },
            providesTags : ["report"]
        }),
        replyReport :  builder.mutation({
            query : ({id, data})=>{
                return {
                    url : `/swap/relay-report?id=${id}`,
                    method : 'PATCH',
                    body : data
                }
            },
            invalidatesTags : ['report']
        }),
        deleteReport : builder.mutation({
            query : (id)=>{
                return {
                    url : `/swap/delete-report/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['report']
        })
    })
})
export const { useGetAllReportQuery , useReplyReportMutation , useDeleteReportMutation } =  ReportingApis