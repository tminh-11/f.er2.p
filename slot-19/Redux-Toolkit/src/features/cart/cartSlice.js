import { createSelector, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQty(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart() {
      return { items: [] };
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
export const selectQtyInCart = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
