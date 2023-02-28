import { createSlice } from "@reduxjs/toolkit";
import { ISavingsBank, ITransactionsBank } from "../../shared/interfaces";

interface IInitStateProps {
    TransictionsList: ITransactionsBank[];
    SavingsList: ISavingsBank[];
}


const initialState: IInitStateProps = {
    TransictionsList: [
      {
        _id: "saving1",
        type: "deposit",
        amount: 1000,
        description: "description",
        date: new Date("2022-01-27T14:30:00Z"),
      },
      {
        _id: "saving1",
        type: "withdraw",
        amount: 20000,
        description: "description",
        date: new Date("2022-02-01T15:30:00Z"),
      },
      {
        _id: "saving1",
        type: "transfer",
        amount: 2000,
        description: "description",
        date: new Date("2022-02-01T16:30:00Z"),
      },
      {
        _id: "saving1",
        type: "deposit",
        amount: 20000,
        description: "description",
        date: new Date("2022-02-01T17:30:00Z"),
      }
    ],
    SavingsList: [
        {
            _id: "saving1",
            amount: 1000,
            duration: 30,
            interest: 2,
            dateStart: new Date("2023-02-20T20:30:00Z"),
        },
        {
            _id: "saving2",
            amount: 1000,
            duration: 2,
            interest: 2,
            dateStart: new Date("2023-02-18T20:30:00Z"),
        }
    ],
};

export const bankSystemSlice = createSlice({
    name: "bankSystem",
    initialState,
    reducers: {
      setTransactionsBankList: (state, action) => ({
        ...state,
        TransictionsList: action.payload,
      }),
      setSavingsBankList: (state, action) => ({
        ...state,
        SavingsList: action.payload,
      }),
    },
  });
  export const { setTransactionsBankList, setSavingsBankList } =
  bankSystemSlice.actions;
  export default bankSystemSlice.reducer;
