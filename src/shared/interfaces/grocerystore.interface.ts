import { eStatus } from "./status.interface";
import { createContext } from 'react';

export const GroceryStoreType = [ //Shop category
    "Food" , 
    "Drink" , 
    "Tools" , 
    "Items",
    "Technological", 
]

export enum EGroceryStoreTypeSubTittle { //Shop category subtittle
    Food = "Đồ ăn",
    Drink = "Đồ uống",
    Tools = "Công cụ",
    Items = "Vật phẩm",
    Technological = "Đồ công nghệ",
}

export const GroceryStoreListItem = { // Product list of each list
    Food: [
        "bread",
        "hamburger",
        "socola",
        "hotdog",
        "noodles",
    ],
    Drink: [
        "water",
        "redbull",
        "monster",
        "wine",
        "beer",
        "milk",
    ],
    Tools: [
        "drill",
        "fishingrod",
        "fixkit",
        "pickaxe",
    ],
    Items: [
        "bandage",
        "gacha_ingame",
        "medikit",
    ],

    Technological: [
        "phone",
        "gameboy"
    ],
}

export enum EGroceryStoreUsesLevel { //Shop category subtittle
    high = "Cao",
    normal = "Trung bình",
    low = "Thấp",
}

export interface IGroceryStoreItem {
    tittle: string,
    description: string,
    type: string,
    price: number,
    weight: number,
    uses: string,
    level: string,
}


export const DefaultGroceryStoreItemInfomation : {[key:string]: IGroceryStoreItem}= {
    bread: {
        tittle: "Bánh mì",
        description: "tiểu mập",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    hamburger: {
        tittle: "Hamburger",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    socola: {
        tittle: "Socola",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    hotdog: {
        tittle: "Bánh Hotdog",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    noodles: {
        tittle: "Phở",
        description: "sss",
        type: "standard",
        price: 100000000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    water: {
        tittle: "Nước uống",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    redbull: {
        tittle: "Nước tăng lực RedBull",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    monster: {
        tittle: "Nước tăng lực Monster",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    wine: {
        tittle: "Rượu đế",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    beer: {
        tittle: "Bia Tiger",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    milk: {
        tittle: "Sữa tươi",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    drill: {
        tittle: "Máy khoan",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    fishingrod: {
        tittle: "Cần câu cá",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    fixkit: {
        tittle: "Bộ sửa chữa",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    pickaxe: {
        tittle: "Cuốc chim",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    bandage: {
        tittle: "Bandage",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    gacha_ingame: {
        tittle: "Hòm quay may mắn",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    medikit: {
        tittle: "Bộ sơ cứu",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    phone: {
        tittle: "Điện thoại",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    },
    gameboy: {
        tittle: "Máy chơi game",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung",
        level: "high"
    }
}