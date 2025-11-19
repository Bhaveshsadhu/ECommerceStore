import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchCartRequest,
    addToCartRequest,
    updateCartItemRequest,
    removeCartItemRequest,
    clearCartRequest,
} from "./cartAPI";
import { logoutUser } from "../auth/authSlice.js";

const initialState = {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// Helpers
const extractItemsFromResponse = (data) => {
    if (!data) return [];
    if (Array.isArray(data.items)) return data.items;
    if (data.cart && Array.isArray(data.cart.items)) return data.cart.items;
    return [];
};

// GET cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchCartRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch cart"
            );
        }
    }
);

// ADD item
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, qty }, { rejectWithValue }) => {
        try {
            const { data } = await addToCartRequest({ productId, qty });
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to add to cart"
            );
        }
    }
);

// UPDATE item qty
export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ productId, qty }, { rejectWithValue }) => {
        try {
            const { data } = await updateCartItemRequest({ productId, qty });
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update cart item"
            );
        }
    }
);

// REMOVE item
export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await removeCartItemRequest(productId);
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to remove cart item"
            );
        }
    }
);

// CLEAR cart
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await clearCartRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to clear cart"
            );
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // FETCH
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = extractItemsFromResponse(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.items = [];
            });

        // ADD
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = extractItemsFromResponse(action.payload.cart || action.payload);
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            });

        // UPDATE
        builder
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = extractItemsFromResponse(action.payload.cart || action.payload);
                state.error = null;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.error = action.payload;
            });

        // REMOVE
        builder
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = extractItemsFromResponse(action.payload.cart || action.payload);
                state.error = null;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.error = action.payload;
            });

        // CLEAR
        builder
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.error = null;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            });

        // When user logs out, clear cart state
        builder.addCase(logoutUser.fulfilled, () => initialState);
    },
});

export default cartSlice.reducer;
