import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerRequest,
    loginRequest,
    fetchMeRequest,
    logoutRequest,
} from "./authAPI";

const initialState = {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// Register
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await registerRequest(formData);
            // backend might return { user, token } or just user
            return data.user || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Registration failed"
            );
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await loginRequest(formData);
            return data.user || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Login failed"
            );
        }
    }
);

// Fetch current user (using cookie)
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchMeRequest();
            return data.user || data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Not authenticated"
            );
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await logoutRequest();
            return true;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || "Logout failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // REGISTER
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // LOGIN
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // FETCH CURRENT USER
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "idle"; // not logged in is normal
                state.error = action.payload;
                state.user = null;
            });

        // LOGOUT
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
