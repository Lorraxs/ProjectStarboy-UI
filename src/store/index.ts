import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import player from "./player";
import cartGrocery from "./groceryStore"

export const store = configureStore({
  reducer: {
    player,
    cartGrocery
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
