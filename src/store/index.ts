import { configureStore } from "@reduxjs/toolkit";
import player from "./player";
import cartGrocery from "./groceryStore";
import menu from "./menu";
import weaponShop from "./weapon-shop";
import vehicleShop from "./vehicleShop";
import bankSystem from "./bankSystem";

export const store = configureStore({
  reducer: {
    player,
    cartGrocery,
    menu,
    weaponShop,
    vehicleShop,
    bankSystem,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
