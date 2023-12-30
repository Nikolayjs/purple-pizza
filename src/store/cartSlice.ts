import { loadState } from './storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const CART_PERSISTENCE_KEY = 'cart';
type CartItem = {
  id: number;
  count: number;
};
interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENCE_KEY) ?? {
  items: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      } else {
        state.items.map((i) => {
          if (i.id === action.payload) {
            i.count += 1;
          }
          return i;
        });
      }
    },
    removeFromCart: (state, action) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (existed) {
        if (existed.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        state.items = state.items.map((i) => {
          if (i.id === action.payload && i.count > 1) {
            i.count -= 1;
          }
          return i;
        });
        return;
      }
    },
    clearCart: (state, action) => {
      console.log(action.payload, state.items);
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
