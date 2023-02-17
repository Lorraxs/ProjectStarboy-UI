import {
  EPlayerInventorySlot,
  EPlayerTransSlot,
} from "../interfaces/inventory.interface";
import ITEMS from "../items";

export const Wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isClotheSlot = (slot: string): boolean => {
  return (
    slot === EPlayerInventorySlot.HAT ||
    slot === EPlayerInventorySlot.GLASS ||
    slot === EPlayerInventorySlot.EAR ||
    slot === EPlayerInventorySlot.WATCH ||
    slot === EPlayerInventorySlot.BRACELET ||
    slot === EPlayerInventorySlot.MASK ||
    slot === EPlayerInventorySlot.TORSOR ||
    slot === EPlayerInventorySlot.LEG ||
    slot === EPlayerInventorySlot.BAG ||
    slot === EPlayerInventorySlot.SHOES ||
    slot === EPlayerInventorySlot.ACCESSORY ||
    slot === EPlayerInventorySlot.UNDERSHIRT ||
    slot === EPlayerInventorySlot.KEVLAR ||
    slot === EPlayerInventorySlot.DECAL ||
    slot === EPlayerInventorySlot.TOP ||
    slot === EPlayerInventorySlot.EXTEND
  );
};

export const isFastSlot = (slot: string): boolean => {
  return (
    slot === EPlayerInventorySlot.FS_0 ||
    slot === EPlayerInventorySlot.FS_1 ||
    slot === EPlayerInventorySlot.FS_2 ||
    slot === EPlayerInventorySlot.FS_3 ||
    slot === EPlayerInventorySlot.FS_4
  );
};

export const isTransSlot = (slot: string): boolean => {
  return (
    slot === EPlayerTransSlot.T_0 ||
    slot === EPlayerTransSlot.T_1 ||
    slot === EPlayerTransSlot.T_2 ||
    slot === EPlayerTransSlot.T_3 ||
    slot === EPlayerTransSlot.T_4 ||
    slot === EPlayerTransSlot.T_5 ||
    slot === EPlayerTransSlot.T_6 ||
    slot === EPlayerTransSlot.T_7 ||
    slot === EPlayerTransSlot.P_0 ||
    slot === EPlayerTransSlot.P_1 ||
    slot === EPlayerTransSlot.P_2 ||
    slot === EPlayerTransSlot.P_3 ||
    slot === EPlayerTransSlot.P_4 ||
    slot === EPlayerTransSlot.P_5 ||
    slot === EPlayerTransSlot.P_6 ||
    slot === EPlayerTransSlot.P_7
  );
};

export const getItemDataByName = (itemName: string) => {
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    if (item.name === itemName) return item;
  }
  return;
};
