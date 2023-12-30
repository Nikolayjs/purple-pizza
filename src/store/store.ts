import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_TOKEN } from './userSlice';
import { saveState } from './storage';
import cartSlice, { CART_PERSISTENCE_KEY } from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState(JWT_TOKEN, { token: store.getState().user.token });
  saveState(CART_PERSISTENCE_KEY, store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
