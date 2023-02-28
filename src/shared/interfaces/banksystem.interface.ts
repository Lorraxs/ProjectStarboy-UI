export interface IDialogBank {
    deposit: boolean,
    withDraw: boolean,
    transfer: boolean
}

export interface IDataBank{
    amount?: number,
    targetPlayerID?: number,
    type: string,
}

export interface ITransactionsBank{
    _id: string,
    type : "deposit" | "withdraw" | "transfer",
    amount: number,
    description: string,
    date: Date,
}

export interface ISavingsBank{
    _id: string,
    amount: number,
    duration: number,
    dateStart: Date,
    interest: number, // lãi suất
}

export interface ISavingsCreate{
    amount: number,
    duration: number,
    interest: number,
}


export type IDurationBankType = 5 | 7 | 14 | 30 | 60 | 90