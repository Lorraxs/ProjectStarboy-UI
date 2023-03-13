import { IVehicleData, IWeaponData, ICraftingDefaultData } from "../interfaces";
import {
  EPlayerInventorySlot,
  EPlayerTransSlot,
  IInventory,
  IInventoryItem,
} from "../interfaces/inventory.interface";
import { IItem, IItemType } from "../interfaces/item.interface";
import ITEMS from "../items";
const WEAPON_DATA: IWeaponData = require("../json/WeaponData.json");
const VEHICLE_DATA: IVehicleData = require("../json/vehicleShop/vehicleData.json");

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

export const isBackpackSlot = (slot: string): boolean => {
  return (
    slot === EPlayerInventorySlot.BP_10 ||
    slot === EPlayerInventorySlot.BP_11 ||
    slot === EPlayerInventorySlot.BP_12 ||
    slot === EPlayerInventorySlot.BP_13 ||
    slot === EPlayerInventorySlot.BP_14 ||
    slot === EPlayerInventorySlot.BP_15 ||
    slot === EPlayerInventorySlot.BP_16 ||
    slot === EPlayerInventorySlot.BP_17 ||
    slot === EPlayerInventorySlot.BP_18 ||
    slot === EPlayerInventorySlot.BP_19 ||
    slot === EPlayerInventorySlot.BP_20 ||
    slot === EPlayerInventorySlot.BP_21 ||
    slot === EPlayerInventorySlot.BP_22 ||
    slot === EPlayerInventorySlot.BP_23 ||
    slot === EPlayerInventorySlot.BP_24 ||
    slot === EPlayerInventorySlot.BP_25 ||
    slot === EPlayerInventorySlot.BP_26 ||
    slot === EPlayerInventorySlot.BP_27 ||
    slot === EPlayerInventorySlot.BP_28 ||
    slot === EPlayerInventorySlot.BP_29
  );
};

export const isClotheType = (type: IItemType): boolean => {
  return (
    type === "accessory" ||
    type === "bag" ||
    type === "bracelet" ||
    type === "decal" ||
    type === "ear" ||
    type === "extend" ||
    type === "glass" ||
    type === "hat" ||
    type === "kevlar" ||
    type === "leg" ||
    type === "mask" ||
    type === "shoes" ||
    type === "top" ||
    type === "torsor" ||
    type === "undershirt" ||
    type === "watch"
  );
};

export const getClotheSlotByType = (type: IItemType) => {
  if (!isClotheType(type)) return;
  switch (type) {
    case "accessory":
      return EPlayerInventorySlot.ACCESSORY;
    case "bag":
      return EPlayerInventorySlot.BAG;
    case "bracelet":
      return EPlayerInventorySlot.BRACELET;
    case "decal":
      return EPlayerInventorySlot.DECAL;
    case "ear":
      return EPlayerInventorySlot.EAR;
    case "extend":
      return EPlayerInventorySlot.EXTEND;
    case "glass":
      return EPlayerInventorySlot.GLASS;
    case "hat":
      return EPlayerInventorySlot.HAT;
    case "kevlar":
      return EPlayerInventorySlot.KEVLAR;
    case "leg":
      return EPlayerInventorySlot.LEG;
    case "mask":
      return EPlayerInventorySlot.MASK;
    case "shoes":
      return EPlayerInventorySlot.SHOES;
    case "top":
      return EPlayerInventorySlot.TOP;
    case "torsor":
      return EPlayerInventorySlot.TORSOR;
    case "undershirt":
      return EPlayerInventorySlot.UNDERSHIRT;
    case "watch":
      return EPlayerInventorySlot.WATCH;
    default:
      return;
  }
};

export const isSlotAcceptItem = (slot: string, itemData: IItem): boolean => {
  const _isClotheSlot = isClotheSlot(slot);
  if (_isClotheSlot) {
    const itemNeedSlot = getClotheSlotByType(itemData.type);
    return itemNeedSlot === slot;
  } else {
    return true;
  }
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

export const isWeaponSlot = (slot: string): boolean => {
  return slot === EPlayerInventorySlot.WEAPON;
};

export const isAmmoSlot = (slot: string): boolean => {
  return slot === EPlayerInventorySlot.AMMO;
};

export const getItemDataByName = (itemName: string) => {
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    if (item.name === itemName) return item;
  }
  return;
};

export function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}

export const getWeight = (items: IInventoryItem[]): number => {
  let weight = 0;
  items.forEach((item) => {
    const itemData = getItemDataByName(item.name);
    if (itemData) {
      weight += itemData.weight;
    }
  });
  return weight;
};

export const getPlayerInventoryWeight = (intentory: IInventory): number => {
  let weight = 0;
  for (const slot of Object.values(EPlayerInventorySlot)) {
    const item = intentory[slot];
    if (item && item.length > 0) {
      const itemData = getItemDataByName(item[0].name);
      if (itemData) {
        weight += itemData.weight * item.length;
      }
    }
  }
  return weight;
};

export const getWeaponGroupByName = (weaponName: string) => {
  for (const weaponHash in WEAPON_DATA) {
    if (
      weaponName.toLowerCase() ===
      WEAPON_DATA[weaponHash].HashKey.toLocaleLowerCase()
    ) {
      return WEAPON_DATA[weaponHash].Group;
    }
  }
};


export const getVehicleGroupByName = (vehicleName: string) => {
  
  for (const spawncode in VEHICLE_DATA) {
    if (
      vehicleName.toLowerCase() ===
      VEHICLE_DATA[spawncode].spawncode.toLocaleLowerCase()
    ) {
      
      return VEHICLE_DATA[spawncode].category;
    }
  }
};
