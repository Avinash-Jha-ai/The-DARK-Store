import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/auth';

// Admin Login Thunk
export const adminLogin = createAsyncThunk('auth/adminLogin', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/admin-login`, userData, { withCredentials: true });
    if (response.data.success) {
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Admin Get Me Thunk (to stay logged in)
export const getAdminMe = createAsyncThunk('auth/getAdminMe', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/get-me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Session expired');
  }
});

// Admin Logout Thunk
export const adminLogout = createAsyncThunk('auth/adminLogout', async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('adminUser');
    return { success: true };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    user: JSON.parse(localStorage.getItem('adminUser')) || null,
    isLoading: !!localStorage.getItem('adminUser'),
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('adminUser');
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    resetAuthState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getAdminMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getAdminMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem('adminUser');
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      });
  },
});

export const { logout, resetAuthState } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
