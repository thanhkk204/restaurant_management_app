import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { FilteredProductType } from "@/types/type";

export const productSelector = (state: RootState) => state.products.products
export const searchNameSelector = (state: RootState) => state.filters.searchName
export const categoryFilterSelector = (state: RootState) => state.filters.categories
export const priceFilterSelector = (state: RootState) => state.filters.prices

const filterByPricesAndSearchName = ({remainingProduct, searchName, prices}:
    {remainingProduct:FilteredProductType[], searchName: string, prices: number[]})=>{
        if(searchName) {
            remainingProduct = remainingProduct.filter(product=> product.title.toLowerCase().includes(searchName.toLowerCase()))
          }
          if(prices.length >= 2){
              remainingProduct = remainingProduct.filter(product=> (prices[0] <= product.price && product.price <= prices[1]))
          }
     return remainingProduct

}

export const filteredProduct = createSelector(
   productSelector,
   searchNameSelector,
   categoryFilterSelector,
   priceFilterSelector,
  (products, searchName, categories, prices) => {
    let remainingProduct: FilteredProductType[] = products;
    if(!categories.includes('All')){
        remainingProduct = remainingProduct.filter(product=> categories.includes(product.category_id.title))
        return filterByPricesAndSearchName({remainingProduct, searchName, prices})
    }else{
       return filterByPricesAndSearchName({remainingProduct, searchName, prices})
    }
  }
)