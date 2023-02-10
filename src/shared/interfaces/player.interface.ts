export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export type FatherFace =
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
export type MotherFace =
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
export type AllFace =
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

export interface HairDecoration {
  id: number;
  collection: string;
  overlay: string;
}
export interface HairDecorations {
  male: HairDecoration[];
  female: HairDecoration[];
}
export interface PedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  skinFirst: number;
  skinSecond: number;
  shapeMix: number;
  skinMix: number;
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
export interface PedFaceFeatures {
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
export interface PedHeadOverlayValue {
  style: number;
  opacity: number;
  color?: number;
  secondColor?: number;
}
export enum OverlayId {
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
}
export interface PedHeadOverlays {
  blemishes: PedHeadOverlayValue;
  beard: PedHeadOverlayValue;
  eyebrows: PedHeadOverlayValue;
  ageing: PedHeadOverlayValue;
  makeUp: PedHeadOverlayValue;
  blush: PedHeadOverlayValue;
  complexion: PedHeadOverlayValue;
  sunDamage: PedHeadOverlayValue;
  lipstick: PedHeadOverlayValue;
  moleAndFreckles: PedHeadOverlayValue;
  chestHair: PedHeadOverlayValue;
  bodyBlemishes: PedHeadOverlayValue;
}
export interface PedHair {
  style: number;
  color: number;
  highlight: number;
}
export interface PedComponent {
  componentId: number;
  drawable: number;
  texture: number;
}
export interface PedProp {
  propId: number;
  drawable: number;
  texture: number;
}
export interface PedAppearance {
  model: string;
  components: PedComponent[];
  props: PedProp[];
  headBlend: PedHeadBlend;
  faceFeatures: PedFaceFeatures;
  headOverlays: PedHeadOverlays;
  hair: PedHair;
  eyeColor: number;
  tattoos: TattooList;
}
export interface Tattoo {
  name: string;
  label: string;
  hashMale: string;
  hashFemale: string;
  zone: string;
  collection: string;
}
export interface TattooList {
  [key: string]: Tattoo[];
}

export interface ILoginPlayer {
  email: string;
  password: string;
  token?: string;
}

export type IOrganization = "police" | "ambulance" | "mechanic";

export type ICoords = [number, number, number];
export type IGender = "male" | "female";

export interface IPlayer {
  _id: string;
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
}

export interface ICreatePlayer {
  email: string;
  password: string;
  name: string;
  gender: IGender;
}
