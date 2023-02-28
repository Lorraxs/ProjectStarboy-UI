import { createSlice } from "@reduxjs/toolkit";
import { IVehicleShop } from "../../shared/interfaces";

interface IInitStateProps {
    vehicles: IVehicleShop[];
    shopIdx: number;
}

const initialState: IInitStateProps = {
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
    },
  });
  export const { setVehicleShopItems, setVehicleShopIndex } =
  vehicleShopSlice.actions;
  export default vehicleShopSlice.reducer;
  