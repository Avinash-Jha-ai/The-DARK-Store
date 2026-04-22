import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/product';

export const createProduct = createAsyncThunk('admin/createProduct', async (productData, thunkAPI) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    const response = await axios.post(`${API_URL}/seller`, productData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchSellerProducts = createAsyncThunk('admin/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/seller-product`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
    return { id, message: response.data.message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || 'Product created successfully';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSellerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload.id);
        state.isSuccess = true;
        state.message = 'Product deleted successfully';
      });
  },
});

export const { resetProductState } = adminProductSlice.actions;
export default adminProductSlice.reducer;
