import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchProductsRequest,
    fetchProductByIdRequest,
} from "./productsAPI";

const initialState = {
    items: [],
    page: 1,
    totalPages: 1,
    total: 0,
    status: "idle", // list: idle | loading | succeeded | failed
    error: null,

    productDetails: null,
    detailsStatus: "idle", // details: idle | loading | succeeded | failed
    detailsError: null,
};

// List products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await fetchProductsRequest(params);
            // backend returns: { page, limit, total, totalPages, products }
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

// Single product
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await fetchProductByIdRequest(id);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch product"
            );
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // LIST
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.products || [];
                state.page = action.payload.page || 1;
                state.totalPages = action.payload.totalPages || 1;
                state.total = action.payload.total || 0;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // DETAILS
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.detailsStatus = "loading";
                state.detailsError = null;
                state.productDetails = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.detailsStatus = "succeeded";
                state.productDetails = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.detailsStatus = "failed";
                state.detailsError = action.payload;
                state.productDetails = null;
            });
    },
});

export default productsSlice.reducer;
