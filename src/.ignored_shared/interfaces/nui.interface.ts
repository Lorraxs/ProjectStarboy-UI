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

export type INUIPage = "Login" | "Register" | "CharacterCreator";
