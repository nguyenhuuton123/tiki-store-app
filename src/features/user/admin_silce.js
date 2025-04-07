import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {getUserDetails, getSearch} from "../../api/admin_api";

const initialState = {
    userDetail: null,
    loading: false,
    error: null,
    success: false,
};
export const userDetails = createAsyncThunk(
    "admin/user_details",
    async (userId) => {
        const details = await getUserDetails(userId);
        return details;
    }
);

export const search = createAsyncThunk(
    'admin/search',
    async ({searchRequest, currentPage}) => {
        try {
            const searchUser = await getSearch(searchRequest, currentPage);
            console.log(searchUser);
            return searchUser;
        } catch (error) {
            throw error;
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDetails.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.userDetail = action.payload;
                state.error = null;
            })

            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error ? action.error.message : 'Unknown error';
            });


    },
});

export const selectSuccess = (state) => state.admin.success;
export const selectLoading = (state) => state.admin.loading;
export const selectUserDetails = (state) => state.admin.userDetail;

export const selectSearchResult = (state) => state.admin.users;
export default adminSlice.reducer;