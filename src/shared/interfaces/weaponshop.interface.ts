import { eStatus } from "./status.interface";

export type IAmmoType =
  | "AMMO_PISTOL"
  | "AMMO_SMG"
  | "AMMO_RIFLE"
  | "AMMO_MG"
  | "AMMO_SHOTGUN"
  | "AMMO_STUNGUN"
  | "AMMO_SNIPER"
  | "AMMO_SNIPER_REMOTE"
  | "AMMO_GRENADELAUNCHER"
  | "AMMO_GRENADELAUNCHER_SMOKE"
  | "AMMO_RPG"
  | "AMMO_STINGER"
  | "AMMO_MINIGUN"
  | "AMMO_GRENADE"
  | "AMMO_STICKYBOMB"
  | "AMMO_SMOKEGRENADE"
  | "AMMO_BZGAS"
  | "AMMO_MOLOTOV"
  | "AMMO_FIREEXTINGUISHER"
  | "AMMO_PETROLCAN"
  | "AMMO_BALL"
  | "AMMO_FLARE"
  | "AMMO_TANK"
  | "AMMO_SPACE_ROCKET"
  | "AMMO_PLANE_ROCKET"
  | "AMMO_PLAYER_LASER"
  | "AMMO_ENEMY_LASER"
  | "AMMO_BIRD_CRAP"
  | "AMMO_PIPEBOMB"
  | "AMMO_HOMINGLAUNCHER"
  | "AMMO_PROXMINE"
  | "AMMO_SNOWBALL"
  | "AMMO_RIFLE_ARMORPIERCING"
  | "AMMO_RIFLE_FMJ"
  | "AMMO_RIFLE_INCENDIARY"
  | "AMMO_RIFLE_TRACER"
  | "AMMO_SNIPER_ARMORPIERCING"
  | "AMMO_SNIPER_FMJ"
  | "AMMO_SNIPER_INCENDIARY"
  | "AMMO_SNIPER_TRACER"
  | "AMMO_SHOTGUN_ARMORPIERCING"
  | "AMMO_SHOTGUN_EXPLOSIVE"
  | "AMMO_SHOTGUN_HOLLOWPOINT"
  | "AMMO_SHOTGUN_INCENDIARY"
  | "AMMO_PISTOL_FMJ"
  | "AMMO_PISTOL_HOLLOWPOINT"
  | "AMMO_PISTOL_INCENDIARY"
  | "AMMO_PISTOL_TRACER"
  | "AMMO_MG_ARMORPIERCING"
  | "AMMO_MG_FMJ"
  | "AMMO_MG_INCENDIARY"
  | "AMMO_MG_TRACER"
  | "AMMO_SNIPER_EXPLOSIVE"
  | "AMMO_SMG_FMJ"
  | "AMMO_SMG_HOLLOWPOINT"
  | "AMMO_SMG_INCENDIARY"
  | "AMMO_SMG_TRACER"
  | "AMMO_FLAREGUN"
  | "AMMO_FIREWORK"
  | "AMMO_RAILGUN";
  
export interface IWeaponData {
  [key: string]: {
    HashKey: string;
    NameGXT: string;
    DescriptionGXT: string;
    Name: string;
    Description: string;
    Group: string;
    ModelHashKey: string;
    DefaultClipSize: number;
    AmmoType: IAmmoType;
  };
}

export const WeaponShopType = [
  "Meele",
  "Handguns",
  "MiniGuns",
  "Shotguns",
  "AssaultRifles",
  "MachineGuns",
  "Ammo",
  "Components",
];

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