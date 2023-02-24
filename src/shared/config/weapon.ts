import Config from ".";
import { IWeaponShop } from "../interfaces/weaponshop.interface";

export interface IConfigWeaponShop {
  coords: number[];
  pedModel: string;
  pedRelationShip?: string;
  voiceName?: string;
  items: IWeaponShop[];
}

export const ConfigWeaponShop: IConfigWeaponShop[] = [
  {
    coords: [
      23.666833877563477, -1105.4969482421875, 29.797027587890625,
      159.21778869628906,
    ],
    pedModel: "s_m_m_ammucountry",
    pedRelationShip: "gunshop",
    voiceName: "S_M_M_AMMUCOUNTRY_WHITE_MINI_01",
    items: [
      {
        name: "AMMO_RIFLE",
        type: "ammo",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13,
      },
      {
        type: "weapon",
        price: 10000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13,
        name: "WEAPON_BOTTLE",
      },
      {
        type: "weapon",
        price: 20000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13,
        name: "WEAPON_PISTOL",
      },
    ],
  },
];
