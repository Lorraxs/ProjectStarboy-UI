import { EInventoryRarity } from "./inventory.interface";

export type IItemType =
  | "standard"
  | "weapon"
  | "ped-component"
  | "ped-prop"
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
