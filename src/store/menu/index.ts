import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlayer } from "../../shared/interfaces";
import { EPlayerInventorySlot } from "../../shared/interfaces/inventory.interface";
import { IMenu, IMenuElement } from "../../shared/interfaces/menu.interface";

const initialState: IMenu = {
  elements: [
    {
      label: "Tôi muốn mua vũ khí",
      value: "test_1",
    },
    { label: "Tôi muốn mua đạn 2", value: "test_2" },
  ],
  conversation: {
    name: "Chủ cửa hàng vũ khí",
    message: "Tôi có thể giúp gì cho bạn?",
  },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuData: (state, action) => {
      return action.payload;
    },
    setMenuElements: (state, action) => ({
      ...state,
      elements: action.payload,
    }),
    setMenuConversation: (state, action) => ({
      ...state,
      conversation: action.payload,
    }),
  },
});
export const { setMenuData, setMenuElements, setMenuConversation } =
  menuSlice.actions;
export default menuSlice.reducer;
