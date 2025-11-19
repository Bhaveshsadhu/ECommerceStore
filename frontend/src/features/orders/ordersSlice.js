import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createOrderRequest,
    fetchMyOrdersRequest,
    fetchOrderByIdRequest,
} from "./ordersAPI";

const initialState = {
    createStatus: "idle", // idle | loading | succeeded | failed
    createError: null,
    lastCreatedOrder: null,

    myOrders: [],
    myOrdersStatus: "idle",
    myOrdersError: null,

    orderDetails: null,
    orderDetailsStatus: "idle",
    orderDetailsError: null,
};

// CREATE order
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await createOrderRequest(payload);
            // backend likely returns { order } or the order directly
            return data.order || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to create order"
            );
        }
    }
);

// GET my orders
export const fetchMyOrders = createAsyncThunk(
    "orders/fetchMyOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchMyOrdersRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

// GET order by ID
export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await fetchOrderByIdRequest(id);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch order"
            );
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetCreateOrderState(state) {
            state.createStatus = "idle";
            state.createError = null;
            state.lastCreatedOrder = null;
        },
    },
    extraReducers: (builder) => {
        // CREATE
        builder
            .addCase(createOrder.pending, (state) => {
                state.createStatus = "loading";
                state.createError = null;
                state.lastCreatedOrder = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.createStatus = "succeeded";
                state.lastCreatedOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.createStatus = "failed";
                state.createError = action.payload;
            });

        // MY ORDERS
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.myOrdersStatus = "loading";
                state.myOrdersError = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.myOrdersStatus = "succeeded";
                state.myOrders = action.payload || [];
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.myOrdersStatus = "failed";
                state.myOrdersError = action.payload;
                state.myOrders = [];
            });

        // ORDER DETAILS
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.orderDetailsStatus = "loading";
                state.orderDetailsError = null;
                state.orderDetails = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.orderDetailsStatus = "succeeded";
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.orderDetailsStatus = "failed";
                state.orderDetailsError = action.payload;
                state.orderDetails = null;
            });
    },
});

export const { resetCreateOrderState } = ordersSlice.actions;

export default ordersSlice.reducer;
