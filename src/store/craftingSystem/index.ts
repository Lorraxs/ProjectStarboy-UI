import { createSlice } from "@reduxjs/toolkit";
import { EPlayerInventorySlot } from "../../shared/interfaces/inventory.interface";
import { IPlayerInventoryCraft } from "../../shared/interfaces";


const initialState: IPlayerInventoryCraft = {
    tableIdx: 0,
    inventory: {
    [EPlayerInventorySlot.BP_0]: [
        {
            name: "bread",
        },
        {
            name: "bread",
        },
        {
            name: "bread",
        },
        {
            name: "bread",
        },
        {
            name: "bread",
        },
        {
            name: "bread",
        },
    ],
    [EPlayerInventorySlot.BP_1]: [
        {
            name: "water",
        },
        {
            name: "water",
        },
        {
            name: "water",
        },
        {
            name: "water",
        },
        {
            name: "water",
        },
    ],
    }
};

export const craftingSystemSlice = createSlice({
    name: "craftingSystem",
    initialState,
    reducers: {
        setPlayerInventoryCraft: (state, action) => ({
            ...state,
            inventory: action.payload,
        }),
        setCraftTableIndex: (state, action) => ({
            ...state,
            tableIdx: action.payload,
        }),
    }
});

export const {setPlayerInventoryCraft, setCraftTableIndex} = craftingSystemSlice.actions;

export default craftingSystemSlice.reducer;

