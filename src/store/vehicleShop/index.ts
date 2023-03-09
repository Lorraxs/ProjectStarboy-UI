import { createSlice } from "@reduxjs/toolkit";
import { IColorVehicleItem, IVehicleShop } from "../../shared/interfaces";
import COLOR_VEHICLE from "../../shared/json/vehicleShop/colorVehicle.json";

interface IInitStateProps {
  vehicles: IVehicleShop[];
  shopIdx: number;
  testPrice: number;
  primaryColor: IColorVehicleItem;
  secondaryColor: IColorVehicleItem;
}

const initialState: IInitStateProps = {
<<<<<<< HEAD
    vehicles: [
      {
        spawncode: "adder",
        price: 1000,
        description: "description"
      },
      {
        spawncode: "bison",
        price: 1000,
        description: "description"
      },
      {
        spawncode: "xa21",
        price: 1000,
        description: "description"
      },
    ],
    shopIdx: 0,
};
  
export const vehicleShopSlice = createSlice({
    name: "vehicleShop",
    initialState,
    reducers: {
      setVehicleShopItems: (state, action) => ({
        ...state,
        items: action.payload,
      }),
      setVehicleShopIndex: (state, action) => ({
        ...state,
        shopIdx: action.payload,
      }),
=======
  vehicles: [
    {
      spawncode: "adder",
      price: 1000,
>>>>>>> master
    },
    {
      spawncode: "bison",
      price: 1000,
    },
    {
      spawncode: "xa21",
      price: 1000,
    },
  ],
  shopIdx: 0,
  testPrice: 2500,
  primaryColor: COLOR_VEHICLE[0],
  secondaryColor: COLOR_VEHICLE[0],
};

export const vehicleShopSlice = createSlice({
  name: "vehicleShop",
  initialState,
  reducers: {
    setVehicleShopData: (state, action) => ({ ...state, ...action.payload }),
  },
});
export const { setVehicleShopData } = vehicleShopSlice.actions;
export default vehicleShopSlice.reducer;
