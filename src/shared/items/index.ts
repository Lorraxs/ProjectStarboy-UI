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
    rarity: EInventoryRarity.EPIC,
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
];

export default ITEMS;
