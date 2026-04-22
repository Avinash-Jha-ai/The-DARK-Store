import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice';
import productReducer from '../features/products/state/productSlice';
import kartReducer from '../features/kart/state/kartSlice';
import paymentReducer from '../features/payment/state/paymentSlice';
import wishlistReducer from '../features/wishlist/state/wishlistSlice';
import orderReducer from '../features/orders/state/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    kart: kartReducer,
    payment: paymentReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
});
