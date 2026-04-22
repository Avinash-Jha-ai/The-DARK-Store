import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/kart';

export const getKart = createAsyncThunk('kart/get', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const addToKart = createAsyncThunk('kart/add', async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/add/${productId}`, { quantity });
    // After adding, we fetch the updated cart to keep state in sync
    thunkAPI.dispatch(getKart());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const removeFromKart = createAsyncThunk('kart/remove', async (productId, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/remove/${productId}`);
    thunkAPI.dispatch(getKart());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateCartItemQuantity = createAsyncThunk('kart/updateQuantity', async ({ productId, quantity }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/update/${productId}`, { quantity });
    thunkAPI.dispatch(getKart());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const clearKart = createAsyncThunk('kart/clear', async (_, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/clear`);
    thunkAPI.dispatch(getKart());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const kartSlice = createSlice({
  name: 'kart',
  initialState: {
    kart: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetKartState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearKartState: (state) => {
      state.kart = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Kart
      .addCase(getKart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kart = action.payload.cart;
      })
      .addCase(getKart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add to Kart
      .addCase(addToKart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToKart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addToKart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Remove from Kart
      .addCase(removeFromKart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromKart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(removeFromKart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Clear Kart
      .addCase(clearKart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearKart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(clearKart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetKartState, clearKartState } = kartSlice.actions;
export default kartSlice.reducer;
