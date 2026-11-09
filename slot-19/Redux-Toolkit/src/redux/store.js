import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const logger = () => (next) => (action) => {
  if (typeof action !== 'function') console.log('[action]', action.type);
  return next(action);
};

function loadCart() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return { items: [] };

    const items = JSON.parse(savedCart);
    if (!Array.isArray(items)) throw new TypeError('Saved cart must be an array');
    return { items };
  } catch (error) {
    console.error('Unable to load the saved cart from localStorage.', error);
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cart: loadCart(),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.subscribe(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
  } catch (error) {
    console.error('Unable to save the cart to localStorage.', error);
  }
});