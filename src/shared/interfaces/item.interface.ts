import { EInventoryRarity } from "./inventory.interface";

export type IItemType =
  | "standard"
  | "weapon"
  | "hat"
  | "glass"
  | "ear"
  | "watch"
  | "bracelet"
  | "mask"
  | "torsor"
  | "leg"
  | "bag"
  | "shoes"
  | "accessory"
  | "undershirt"
  | "kevlar"
  | "decal"
  | "top"
  | "extend"
  | "weapon-component"
  | "weapon-ammo";
export interface IItem {
  name: string;
  label: string;
  weight: number;
  limit: number;
  description: string;
  canUse: boolean;
  canTransfer: boolean;
  canDrop: boolean;
  expiration: number;
  stability: number;
  type: IItemType;
  rarity: EInventoryRarity;
}
