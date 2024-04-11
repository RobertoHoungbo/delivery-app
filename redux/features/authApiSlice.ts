import { apiSlice } from "../services/apiSlice";

interface User{
    username: string;
    email: string;
}


const authApiSlice = apiSlice.injectEndpoints ({
    endpoints: builder => ({
        retrieveUser: builder.query<User, void>({
            query: () => 'auth/user/@me/'
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'auth/api/token/',
                method: 'POST',
                body: { email, password },
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }) 
        }),
        register: builder.mutation({
            query: ({
                username, email, phone_number, password 
            }) => ({
                url: 'auth/signup/',
                method: 'POST',
                body: { username, email, phone_number, password },
            }),
        }),
        verify: builder.mutation({
            query: () => ({
                url: 'auth/api/token/verify/',
                method: 'POST',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout/',
                method: 'POST',
            }),
        }),
    }),
});

export const { 
    useRetrieveUserQuery,
    useLoginMutation,
    useRegisterMutation,
    useVerifyMutation,
    useLogoutMutation,
} = authApiSlice;