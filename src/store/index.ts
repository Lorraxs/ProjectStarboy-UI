import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import player from "./player";

export const store = configureStore({
  reducer: {
    player,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
