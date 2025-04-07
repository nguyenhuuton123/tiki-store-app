import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    getActiveUsers,
    getDeletedUsers,
    getRegisterUser,
    getUser,
    lockUserAccount,
    unlockUserAccount,
    updateUser
} from "../../api/user_api";

const initialState = {
    users: null,
    deletedUsers: null,
    loading: false,
    error: null,
    success: false,
    loginSuccess: false,
    activeUsersList: null,
};



export const activeUsers = createAsyncThunk(
    "activeUsers",
    async ({currentPage}) => {
        return await getActiveUsers(currentPage);
    }
);

export const fetchDeletedUsers = createAsyncThunk(
    "fetchDeletedUsers",
    async ({currentPage}) => {
        try {
            return await getDeletedUsers(currentPage);
        } catch (error) {
            throw error;
        }
    }
);

export const lockUser = createAsyncThunk("user/lock_user", async (userId) => {
    try {
        return await lockUserAccount(userId);
    } catch (error) {
        throw error;
    }
}); 


export const unlockUser = createAsyncThunk(
    "user/unlock_user",
    async (userId) => {
        try {
            return await unlockUserAccount(userId);
        } catch (error) {
            throw error;
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/delete_user",
    async (userId) => {
        try {
            return await getDeletedUsers(userId);
        } catch (error) {
            throw error;
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register_user",
    async (userDTO) => {
        try {
            return await getRegisterUser(userDTO);
        } catch (error) {
            throw error;
        }
    }
);


export const userDetail = createAsyncThunk(
    "user/user_detail",
    async () => {
        try {
            const result = await getUser();
            console.log(`detail`, result)
            return result;
        } catch (error) {
            throw error;
        }
    }
);


export const setUserDetail = createAsyncThunk('user/set_user_detail', async () => {
    try {
      const result = await getUser();
      console.log(`detail`, result);
      return result;
    } catch (error) {
      throw error;
    }
  });

const userSlice = createSlice({
    name: 'user',
    initialState,
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
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      setUserDetail: (state, action) => {  
        const { password, ...otherUserDetails } = action.payload;
        state.userDetail = { ...otherUserDetails, password };
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(activeUsers.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(activeUsers.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(activeUsers.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.activeUsersList = action.payload;
                state.error = null;
            })

            .addCase(fetchDeletedUsers.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeletedUsers.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchDeletedUsers.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.fetchDeletedUsers = action.payload;
                state.error = null;
            })

            .addCase(lockUser.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(lockUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(lockUser.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = null;
            })

            .addCase(unlockUser.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(unlockUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(unlockUser.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = null;
            })

            .addCase(deleteUser.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(registerUser.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
            .addCase(userDetail.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(userDetail.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(userDetail.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.users = action.payload;
                state.error = false;
            })
        
    },
});

export const {setLoading, setError, setSuccess, setUsers} = userSlice.actions;

export const selectUsersList = (state) => state.user.activeUsersList;
export const selectDeletedUsersList = (state) => state.user.fetchDeletedUsers;
export const selectLoginSuccess = (state) => state.user.loginSuccess;
export const selectUserDetail = (state) => state.user.users;
export default userSlice.reducer;
