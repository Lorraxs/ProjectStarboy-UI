import { eAmmoType } from "../interfaces/gta.interface";
import {
  EInventoryRarity,
  IInventoryItem,
} from "../interfaces/inventory.interface";
import { IItem } from "../interfaces/item.interface";

const ITEMS: IItem[] = [
  {
    name: "bread",
    label: "Bánh mì",
    weight: 100,
    limit: 10,
    description: "Dùng để ăn khi đói",
    canUse: true,
    canTransfer: true,
    canDrop: true,
    expiration: 48 * 60 * 60,
    stability: -1,
    type: "standard",
    rarity: EInventoryRarity.LEGENDARY,
  },
  {
    name: "water",
    label: "Nước",
    weight: 100,
    limit: 10,
    description: "Dùng để uống khi khát",
    canUse: true,
    canTransfer: true,
    canDrop: true,
    expiration: 48 * 60 * 60,
    stability: -1,
    type: "standard",
    rarity: EInventoryRarity.EPIC,
  },

  //WEAPON HERE
  {
    name: "WEAPON_PISTOL",
    label: "Pistol",
    weight: 730,
    limit: 1,
    description: "Pistol",
    canUse: true,
    canTransfer: true,
    canDrop: true,
    expiration: -1,
    stability: -1,
    type: "weapon",
    rarity: EInventoryRarity.UNCOMMON,
  },

  //AMMO HERE
  {
    name: "WEAPON_PISTOL",
    label: "Pistol",
    weight: 730,
    limit: 1,
    description: "Pistol",
    canUse: true,
    canTransfer: true,
    canDrop: true,
    expiration: -1,
    stability: -1,
    type: "weapon",
    rarity: EInventoryRarity.UNCOMMON,
  },
];

const ammoKeys = Object.keys(eAmmoType);
ammoKeys.forEach((ammo) => {
  ITEMS.push({
    name: ammo,
    label: "Pistol",
    weight: 730,
    limit: 1,
    description: "Pistol",
    canUse: true,
    canTransfer: true,
    canDrop: true,
    expiration: -1,
    stability: -1,
    type: "weapon",
    rarity: EInventoryRarity.UNCOMMON,
  });
});

export default ITEMS;
