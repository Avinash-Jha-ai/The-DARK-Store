import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/payment';

export const createRazorpayOrder = createAsyncThunk('payment/createOrder', async (orderData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const verifyRazorpayPayment = createAsyncThunk('payment/verifyPayment', async (paymentData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/verify-payment`, paymentData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    order: null,
    dbOrderId: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.order = null;
      state.dbOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.dbOrderId = action.payload.dbOrderId;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
