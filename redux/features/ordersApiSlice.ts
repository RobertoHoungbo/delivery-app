import { apiSlice } from "../services/apiSlice";

interface Order{
    size: string;
    quantity: number;
}


const ordersApiSlice = apiSlice.injectEndpoints ({
    endpoints: builder => ({
        retrieveUserOrders: builder.query<Order, void>({
            query: () => 'orders/users/@me/orders/'
        }),
        createOrder: builder.mutation({
            query: ({ size, quantity }) => ({
                url: 'orders/',
                method: 'POST',
                body: { size, quantity },
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }) 
        }),
        // register: builder.mutation({
        //     query: ({
        //         username, email, phone_number, password 
        //     }) => ({
        //         url: 'auth/signup/',
        //         method: 'POST',
        //         body: { username, email, phone_number, password },
        //     }),
        // }),
        // verify: builder.mutation({
        //     query: () => ({
        //         url: 'auth/api/token/verify/',
        //         method: 'POST',
        //     }),
        // }),
        // logout: builder.mutation({
        //     query: () => ({
        //         url: 'auth/logout/',
        //         method: 'POST',
        //     }),
        // }),
    }),
});

export const { 
    useRetrieveUserOrdersQuery,
    useCreateOrderMutation,
    // useRegisterMutation,
    // useVerifyMutation,
    // useLogoutMutation,
} = ordersApiSlice;