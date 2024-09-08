import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import filterReducer from './features/filterSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook để sử dụng dispatch với kiểu chính xác
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();