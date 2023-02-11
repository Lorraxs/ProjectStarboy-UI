export interface IView {
  component: string;
  hasFocus: boolean;
  hasCursor: boolean;
  keepInput: boolean;
}

export interface INuiMessage {
  component?: string;
  type?: string;
  data?: any;
}
