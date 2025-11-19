import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchVendorStatsRequest,
    fetchVendorOrdersRequest,
    fetchVendorOrderByIdRequest,
    fetchVendorProductsRequest,
} from "./vendorAPI";

const initialState = {
    stats: null,
    statsStatus: "idle",
    statsError: null,

    orders: [],
    ordersStatus: "idle",
    ordersError: null,

    orderDetails: null,
    orderDetailsStatus: "idle",
    orderDetailsError: null,

    products: [],
    productsStatus: "idle",
    productsError: null,
};

// STATS
export const fetchVendorStats = createAsyncThunk(
    "vendor/fetchVendorStats",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await fetchVendorStatsRequest(params);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch vendor stats"
            );
        }
    }
);

// ORDERS LIST
export const fetchVendorOrders = createAsyncThunk(
    "vendor/fetchVendorOrders",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await fetchVendorOrdersRequest(params);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch vendor orders"
            );
        }
    }
);

// ORDER DETAILS
export const fetchVendorOrderById = createAsyncThunk(
    "vendor/fetchVendorOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await fetchVendorOrderByIdRequest(id);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch vendor order"
            );
        }
    }
);

// PRODUCTS
export const fetchVendorProducts = createAsyncThunk(
    "vendor/fetchVendorProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchVendorProductsRequest();
            // assume backend returns array of products
            return data.products || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch vendor products"
            );
        }
    }
);

const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // STATS
        builder
            .addCase(fetchVendorStats.pending, (state) => {
                state.statsStatus = "loading";
                state.statsError = null;
            })
            .addCase(fetchVendorStats.fulfilled, (state, action) => {
                state.statsStatus = "succeeded";
                state.stats = action.payload;
            })
            .addCase(fetchVendorStats.rejected, (state, action) => {
                state.statsStatus = "failed";
                state.statsError = action.payload;
            });

        // ORDERS
        builder
            .addCase(fetchVendorOrders.pending, (state) => {
                state.ordersStatus = "loading";
                state.ordersError = null;
            })
            .addCase(fetchVendorOrders.fulfilled, (state, action) => {
                state.ordersStatus = "succeeded";
                state.orders = action.payload || [];
            })
            .addCase(fetchVendorOrders.rejected, (state, action) => {
                state.ordersStatus = "failed";
                state.ordersError = action.payload;
                state.orders = [];
            });

        // ORDER DETAILS
        builder
            .addCase(fetchVendorOrderById.pending, (state) => {
                state.orderDetailsStatus = "loading";
                state.orderDetailsError = null;
                state.orderDetails = null;
            })
            .addCase(fetchVendorOrderById.fulfilled, (state, action) => {
                state.orderDetailsStatus = "succeeded";
                state.orderDetails = action.payload;
            })
            .addCase(fetchVendorOrderById.rejected, (state, action) => {
                state.orderDetailsStatus = "failed";
                state.orderDetailsError = action.payload;
                state.orderDetails = null;
            });

        // PRODUCTS
        builder
            .addCase(fetchVendorProducts.pending, (state) => {
                state.productsStatus = "loading";
                state.productsError = null;
            })
            .addCase(fetchVendorProducts.fulfilled, (state, action) => {
                state.productsStatus = "succeeded";
                state.products = action.payload || [];
            })
            .addCase(fetchVendorProducts.rejected, (state, action) => {
                state.productsStatus = "failed";
                state.productsError = action.payload;
                state.products = [];
            });
    },
});

export default vendorSlice.reducer;
