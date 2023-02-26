import { eStatus } from "./status.interface";

export const WeaponShopType = [ 
    "Meele" , 
    "Handguns" , 
    "MiniGuns" , 
    "Shotguns", 
    "AssaultRifles", 
    "MachineGuns", 
    "Ammo", 
    "Components"
]

export enum EWeaponShopTypeSubTittle {
    Meele = "Cận chiến",
    Handguns = "Súng ngắn",
    MiniGuns = "Tiểu liên",
    Shotguns = "Shotgun",
    AssaultRifles = "Súng trường",
    MachineGuns = "Súng máy",
    Ammo = "Đạn",
    Components = "Phụ kiện",
    
}

export const WeaponListType = {
  Meele: [
    "weapon_dagger",
    "weapon_bat",
    "weapon_bottle",
    "weapon_crowbar",
    "weapon_flashlight",
    "weapon_golfclub",
    "weapon_hammer",
    "weapon_hatchet",
    "weapon_knuckle",
    "weapon_knife",
    "weapon_machete",
    "weapon_switchblade",
    "weapon_nightstick",
    "weapon_wrench",
    "weapon_battleaxe",
    "weapon_poolcue",
    "weapon_stone_hatchet",
  ],
  Handguns: [
    "weapon_pistol",
    "weapon_pistol_mk2",
    "weapon_combatpistol",
    "weapon_appistol",
    "weapon_stungun",
    "weapon_pistol50",
    "weapon_snspistol",
    "weapon_snspistol_mk2",
    "weapon_heavypistol",
    "weapon_vintagepistol",
    "weapon_marksmanpistol",
    "weapon_revolver",
    "weapon_revolver_mk2",
    "weapon_doubleaction",
    "weapon_raypistol",
    "weapon_ceramicpistol",
    "weapon_navyrevolver",
    "weapon_gadgetpistol",
  ],
  MiniGuns: [
    "weapon_microsmg",
    "weapon_smg",
    "weapon_smg_mk2",
    "weapon_assaultsmg",
    "weapon_combatpdw",
    "weapon_machinepistol",
    "weapon_minismg",
  ],
  Shotguns: [
    "weapon_pumpshotgun",
    "weapon_pumpshotgun_mk2",
    "weapon_sawnoffshotgun",
    "weapon_assaultshotgun",
    "weapon_bullpupshotgun",
    "weapon_musket",
    "weapon_heavyshotgun",
    "weapon_dbshotgun",
    "weapon_autoshotgun",
    "weapon_combatshotgun",
  ],
  AssaultRifles: [
    "weapon_assaultrifle",
    "weapon_assaultrifle_mk2",
    "weapon_carbinerifle",
    "weapon_carbinerifle_mk2",
    "weapon_advancedrifle",
    "weapon_specialcarbine",
    "weapon_specialcarbine_mk2",
    "weapon_bullpuprifle",
    "weapon_bullpuprifle_mk2",
    "weapon_compactrifle",
    "weapon_militaryrifle",
    "weapon_heavyrifle",
    "weapon_tacticalrifle",
  ],
  MachineGuns: [
    "weapon_mg",
    "weapon_combatmg",
    "weapon_combatmg_mk2",
    "weapon_gusenberg",
  ],
  Ammo: ["ammo_rifle", "ammo_smg", "ammo_shotgun", "ammo_pistol"],
  Components: [
    //empty
  ],
};

export interface IWeaponShop {
  name: string;
  type: string;
  price: number;
  damage: number;
  range: number;
  firerate: number;
  accuracy: number;
  control: number;
}

export type IWeaponGroup =
  | "GROUP_SHOTGUN"
  | "GROUP_SNIPER"
  | "GROUP_FIREEXTINGUISHER"
  | "GROUP_HEAVY"
  | "GROUP_THROWN"
  | "GROUP_PISTOL"
  | "GROUP_SMG"
  | "GROUP_PETROLCAN"
  | "GROUP_STUNGUN"
  | "GROUP_RIFLE"
  | "GROUP_MG"
  | "GROUP_UNARMED"
  | "GROUP_METALDETECTOR"
  | "GROUP_MELEE";

export const LIST_WEAPON_GROUP = [
  "GROUP_SHOTGUN",
  "GROUP_SNIPER",
  //"GROUP_FIREEXTINGUISHER",
  "GROUP_HEAVY",
  "GROUP_THROWN",
  "GROUP_PISTOL",
  "GROUP_SMG",
  "GROUP_PETROLCAN",
  "GROUP_STUNGUN",
  "GROUP_RIFLE",
  "GROUP_MG",
  //"GROUP_UNARMED",
  //"GROUP_METALDETECTOR",
  "GROUP_MELEE",
];

export interface IBuyData {
  name: string;
  totalPrice: number;
  type: "ammo" | "weapon";
  paymentMethod: "cash" | "bank";
  storeIndex: number;
}
