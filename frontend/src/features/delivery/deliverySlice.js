import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDeliveryStatsRequest,
    fetchAssignedOrdersRequest,
    updateDeliveryOrderStatusRequest,
} from "./deliveryAPI";

const initialState = {
    stats: null,
    statsStatus: "idle",
    statsError: null,

    assignedOrders: [],
    ordersStatus: "idle",
    ordersError: null,

    updateStatus: "idle",
    updateError: null,
};

// STATS
export const fetchDeliveryStats = createAsyncThunk(
    "delivery/fetchDeliveryStats",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchDeliveryStatsRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch delivery stats"
            );
        }
    }
);

// ASSIGNED ORDERS
export const fetchAssignedOrders = createAsyncThunk(
    "delivery/fetchAssignedOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAssignedOrdersRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message ||
                "Failed to fetch assigned orders"
            );
        }
    }
);

// UPDATE ORDER STATUS
export const updateDeliveryOrderStatus = createAsyncThunk(
    "delivery/updateDeliveryOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const { data } = await updateDeliveryOrderStatusRequest(id, status);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message ||
                "Failed to update delivery order status"
            );
        }
    }
);

const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // STATS
        builder
            .addCase(fetchDeliveryStats.pending, (state) => {
                state.statsStatus = "loading";
                state.statsError = null;
            })
            .addCase(fetchDeliveryStats.fulfilled, (state, action) => {
                state.statsStatus = "succeeded";
                state.stats = action.payload;
            })
            .addCase(fetchDeliveryStats.rejected, (state, action) => {
                state.statsStatus = "failed";
                state.statsError = action.payload;
            });

        // ORDERS
        builder
            .addCase(fetchAssignedOrders.pending, (state) => {
                state.ordersStatus = "loading";
                state.ordersError = null;
            })
            .addCase(fetchAssignedOrders.fulfilled, (state, action) => {
                state.ordersStatus = "succeeded";
                state.assignedOrders = action.payload || [];
            })
            .addCase(fetchAssignedOrders.rejected, (state, action) => {
                state.ordersStatus = "failed";
                state.ordersError = action.payload;
                state.assignedOrders = [];
            });

        // UPDATE STATUS
        builder
            .addCase(updateDeliveryOrderStatus.pending, (state) => {
                state.updateStatus = "loading";
                state.updateError = null;
            })
            .addCase(updateDeliveryOrderStatus.fulfilled, (state, action) => {
                state.updateStatus = "succeeded";
                const updated = action.payload;
                // Replace order in assignedOrders list if present
                state.assignedOrders = state.assignedOrders.map((order) =>
                    order._id === updated._id ? updated : order
                );
            })
            .addCase(updateDeliveryOrderStatus.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.updateError = action.payload;
            });
    },
});

export default deliverySlice.reducer;
