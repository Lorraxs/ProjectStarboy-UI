import { EPlayerInventorySlot } from "../interfaces/inventory.interface";

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
    slot === EPlayerInventorySlot.TOP
  );
};
