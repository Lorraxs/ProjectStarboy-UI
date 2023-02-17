import { EInventoryRarity } from "./inventory.interface";

export interface IView {
  component: string;
  hasFocus: boolean;
  hasCursor: boolean;
  keepInput: boolean;
  show: boolean;
}

export interface INuiMessage {
  component?: string;
  type?: string;
  data?: any;
}

export interface INUIShowPageMessage {
  component: INUIPage;
  type: "show";
  data: boolean;
}

export interface INUINotificationMessage {
  component: "Notification";
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration: number;
}

export interface INotification {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export type INUIPage =
  | "Login"
  | "Register"
  | "CharacterCreator"
  | "PlayerInventory";

export type IReduxAction =
  | "setPlayerData"
  | "setPlayerInventory"
  | "setPlayerCoords"
  | "setPlayerMoney"
  | "setPlayerBank"
  | "setPlayerCoin"
  | "setPlayerHealth"
  | "setPlayerArmour"
  | "setPlayerBlackMoney";
export interface IReduxNuiMessage {
  component: "Redux";
  event: IReduxAction;
  data: any;
}

export const RarityColor = {
  [EInventoryRarity.COMMON]: "",
  [EInventoryRarity.UNCOMMON]: "#ffffff",
  [EInventoryRarity.RARE]: "#00b4d8",
  [EInventoryRarity.EPIC]: "#f72585",
  [EInventoryRarity.LEGENDARY]: "#fb8500",
};