import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlayer } from "../../shared/interfaces";

const initialState: IPlayer = {
  _id: "",
  id: 1,
  name: "",
  email: "",
  gender: "male",
  health: 0,
  armour: 0,
  verified: false,
  money: 0,
  bank: 0,
  coin: 0,
  coords: [0, 0, 0],
  inventory: {},
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerData: (state, action) => {
      return action.payload;
    },
    setPlayerInventory: (state, action) => ({
      ...state,
      inventory: action.payload,
    }),
    setPlayerCoords: (state, action) => ({ ...state, coords: action.payload }),
    setPlayerMoney: (state, action) => ({ ...state, money: action.payload }),
    setPlayerBank: (state, action) => ({ ...state, bank: action.payload }),
    setPlayerCoin: (state, action) => ({ ...state, coin: action.payload }),
    setPlayerHealth: (state, action) => ({ ...state, health: action.payload }),
    setPlayerArmour: (state, action) => ({ ...state, armour: action.payload }),
    setPlayerBlackMoney: (state, action) => ({
      ...state,
      blackMoney: action.payload,
    }),
  },
});
export const {
  setPlayerData,
  setPlayerInventory,
  setPlayerCoords,
  setPlayerMoney,
  setPlayerBank,
  setPlayerCoin,
  setPlayerHealth,
  setPlayerArmour,
  setPlayerBlackMoney,
} = playerSlice.actions;
export default playerSlice.reducer;
