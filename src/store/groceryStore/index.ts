import { createSlice } from "@reduxjs/toolkit";
import {
  IGroceryStoreCart,
  IGroceryStoreItem,
  eGroceryStoreType,
} from "../../shared/interfaces";

interface IInitialState {
  products: IGroceryStoreItem[];
  cart: IGroceryStoreCart[];
  storeIdx: number;
}

const initialState: IInitialState = {
  products: [
    {
      name: "bread",
      price: 1500,
      category: eGroceryStoreType.food,
    },
  ],
  cart: [],
  storeIdx: 0,
};

const cartSlice = createSlice({
  name: "groceryStore",
  initialState,
  reducers: {
    setGroceryStore: (state, action) => action.payload,
    addGroceryStoreCart: (state, action) => {
      const cartItem = state.cart.find((e) => e.name === action.payload.name);
      if (cartItem !== undefined) {
        cartItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    resetGroceryStore: () => initialState,
    increaseCartQuantity: (state, action) => {
      const cartItem = state.cart.find((e) => e.name === action.payload);
      if (cartItem) {
        cartItem.quantity++;
      }
      return state;
    },
    decreaseCartQuantity: (state, action) => {
      const cartItem = state.cart.find((e) => e.name === action.payload);
      if (cartItem) {
        cartItem.quantity--;
      }
      return state;
    },
  },
});

export const {
  setGroceryStore,
  addGroceryStoreCart,
  resetGroceryStore,
  increaseCartQuantity,
  decreaseCartQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;