import { createSelector, createSlice } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: PRODUCTS, keyword: '' },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = productsSlice.actions;
export default productsSlice.reducer;

const selectItems = (state) => state.products.items;
export const selectKeyword = (state) => state.products.keyword;

export const selectFilteredProducts = createSelector(
  [selectItems, selectKeyword],
  (items, keyword) => items.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase())),
);
