import { configureStore } from '@reduxjs/toolkit';
import adminProductReducer from './adminProductSlice';
import adminAuthReducer from '../features/auth/state/adminAuthSlice';
import orderReducer from '../features/orders/state/orderSlice';

export const store = configureStore({
  reducer: {
    adminProducts: adminProductReducer,
    adminAuth: adminAuthReducer,
    orders: orderReducer,
  },
});
