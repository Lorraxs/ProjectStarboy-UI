import { eStatus } from "./status.interface";

export enum EPlayerInventorySlot {
  FS_0 = "FS_0",
  FS_1 = "FS_1",
  FS_2 = "FS_2",
  FS_3 = "FS_3",
  FS_4 = "FS_4",
  PK_0 = "PK_0",
  PK_1 = "PK_1",
  PK_2 = "PK_2",
  PK_3 = "PK_3",
  PK_4 = "PK_4",
  PK_5 = "PK_5",
  HAT = "HAT",
  GLASS = "GLASS",
  EAR = "EAR",
  WATCH = "WATCH",
  BRACELET = "BRACELET",
  MASK = "MASK",
  TORSOR = "TORSOR",
  LEG = "LEG",
  BAG = "BAG",
  SHOES = "SHOES",
  ACCESSORY = "ACCESSORY",
  UNDERSHIRT = "UNDERSHIRT",
  KEVLAR = "KEVLAR",
  DECAL = "DECAL",
  TOP = "TOP",
  EXTEND = "EXTEND",
  BP_0 = "BP_0",
  BP_1 = "BP_1",
  BP_2 = "BP_2",
  BP_3 = "BP_3",
  BP_4 = "BP_4",
  BP_5 = "BP_5",
  BP_6 = "BP_6",
  BP_7 = "BP_7",
  BP_8 = "BP_8",
  BP_9 = "BP_9",
  BP_10 = "BP_10",
  BP_11 = "BP_11",
  BP_12 = "BP_12",
  BP_13 = "BP_13",
  BP_14 = "BP_14",
  BP_15 = "BP_15",
  BP_16 = "BP_16",
  BP_17 = "BP_17",
  BP_18 = "BP_18",
  BP_19 = "BP_19",
  BP_20 = "BP_20",
  BP_21 = "BP_21",
  BP_22 = "BP_22",
  BP_23 = "BP_23",
  BP_24 = "BP_24",
  BP_25 = "BP_25",
  BP_26 = "BP_26",
  BP_27 = "BP_27",
  BP_28 = "BP_28",
  BP_29 = "BP_29",
  WEAPON = "WEAPON",
  AMMO = "AMMO",
}

export enum EPlayerTransSlot {
  P_0 = "P_0",
  P_1 = "P_1",
  P_2 = "P_2",
  P_3 = "P_3",
  P_4 = "P_4",
  P_5 = "P_5",
  P_6 = "P_6",
  P_7 = "P_7",
  T_0 = "T_0",
  T_1 = "T_1",
  T_2 = "T_2",
  T_3 = "T_3",
  T_4 = "T_4",
  T_5 = "T_5",
  T_6 = "T_6",
  T_7 = "T_7",
}

export type IIventoryType = "player" | "vehicle" | "property";
export enum EInventoryRarity {
  COMMON,
  UNCOMMON,
  RARE,
  EPIC,
  LEGENDARY,
}
export interface IItemComponent {
  skin?: string;
  scope?: string;
  suppressor?: string;
  clip?: string;
  grip?: string;
  flashlight?: string;
}
export interface IInventoryItem {
  name: string;
  expiration?: number;
  stability?: number;
  component?: IItemComponent;
}
export interface IInventory {
  [key: string]: IInventoryItem[];
}

export interface IAddInventoryItem {
  itemName: string;
  slot?: string;
  amount: number;
  reason?: string;
}

export interface IPlayerCanCarryItem {
  itemName: string;
  amount: number;
}

export interface IHasItem {
  status: eStatus;
  slots?: string[];
  amount?: number;
  message?: string;
}

export interface IInventoryResponse {
  status: eStatus;
  message?: string;
}
