import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, senOtp, forgotPassword} from "../../api/auth_api";
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
    sendOtpStatus: 'idle',
    verifyOtpForForgotPasswordStatus: 'idle',
    resetPasswordStatus: 'idle',
    resetPasswordOtpDialogVisible: false,
    customerName: ''
};

export const loginAsync = createAsyncThunk(
    "auth/login_async",
    async (loginRequestDTO, {rejectWithValue}) => {
        try {
            const response = await loginUser(loginRequestDTO);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    "auth/logout_async",
    async (_, {rejectWithValue}) => {
        try {
            const response = await logoutUser();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendOtpAsync = createAsyncThunk(
    'auth/send_otp_async',
    async (sendMailRequest, {rejectWithValue}) => {
        try {
            const response = await senOtp(sendMailRequest);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resetPasswordAsync = createAsyncThunk(
    'auth/forgot_password_async',
    async (verifyOtpRequest, {rejectWithValue}) => {
        try {
            const response = await forgotPassword(verifyOtpRequest);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        openResetPasswordOtpDialog: (state) => {
            state.resetPasswordOtpDialogVisible = true;
        },
        closeResetPasswordOtpDialog: (state) => {
            state.resetPasswordOtpDialogVisible = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                const token = action.payload.token; 
                if (token) {
                    localStorage.setItem("token", token);
                    const decoded = jwtDecode(token);
                    state.customerName = decoded.sub || "";
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload ? action.payload.message : "An unexpected error occurred.";
            })
            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendOtpAsync.pending, (state) => {
                state.sendOtpStatus = 'loading';
            })
            .addCase(sendOtpAsync.fulfilled, (state) => {
                state.sendOtpStatus = 'succeeded';
            })
            .addCase(sendOtpAsync.rejected, (state, action) => {
                state.sendOtpStatus = 'failed';
                state.error = action.error.message;
            })

            .addCase(resetPasswordAsync.pending, (state) => {
                state.verifyOtpForForgotPasswordStatus = 'loading';
            })
            .addCase(resetPasswordAsync.fulfilled, (state) => {
                state.verifyOtpForForgotPasswordStatus = 'succeeded';
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.verifyOtpForForgotPasswordStatus = 'failed';
                state.error = action.error.message;
            });
    },

});
export const {openResetPasswordOtpDialog, closeResetPasswordOtpDialog} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
