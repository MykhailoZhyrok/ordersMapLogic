import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../axios/axios';
import { OrderItemInt } from '../types/typeIndex';
import { RootState } from '../store/store';

export interface FilterCriteria {
  category?: string;
}


export interface OrderState {
    data: OrderItemInt[];
    categories: string[]; 
    loading: boolean;
    error: string | null;
    filterCriteria: FilterCriteria;
  }

  const initialState: OrderState = {
    data: [],
    categories: [], 
    loading: false,
    error: null,
    filterCriteria: {},
  };


  const getUniqueCategories = (products: OrderItemInt[]): string[] => {
    return ['All', ...new Set(products.map((product) => product.category))];
  };

export const fetchOrders = createAsyncThunk<OrderItemInt[], void>(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderItemInt[]>('/');
      console.log(response.data)
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filterCriteria.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderItemInt[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.categories = getUniqueCategories(action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const selectFilteredOrders = (state: RootState) => {
    const { data, filterCriteria } = state.orders;
    return data.filter((order) => {
      if (filterCriteria.category && order.category !== filterCriteria.category) return false;
      return true;
    });
  };


  export const selectCategories = (state: RootState) => state.orders.categories;


export const { setCategoryFilter } = orderSlice.actions;
export default orderSlice.reducer;
