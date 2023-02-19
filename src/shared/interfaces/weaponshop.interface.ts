import { eStatus } from "./status.interface";

export const WeaponShopType = [ 
    "Meele" , 
    "Handguns" , 
    "MiniGuns" , 
    "Shotguns", 
    "AssaultRifles", 
    "MachineGuns", 
    "Ammo", 
    "Components"]

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
    Ammo: [
        "ammo_rifle",
        "ammo_smg",
        "ammo_shotgun",
        "ammo_pistol",
    ],
    Components:[
       //empty
    ],
}

export interface IWeaponShop {
    tittle: string,
    description: string,
    type: string,
    price: number,
    damage: number,
    range: number,
    firerate: number,
    accuracy: number,
    control: number,
}

export const DefaultWeaponInfomation: {[key: string]: IWeaponShop} = {
    ammo_rifle : {
        tittle: "Đạn súng trường",
        description: "sss",
        type: "ammo",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    ammo_smg : {
        tittle: "Đạn súng tiểu liên",
        description: "sss",
        type: "ammo",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    ammo_shotgun : {
        tittle: "Đạn Shotgun",
        description: "sss",
        type: "ammo",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    ammo_pistol : {
        tittle: "Đạn súng ngắn",
        description: "sss",
        type: "ammo",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_dagger : {
        tittle: "Dao kỵ binh",
        description: "Là một vũ khí cận chiến, con dao sắc bén này được rèn bởi những kị binh cổ đại",
        type: "weapon",
        price: 230000,
        damage: 24,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_bat : {
        tittle: "Gậy bóng chày",
        description: "Là một vũ khí cận chiến, gậy bóng chày được chế tạo bằng gỗ hoặc hợp kim kim loại có sức sát thương lớn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_bottle : {
        tittle: "Chai vỡ",
        description: "Là một vũ khí cận chiến, chai vỡ là một đồ chơi nguy hiểm với các cạnh sắc nhọn và có sức sát thương rất cao",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_crowbar : {
        tittle: "Xà beng",
        description: "Là một vũ khí cận chiến, công cụ của các bác thợ xây có thể bổ bể đầu các thanh niên nào dám kiếm chuyện với bạn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_flashlight : {
        tittle: "Đèn pin",
        description: "Là một vũ khí cận chiến, hmm móc đèn pin ra khô máu nào các thanh niên",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_golfclub : {
        tittle: "Gậy đánh golf",
        description: "Là một vũ khí cận chiến, gậy đánh golf được tạo ra từ hợp kim nhôm với tầm với xa!!",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_hammer : {
        tittle: "Búa",
        description: "Là một vũ khí cận chiến, búa là một vũ khí có sát thương lớn với tay cầm chắc chắn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_hatchet : {
        tittle: "Rìu",
        description: "Là một vũ khí cận chiến, búa là một vũ khí có sát thương lớn với tay cầm chắc chắn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_knuckle : {
        tittle: "Nắm đấm thép",
        description: "Đừng ngần ngại mua nó và trở thành một tay đấm thép bất bại",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_knife : {
        tittle: "Dao găm",
        description: "Là một vũ khí cận chiến, được sử dụng trong quân đội sức sát thương lớn và cực kì nguy hiểm",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_machete : {
        tittle: "Dao rựa",
        description: "Là một vũ khí cận chiến, cực kì sắc bén có thể phân khúc kẻ thù ra làm nhiều mảnh",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_switchblade : {
        tittle: "Dao gạt",
        description: "Là một vũ khí cận chiến, tôi nghĩ nó phù hợp dùng để ám sát",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_nightstick : {
        tittle: "Ba ton",
        description: "Là một vũ khí cận chiến, gõ Bonk Bonk... bạn nghe được tiếng đó chứ",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_wrench : {
        tittle: "Cờ lê",
        description: "Là một vũ khí cận chiến, bạn có thể mua về sửa xe hay gõ đầu ai đó làm hư xe của bạn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_battleaxe : {
        tittle: "Rìu dã chiến",
        description: "Là một vũ khí cận chiến, chế tạo chắc chắn và rất đa năng",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_poolcue : {
        tittle: "Gậy Bida",
        description: "Là một vũ khí cận chiến, có thể dùng để đánh Bida hoặc cũng có thể để đánh thằng cua NY bạn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_stone_hatchet : {
        tittle: "Rìu Đá",
        description: "Là một vũ khí cận chiến, phong cách cổ điển , chém đằm tay hơn đồ sắt đấy!!!",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_pistol : {
        tittle: "Pistol",
        description: "Súng lục (tiếng Anh: pistol) là một loại con của súng ngắn, những loại phổ biến nhất trong số đó hiện nay là súng ngắn bán tự động và Derringer. Sử dụng loại đạn 9mm cực kì uy lực",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_pistol_mk2 : {
        tittle: "Pistol Mk II",
        description: "Là một phiên bản nâng cấp của Pistol với thiết kế và nguyên liệu chế tạo tốt hơn, uy lực và độ chính xác cao hơn",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_combatpistol : {
        tittle: "Combat Pistol",
        description: "Súng ngắn chiến đấu có dạng một khẩu súng lục nhỏ gọn gần giống với một khẩu HK P2000 kết hợp với súng Beretta PX4. Nó chứa 12 viên đạn mỗi băng (có thể được thay thế bằng một băng 16 viên)",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_appistol : {
        tittle: "AP Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_stungun : {
        tittle: "Stun Gun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_pistol50 : {
        tittle: "Pistol .50",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_snspistol : {
        tittle: "SNS Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_snspistol_mk2 : {
        tittle: "SNS Pistol Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_heavypistol : {
        tittle: "Heavy Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_vintagepistol : {
        tittle: "Vintage Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_flaregun : {
        tittle: "Flare Gun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_marksmanpistol : {
        tittle: "Marksman Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_revolver : {
        tittle: "Heavy Revolver",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_revolver_mk2 : {
        tittle: "Heavy Revolver Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_doubleaction : {
        tittle: "Double Action Revolver",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_raypistol : {
        tittle: "Súng Plasma",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_ceramicpistol : {
        tittle: "Ceramic Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_navyrevolver : {
        tittle: "Navy Revolver",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_gadgetpistol : {
        tittle: "Perico Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_microsmg : {
        tittle: "Micro SMG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_smg : {
        tittle: "SMG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_smg_mk2 : {
        tittle: "SMG Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_assaultsmg : {
        tittle: "Assault SMG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_combatpdw : {
        tittle: "Combat PDW",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_machinepistol : {
        tittle: "Machine Pistol",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_minismg : {
        tittle: "Mini SMG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_pumpshotgun : {
        tittle: "Pump Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_pumpshotgun_mk2 : {
        tittle: "Pump Shotgun Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_sawnoffshotgun : {
        tittle: "Sawed-Off Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_assaultshotgun : {
        tittle: "Assault Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_bullpupshotgun : {
        tittle: "Bullpup Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_musket : {
        tittle: "Musket",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_heavyshotgun : {
        tittle: "Heavy Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_dbshotgun : {
        tittle: "Double Barrel Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_autoshotgun : {
        tittle: "Sweeper Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_combatshotgun : {
        tittle: "Combat Shotgun",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_assaultrifle : {
        tittle: "Assault Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_assaultrifle_mk2 : {
        tittle: "Assault Rifle Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_carbinerifle : {
        tittle: "Carbine Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_carbinerifle_mk2 : {
        tittle: "Carbine Rifle Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_advancedrifle : {
        tittle: "Advanced Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_specialcarbine : {
        tittle: "Special Carbine",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_specialcarbine_mk2 : {
        tittle: "Special Carbine Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_bullpuprifle : {
        tittle: "Bullpup Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_bullpuprifle_mk2 : {
        tittle: "Bullpup Rifle Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_compactrifle : {
        tittle: "Compact Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_militaryrifle : {
        tittle: "Military Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_heavyrifle : {
        tittle: "Heavy Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_tacticalrifle : {
        tittle: "Tactical Rifle",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_mg : {
        tittle: "MG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_combatmg : {
        tittle: "Combat MG",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_combatmg_mk2 : {
        tittle: "Combat MG Mk II",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    },
    weapon_gusenberg : {
        tittle: "Gusenberg Sweeper",
        description: "sss",
        type: "weapon",
        price: 1000,
        damage: 13,
        range: 13,
        firerate: 13,
        accuracy: 13,
        control: 13
    }
    
}

