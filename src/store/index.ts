import { configureStore } from "@reduxjs/toolkit";
import player from "./player";
import cartGrocery from "./groceryStore";
import menu from "./menu";
import weaponShop from "./weapon-shop";
import vehicleShop from "./vehicleShop";
import bankSystem from "./bankSystem";
import garageSystem from "./garageSystem";
import craftingSystem from "./craftingSystem";

export const store = configureStore({
  reducer: {
    player,
    cartGrocery,
    menu,
    weaponShop,
    vehicleShop,
    bankSystem,
    garageSystem,
    craftingSystem
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
