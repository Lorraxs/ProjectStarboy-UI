export const VehicleShopCategory = [ 
    "Sedans" , 
    "Sports" ,
    "Muscles" , 
    "SuperCar" , 
    "SUVs", 
    "Vans", 
    "Motocycles", 
    "Boats", 
    "Planes"
]

export enum EVehicleShopCategorySubTittle {
    Sedans = "Xe gia đình",
    Sports = "Xe thể thao",
    Muscles = "Xe cổ điển",
    SuperCar = "Siêu xe",
    SUVs = "SUV",
    Vans = "Xe tải nhỏ",
    Addons = "Xe nhập khẩu",
    Motocycles = "Xe 2 bánh",
    Boats = "Tàu thuyền",
    Planes = "Máy bay",
}
export interface INeonEnabled {
    left: boolean,
    right: boolean,
    front: boolean,
    back: boolean,
}

export interface INeonColor {
    r: number,
    g: number,
    b: number,
}

export interface IExtras {
    [index: number]: boolean;
}

export interface ITyreSmokeColor {
    r: number,
    g: number,
    b: number,
}

export interface IVehicleShop {
    title: string,
    price: number,
    description: string,
}

export interface IVehicleShopDefaultProps {
    
    bodyHealth : number; 
    engineHealth: number; 
    tankHealth : number; 
    fuelLevel : number; 
    dirtLevel : number; 
    color1 : number; 
    color2 : number; 
    pearlescentColor : number; 
    wheelColor: number;
    wheels: number;
    windowTint: number;
    neonEnabled: INeonEnabled;
    neonColor: INeonColor;
    extras: IExtras[];
    tyreSmokeColor: ITyreSmokeColor;
    modSpoilers: number;
    modFrontBumper: number;
    modRearBumper: number;
    modSideSkirt: number;
    modExhaust: number;
    modFrame: number;
    modGrille : number;
    modHood : number;
    modFender : number;
    modRightFender : number;
    modRoof : number;
    modEngine : number;
    modBrakes : number;
    modTransmission : number;
    modHorns : number;
    modSuspension : number;
    modArmor : number;
    modTurbo : number;
    modSmokeEnabled : number;
    modXenon : number;
    modFrontWheels : number;
    modBackWheels : number;
    modPlateHolder : number;
    modVanityPlate : number;
    modTrimA : number;
    modOrnaments : number;
    modDashboard : number;
    modDial : number;
    modDoorSpeaker : number;
    modSeats : number;
    modSteeringWheel : number;
    modShifterLeavers : number;
    modAPlate : number;
    modTrunk : number;
    modHydrolic : number;
    modEngineBlock : number;
    modAirFilter : number;
    modStruts : number;
    modArchCover : number;
    modAerials : number;
    modTrimB : number;
    modTank : number;
    modWindows : number;
    modLivery : number;
    
}

export interface IVehicleProps {
    model : string;
    plate : string;
    plateIndex : number;
    props: IVehicleShopDefaultProps;
}

export const VehicleShopDefaultProps: IVehicleShopDefaultProps = {
    bodyHealth: 1000, // 0-1000
    engineHealth: 1000,// 0-1000
    tankHealth: 1000, //0-1000
    fuelLevel: 1, //0-1
    dirtLevel: 0, //0-15 
    color1: 1, //0-160 0 màu zin , 1 màu đen --> càng lớn càng gần đỏ
    color2: 0, //0-159 0 là không có màu phụ, còn lại giống color1
    pearlescentColor: 0, //0-159 giống color2
    wheelColor: 0, //0-156
    wheels: 0, //0-7
    windowTint:0, //0-6
    neonEnabled: {
        left: false, 
        right:false, 
        front:false, 
        back:false
    },
    neonColor: {
        r: 0,
        g: 0,
        b: 0,
    },
    extras: [],
    tyreSmokeColor:{
        r:0,
        g:0,
        b:0,
    },
    modSpoilers: -1,
    modFrontBumper: -1,
    modRearBumper: -1,
    modSideSkirt: -1,
    modExhaust: -1,
    modFrame: -1,
    modGrille: -1,
    modHood: -1,
    modFender: -1,
    modRightFender: -1,
    modRoof: -1,
    modEngine: -1,
    modBrakes: -1,
    modTransmission: -1,
    modHorns: -1,
    modSuspension: -1,
    modArmor: -1,
    modTurbo: -1,
    modSmokeEnabled: -1,
    modXenon: -1,
    modFrontWheels: -1,
    modBackWheels: -1,
    modPlateHolder: -1,
    modVanityPlate: -1,
    modTrimA: -1,
    modOrnaments: -1,
    modDashboard: -1,
    modDial: -1,
    modDoorSpeaker: -1,
    modSeats: -1,
    modSteeringWheel: -1,
    modShifterLeavers: -1,
    modAPlate: -1,
    modTrunk: -1,
    modHydrolic: -1,
    modEngineBlock: -1,
    modAirFilter: -1,
    modStruts: -1,
    modArchCover: -1,
    modAerials: -1,
    modTrimB: -1,
    modTank: -1,
    modWindows: -1,
    modLivery: -1,
}




export const VehicleListOnCategory = {
    Sedans: [
        "asea",
        "superd",
        "tailgater2",
        "stafford",
    ],
    Sports: [
        "banshee",
        "comet4",
        "coquette4",
        "elegy2",
    ],
    Muscles: [
        "dominator",
        "hustler",
        "clique",
        "deviant",
    ],
    SuperCar: [
        "adder",
        "autarch",
        "taipan",
        "tempesta",
    ],
    SUVs: [
        "baller",
        "bjxl",
        "cavalcade",
        "contender",
    ],
    Vans: [
        "bison",
        "gburrito",
        "bobcatxl",
        "minivan",
    ],
    Addons: [
        "mec",
        "bmw",
        "audi",
        "ferrari",
    ],
    Motocycles: [
        "akuma",
        "avarus",
        "bagger",
        "bati",
    ],
    Boats: [
        "dinghy",
        "jetmax",
        "marquis",
        "seashark",
    ],
    Planes: [
        "havok",
        "frogger2",
        "maverick",
        "savage",
    ]
}