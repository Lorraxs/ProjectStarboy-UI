import { EPlayerInventorySlot, IInventory } from "./inventory.interface";

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export const FatherFaces = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42,
  43, 44,
];
export const MotherFaces = [
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 45,
];

export type IFatherFace =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
export type IMotherFace =
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45;
export type IAllFace =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45;

export interface IHairDecoration {
  id: number;
  collection: string;
  overlay: string;
}
export interface IHairDecorations {
  male: IHairDecoration[];
  female: IHairDecoration[];
}
export interface IPedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  shapeThird: number;
  skinFirst: number;
  skinSecond: number;
  skinThird: number;
  shapeMix: number;
  skinMix: number;
  thirdMix: number;
}
export enum EFaceFeatureId {
  noseWidth,
  nosePeakHigh,
  nosePeakSize,
  noseBoneHigh,
  nosePeakLowering,
  noseBoneTwist,
  eyeBrownHigh,
  eyeBrownForward,
  cheeksBoneHigh,
  cheeksBoneWidth,
  cheeksWidth,
  eyesOpening,
  lipsThickness,
  jawBoneWidth,
  jawBoneBackSize,
  chinBoneLowering,
  chinBoneLenght,
  chinBoneSize,
  chinHole,
  neckThickness,
}
export interface IPedFaceFeatures {
  noseWidth: number;
  nosePeakHigh: number;
  nosePeakSize: number;
  noseBoneHigh: number;
  nosePeakLowering: number;
  noseBoneTwist: number;
  eyeBrownHigh: number;
  eyeBrownForward: number;
  cheeksBoneHigh: number;
  cheeksBoneWidth: number;
  cheeksWidth: number;
  eyesOpening: number;
  lipsThickness: number;
  jawBoneWidth: number;
  jawBoneBackSize: number;
  chinBoneLowering: number;
  chinBoneLenght: number;
  chinBoneSize: number;
  chinHole: number;
  neckThickness: number;
}
export interface IPedHeadOverlayValue {
  style: number;
  opacity: number;
  color?: number;
  secondColor?: number;
}
export enum EOverlayId {
  blemishes,
  beard,
  eyebrows,
  ageing,
  makeUp,
  blush,
  complexion,
  sunDamage,
  lipstick,
  moleAndFreckles,
  chestHair,
  bodyBlemishes,
  addBodyBlemishes,
}
export interface IPedHeadOverlays {
  blemishes: IPedHeadOverlayValue;
  beard: IPedHeadOverlayValue;
  eyebrows: IPedHeadOverlayValue;
  ageing: IPedHeadOverlayValue;
  makeUp: IPedHeadOverlayValue;
  blush: IPedHeadOverlayValue;
  complexion: IPedHeadOverlayValue;
  sunDamage: IPedHeadOverlayValue;
  lipstick: IPedHeadOverlayValue;
  moleAndFreckles: IPedHeadOverlayValue;
  chestHair: IPedHeadOverlayValue;
  bodyBlemishes: IPedHeadOverlayValue;
  addBodyBlemishes: IPedHeadOverlayValue;
}
export interface IPedHair {
  style: number;
  color: number;
  highlight: number;
}
export interface IPedComponent {
  componentId: number;
  drawable: number;
  texture: number;
}
export interface IPedProp {
  propId: number;
  drawable: number;
  texture: number;
}
export interface IPedAppearance {
  components: IPedComponent[];
  props: IPedProp[];
  headBlend: IPedHeadBlend;
  faceFeatures: IPedFaceFeatures;
  headOverlays: IPedHeadOverlays;
  hair: IPedHair;
  eyeColor: number;
  tattoos: ITattooList;
}
export interface ITattoo {
  name: string;
  label: string;
  hashMale: string;
  hashFemale: string;
  zone: string;
  collection: string;
}
export interface ITattooList {
  [key: string]: ITattoo[];
}

export interface ILoginPlayer {
  email: string;
  password: string;
  token?: string;
}

export type IOrganization = "police" | "ambulance" | "mechanic";

export type ICoords = number[];
export type IGender = "male" | "female";

export interface IPlayer {
  _id: string;
  id: number;
  name: string;
  email: string;
  gender: IGender;
  password?: string;
  salt?: string;
  organization?: IOrganization;
  health: number;
  armour: number;
  verifyCode?: string;
  verified: boolean;
  money: number;
  bank: number;
  coin: number;
  blackMoney?: number;
  coords: ICoords;
  appearance?: IPedAppearance;
  inventory: IInventory;
}

export interface ICreatePlayer {
  email: string;
  password: string;
  name: string;
  gender: IGender;
}

export const ParentsName = [
  "Benjamin ",
  "Daniel",
  "Joshua",
  "Noah",
  "Andrew",
  "Joan",
  "Alex",
  "Isaac",
  "Evan",
  "Ethan",
  "Vincent",
  "Angel",
  "Diego",
  "Adrian",
  "Gabriel",
  "Michael",
  "Santiago",
  "Kevin",
  "Louis",
  "Samuel",
  "Anthony",
  "Hannah",
  "Audrey",
  "Jasmine",
  "Giselle",
  "Amelia",
  "Isabella",
  "Zoe",
  "Ava",
  "Camilla",
  "Violet",
  "Sophia",
  "Eveline",
  "Nicole",
  "Ashley",
  "Grace",
  "Brianna",
  "Natalie",
  "Olivia",
  "Elizabeth",
  "Charlotte",
  "Emma",
  "John",
  "Niko",
  "Claude ",
  "Misty",
];

export const defaultPedAppearance: IPedAppearance = {
  components: [],
  props: [],
  headBlend: {
    shapeFirst: 0,
    shapeSecond: 21,
    shapeThird: 0,
    skinFirst: 0,
    skinSecond: 21,
    skinThird: 0,
    shapeMix: 0.5,
    skinMix: 0.5,
    thirdMix: 0.0,
  },
  faceFeatures: {
    noseWidth: 0.0,
    nosePeakHigh: 0.0,
    nosePeakSize: 0.0,
    noseBoneHigh: 0.0,
    nosePeakLowering: 0.0,
    noseBoneTwist: 0.0,
    eyeBrownHigh: 0.0,
    eyeBrownForward: 0.0,
    cheeksBoneHigh: 0.0,
    cheeksBoneWidth: 0.0,
    cheeksWidth: 0.0,
    eyesOpening: 0.0,
    lipsThickness: 0.0,
    jawBoneWidth: 0.0,
    jawBoneBackSize: 0.0,
    chinBoneLowering: 0.0,
    chinBoneLenght: 0.0,
    chinBoneSize: 0.0,
    chinHole: 0.0,
    neckThickness: 0.0,
  },
  headOverlays: {
    blemishes: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    beard: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    eyebrows: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    ageing: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    makeUp: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    blush: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    complexion: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    sunDamage: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    lipstick: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    moleAndFreckles: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    chestHair: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    bodyBlemishes: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
    addBodyBlemishes: {
      style: -1,
      opacity: 0.0,
      color: 0,
      secondColor: 0,
    },
  },
  hair: {
    style: 0,
    color: 0,
    highlight: 0,
  },
  eyeColor: 0,
  tattoos: {},
};

export interface IPedHeadOvelayNum {
  blemishes: number;
  beard: number;
  eyebrows: number;
  ageing: number;
  makeUp: number;
  blush: number;
  complexion: number;
  sunDamage: number;
  lipstick: number;
  moleAndFreckles: number;
  chestHair: number;
  bodyBlemishes: number;
  addBodyBlemishes: number;
}

export const defaultPedHeadOverlayNum: IPedHeadOvelayNum = {
  addBodyBlemishes: 2,
  ageing: 15,
  beard: 29,
  blemishes: 24,
  blush: 33,
  bodyBlemishes: 12,
  chestHair: 17,
  complexion: 12,
  eyebrows: 34,
  lipstick: 10,
  makeUp: 95,
  moleAndFreckles: 18,
  sunDamage: 11,
};

export interface IAddPlayerInventoryItemProps {
  itemName: string;
  slot?: EPlayerInventorySlot;
  amount: number;
  reason?: string;
}
