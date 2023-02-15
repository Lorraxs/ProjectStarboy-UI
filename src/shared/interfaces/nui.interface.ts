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
  component: string;
  type: "show";
  data: boolean;
}

export interface INUINotificationMessage {
  component: "Notification";
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration: number;
}
