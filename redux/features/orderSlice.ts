import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
    orderLoading: boolean,
}

const initialState = {
    orderLoading: true,
} as OrderState;

const orderSlice = createSlice ({
    name: 'order',
    initialState,
    reducers: {
        finishInitialLoad: state => {
            state.orderLoading = false;
        }
    }
});

export const {finishInitialLoad} = orderSlice.actions;

export default orderSlice.reducer;

 