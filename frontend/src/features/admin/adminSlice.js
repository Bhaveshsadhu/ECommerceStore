import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAdminStatsRequest,
    fetchAdminUsersRequest,
    updateUserRoleRequest,
    toggleUserStatusRequest,
    fetchAdminVendorsRequest,
    updateVendorApprovalRequest,
    fetchAdminDeliveryPartnersRequest,
    fetchAdminOrdersRequest,
    assignDeliveryPartnerRequest,
    updateAdminOrderStatusRequest,
} from "./adminAPI";

const initialState = {
    stats: null,
    statsStatus: "idle",
    statsError: null,

    users: [],
    usersStatus: "idle",
    usersError: null,

    vendors: [],
    vendorsStatus: "idle",
    vendorsError: null,

    deliveryPartners: [],
    deliveryPartnersStatus: "idle",
    deliveryPartnersError: null,

    orders: [],
    ordersStatus: "idle",
    ordersError: null,

    actionStatus: "idle",
    actionError: null,
};

// STATS
export const fetchAdminStats = createAsyncThunk(
    "admin/fetchAdminStats",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAdminStatsRequest();
            return data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch admin stats"
            );
        }
    }
);

// USERS
export const fetchAdminUsers = createAsyncThunk(
    "admin/fetchAdminUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAdminUsersRequest();
            return data.users || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

export const updateUserRole = createAsyncThunk(
    "admin/updateUserRole",
    async ({ id, role }, { rejectWithValue }) => {
        try {
            const { data } = await updateUserRoleRequest(id, role);
            return data.user || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update user role"
            );
        }
    }
);

export const toggleUserStatus = createAsyncThunk(
    "admin/toggleUserStatus",
    async ({ id, isActive }, { rejectWithValue }) => {
        try {
            const { data } = await toggleUserStatusRequest(id, isActive);
            return data.user || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update user status"
            );
        }
    }
);

// VENDORS
export const fetchAdminVendors = createAsyncThunk(
    "admin/fetchAdminVendors",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAdminVendorsRequest();
            return data.vendors || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch vendors"
            );
        }
    }
);

export const updateVendorApproval = createAsyncThunk(
    "admin/updateVendorApproval",
    async ({ id, isApproved }, { rejectWithValue }) => {
        try {
            const { data } = await updateVendorApprovalRequest(id, isApproved);
            return data.vendor || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update vendor approval"
            );
        }
    }
);

// DELIVERY PARTNERS
export const fetchAdminDeliveryPartners = createAsyncThunk(
    "admin/fetchAdminDeliveryPartners",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAdminDeliveryPartnersRequest();
            return data.deliveryPartners || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message ||
                "Failed to fetch delivery partners"
            );
        }
    }
);

// ORDERS
export const fetchAdminOrders = createAsyncThunk(
    "admin/fetchAdminOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAdminOrdersRequest();
            return data.orders || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

export const assignDeliveryPartner = createAsyncThunk(
    "admin/assignDeliveryPartner",
    async ({ orderId, deliveryPartnerId }, { rejectWithValue }) => {
        try {
            const { data } = await assignDeliveryPartnerRequest(
                orderId,
                deliveryPartnerId
            );
            return data.order || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to assign delivery partner"
            );
        }
    }
);

export const updateAdminOrderStatus = createAsyncThunk(
    "admin/updateAdminOrderStatus",
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const { data } = await updateAdminOrderStatusRequest(orderId, status);
            return data.order || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update order status"
            );
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminActionState(state) {
            state.actionStatus = "idle";
            state.actionError = null;
        },
    },
    extraReducers: (builder) => {
        // STATS
        builder
            .addCase(fetchAdminStats.pending, (state) => {
                state.statsStatus = "loading";
                state.statsError = null;
            })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.statsStatus = "succeeded";
                state.stats = action.payload;
            })
            .addCase(fetchAdminStats.rejected, (state, action) => {
                state.statsStatus = "failed";
                state.statsError = action.payload;
            });

        // USERS
        builder
            .addCase(fetchAdminUsers.pending, (state) => {
                state.usersStatus = "loading";
                state.usersError = null;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.usersStatus = "succeeded";
                state.users = action.payload || [];
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.usersStatus = "failed";
                state.usersError = action.payload;
                state.users = [];
            });

        builder
            .addCase(updateUserRole.pending, (state) => {
                state.actionStatus = "loading";
                state.actionError = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.actionStatus = "succeeded";
                const updated = action.payload;
                state.users = state.users.map((u) =>
                    u._id === updated._id ? updated : u
                );
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.actionStatus = "failed";
                state.actionError = action.payload;
            });

        builder
            .addCase(toggleUserStatus.pending, (state) => {
                state.actionStatus = "loading";
                state.actionError = null;
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.actionStatus = "succeeded";
                const updated = action.payload;
                state.users = state.users.map((u) =>
                    u._id === updated._id ? updated : u
                );
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.actionStatus = "failed";
                state.actionError = action.payload;
            });

        // VENDORS
        builder
            .addCase(fetchAdminVendors.pending, (state) => {
                state.vendorsStatus = "loading";
                state.vendorsError = null;
            })
            .addCase(fetchAdminVendors.fulfilled, (state, action) => {
                state.vendorsStatus = "succeeded";
                state.vendors = action.payload || [];
            })
            .addCase(fetchAdminVendors.rejected, (state, action) => {
                state.vendorsStatus = "failed";
                state.vendorsError = action.payload;
                state.vendors = [];
            });

        builder
            .addCase(updateVendorApproval.pending, (state) => {
                state.actionStatus = "loading";
                state.actionError = null;
            })
            .addCase(updateVendorApproval.fulfilled, (state, action) => {
                state.actionStatus = "succeeded";
                const updated = action.payload;
                state.vendors = state.vendors.map((v) =>
                    v._id === updated._id ? updated : v
                );
            })
            .addCase(updateVendorApproval.rejected, (state, action) => {
                state.actionStatus = "failed";
                state.actionError = action.payload;
            });

        // DELIVERY PARTNERS
        builder
            .addCase(fetchAdminDeliveryPartners.pending, (state) => {
                state.deliveryPartnersStatus = "loading";
                state.deliveryPartnersError = null;
            })
            .addCase(
                fetchAdminDeliveryPartners.fulfilled,
                (state, action) => {
                    state.deliveryPartnersStatus = "succeeded";
                    state.deliveryPartners = action.payload || [];
                }
            )
            .addCase(
                fetchAdminDeliveryPartners.rejected,
                (state, action) => {
                    state.deliveryPartnersStatus = "failed";
                    state.deliveryPartnersError = action.payload;
                    state.deliveryPartners = [];
                }
            );

        // ORDERS
        builder
            .addCase(fetchAdminOrders.pending, (state) => {
                state.ordersStatus = "loading";
                state.ordersError = null;
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                state.ordersStatus = "succeeded";
                state.orders = action.payload || [];
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                state.ordersStatus = "failed";
                state.ordersError = action.payload;
                state.orders = [];
            });

        builder
            .addCase(assignDeliveryPartner.pending, (state) => {
                state.actionStatus = "loading";
                state.actionError = null;
            })
            .addCase(assignDeliveryPartner.fulfilled, (state, action) => {
                state.actionStatus = "succeeded";
                const updated = action.payload;
                state.orders = state.orders.map((o) =>
                    o._id === updated._id ? updated : o
                );
            })
            .addCase(assignDeliveryPartner.rejected, (state, action) => {
                state.actionStatus = "failed";
                state.actionError = action.payload;
            });

        builder
            .addCase(updateAdminOrderStatus.pending, (state) => {
                state.actionStatus = "loading";
                state.actionError = null;
            })
            .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
                state.actionStatus = "succeeded";
                const updated = action.payload;
                state.orders = state.orders.map((o) =>
                    o._id === updated._id ? updated : o
                );
            })
            .addCase(updateAdminOrderStatus.rejected, (state, action) => {
                state.actionStatus = "failed";
                state.actionError = action.payload;
            });
    },
});

export const { clearAdminActionState } = adminSlice.actions;

export default adminSlice.reducer;
