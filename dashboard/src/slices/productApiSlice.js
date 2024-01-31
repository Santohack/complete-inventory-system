import { PRODUCTS_URL, UPLOADS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const  productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.query({
            query:()=>({
                url:PRODUCTS_URL
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        }),
        getProductsDetail:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:"POST",
            }),
            invalidatesTags:['Products']
        }),
        updateProduct:builder.mutation({
            query:(product)=>({
                url:`${PRODUCTS_URL}/${product.productId}`,
                method:"PUT",
                body:product
            }),
            invalidatesTags:['Products']
        }),
        uploadsProducts:builder.mutation({
            query:(data)=>({
                url:`${UPLOADS_URL}`,
                method:"POST",  
                body:data   
            })
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:"DELETE",
               
            })
        })
        
    })
})
export const {useGetProductsQuery,useGetProductsDetailQuery ,useCreateProductMutation, useUpdateProductMutation,useDeleteProductMutation, useUploadsProductsMutation} = productApiSlice
