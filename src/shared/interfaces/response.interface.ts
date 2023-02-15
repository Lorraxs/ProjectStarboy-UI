import { eStatus } from "./status.interface";
export interface IResponse {
  status: eStatus;
  message?: string;
  data?: any;
}
