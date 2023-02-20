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

export interface IGroceryStoreItem {
    tittle: string,
    description: string,
    type: string,
    price: number,
    weight: number,
    uses: string,

}


export const DefaultGroceryStoreItemInfomation : {[key:string]: IGroceryStoreItem}= {
    bread: {
        tittle: "Bánh mì",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    hamburger: {
        tittle: "Hamburger",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    socola: {
        tittle: "Socola",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    hotdog: {
        tittle: "Bánh Hotdog",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    noodles: {
        tittle: "Phở",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    water: {
        tittle: "Nước uống",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    redbull: {
        tittle: "Nước tăng lực RedBull",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    monster: {
        tittle: "Nước tăng lực Monster",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    wine: {
        tittle: "Rượu đế",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    beer: {
        tittle: "Bia Tiger",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    milk: {
        tittle: "Sữa tươi",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    drill: {
        tittle: "Máy khoan",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    fishingrod: {
        tittle: "Cần câu cá",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    fixkit: {
        tittle: "Bộ sửa chữa",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    pickaxe: {
        tittle: "Cuốc chim",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    bandage: {
        tittle: "Hồi máu(nhỏ)",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    gacha_ingame: {
        tittle: "Hòm quay may mắn",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    medikit: {
        tittle: "Bộ sơ cứu",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    phone: {
        tittle: "Điện thoại",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    },
    gameboy: {
        tittle: "Máy chơi game",
        description: "sss",
        type: "standard",
        price: 1000,
        weight: 1000,
        uses: "côngdung"
    }
}