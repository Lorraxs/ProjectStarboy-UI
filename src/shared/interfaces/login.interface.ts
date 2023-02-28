import { IPlayer } from "./player.interface";
import { IResponse } from "./response.interface";

export interface ILoginResponse extends IResponse {
  data: IPlayer;
}
