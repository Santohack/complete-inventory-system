import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      })
    }),
    getUsersDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,

      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Users"],
    })
  }),
});

export const {
  useLoginMutation,
  useProfileMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useRegisterMutation,
  useDeleteUserMutation, 
  useGetUsersDetailsQuery,
  useUpdateUserMutation
} = userApiSlice;
