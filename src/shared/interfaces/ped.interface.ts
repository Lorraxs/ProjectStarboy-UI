import { ICreateMenu } from "./menu.interface";

export interface IPed {
  pedModel: string;
  coords: number[];
  ped?: number;
  pedRelationShip?: string;
  voiceName?: string;
  interaction?: ICreateMenu;
}
