export interface IMenuElement {
  label: string;
  value: string;
}

export interface IMenuConversation {
  name: string;
  message: string;
}

export interface IMenu {
  elements: IMenuElement[];
  conversation: IMenuConversation;
}

export interface ICreateMenuElement {
  label: string;
  callback: () => void;
}

export interface ICreateMenu {
  helloMessage?: string;
  title?: string;
  elements: ICreateMenuElement[];
  onCancle?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}
