import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlayer } from "../../shared/interfaces";

const initialState: IPlayer = {
  _id: "",
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
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
