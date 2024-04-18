import { apiSlice } from "../services/apiSlice";

interface Order{
    id: number;
    size: string;
    quantity: number;
    order_status: string;
    created_at: string;
    updated_at: string;
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
        orderDetails: builder.query<Order, number>({
            query: (order_id) => `/orders/users/@me/order/${order_id}/`
        }),
        updateOrder: builder.mutation({
            query: ({ order_id, size, quantity, created_at, updated_at }) => ({
                url: `orders/${order_id}/`,
                method: 'PUT',
                body: { size, quantity, created_at, updated_at },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        deleteOrder: builder.mutation({
            query: (order_id) => ({
                url: `orders/${order_id}/`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
    useRetrieveUserOrdersQuery,
    useCreateOrderMutation,
    useOrderDetailsQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = ordersApiSlice;