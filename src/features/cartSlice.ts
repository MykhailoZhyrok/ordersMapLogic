import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItemInt } from '../types/typeIndex';
import { RootState } from '../store/store';

export interface CartItem extends OrderItemInt {
  quantity: number;
}


interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Не вдалося завантажити кошик з localStorage', e);
      return [];
    }
  };

  const saveCartToLocalStorage = (items: CartItem[]) => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (e) {
      console.error('Не вдалося зберегти кошик у localStorage', e);
    }
  };

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderItemInt>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }


      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.items);
    }
  },
});


export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCartItems = (state: RootState) => state.cart.items;


export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
