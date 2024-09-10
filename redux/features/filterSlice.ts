// features/categorylice.js
import { CategoryType } from '@/app/(admin)/dashboard/inventories/categories/page';
import { toast } from '@/components/ui/use-toast';
import { FilteredProductType } from '@/types/type';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface initType {
    searchName: string,
    prices: number[]
    categories: string[]
}

  const initialState: initType = {
    searchName: '',
    prices: [100_000, 600_000],
    categories: ['All']
  };

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setTitleFilter: (state, action: PayloadAction<string>)=>{
      state.searchName = action.payload
    },
    setPriceFilter: (state, action: PayloadAction<number[]>)=>{
      state.prices = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<{title: string, isChecked: boolean}>)=>{
      const {title, isChecked} = action.payload
      if(title === "All"){
        state.categories = ['All'] 
      }else{
        const newCategory = [...state.categories.filter(category=> category !== 'All')] as string[]
        if(isChecked){
         state.categories = [...newCategory, title]
        }else{
          // Check if there no category in arr will turn into "All"
        const newCategory = state.categories.filter(category=> category !== title)
        state.categories =  newCategory.length === 0 ? ['All'] : newCategory
        }
      }
    },
     resetFilter: (state)=>{
      //  state

     }
  },
});
export const {setTitleFilter, setPriceFilter, setCategoryFilter, resetFilter} = categorySlice.actions
export default categorySlice.reducer;
