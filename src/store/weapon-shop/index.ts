import { createSlice } from "@reduxjs/toolkit";
import { IWeaponShop } from "../../shared/interfaces";

interface IInitStateProps {
  items: IWeaponShop[];
  shopIdx: number;
}

const initialState: IInitStateProps = {
  items: [
    {
      name: "AMMO_RIFLE",
      type: "ammo",
      price: 1000,
      damage: 13,
      range: 13,
      firerate: 13,
      accuracy: 13,
      control: 13,
    },
    {
      type: "weapon",
      price: 1000,
      damage: 13,
      range: 13,
      firerate: 13,
      accuracy: 13,
      control: 13,
      name: "weapon_bottle",
    },
  ],
  shopIdx: 0,
};

export const weaponShopSlice = createSlice({
  name: "weaponShop",
  initialState,
  reducers: {
    setWeaponShopItems: (state, action) => ({
      ...state,
      items: action.payload,
    }),
    setWeaponShopIndex: (state, action) => ({
      ...state,
      shopIdx: action.payload,
    }),
  },
});
export const { setWeaponShopItems, setWeaponShopIndex } =
  weaponShopSlice.actions;
export default weaponShopSlice.reducer;
