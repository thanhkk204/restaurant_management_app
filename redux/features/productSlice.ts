// features/productSlice.js
import { toast } from '@/components/ui/use-toast';
import { FilteredProductType } from '@/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch products từ API backend
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch('/api/filteredProduct', { method: "GET" }); 
  const data = await res.json();
  if(!res.ok) toast({variant: 'destructive', title: "Can't get product in redux"})
  return data.dishes;
});

export interface ProductState {
    products: FilteredProductType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
  }

  const initialState: ProductState = {
    products: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: undefined,
  };

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Lưu trữ dữ liệu sản phẩm vào state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;
