import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setPlayerArmour,
  setPlayerBank,
  setPlayerBlackMoney,
  setPlayerCoords,
  setPlayerData,
  setPlayerHealth,
  setPlayerInventory,
  setPlayerMoney,
} from "../store/player";
import { IReduxNuiMessage } from "../shared/interfaces";

const useMessageEvent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessageEvent = (e: MessageEvent<IReduxNuiMessage>) => {
      const { component, event, data } = e.data;
      if (component === "Redux") {
        switch (event) {
          case "setPlayerData":
            return dispatch(setPlayerData(data));
          case "setPlayerArmour":
            return dispatch(setPlayerArmour(data));
          case "setPlayerBlackMoney":
            return dispatch(setPlayerBlackMoney(data));
          case "setPlayerBank":
            return dispatch(setPlayerBank(data));
          case "setPlayerCoin":
            return dispatch(setPlayerBank(data));
          case "setPlayerCoords":
            return dispatch(setPlayerCoords(data));
          case "setPlayerHealth":
            return dispatch(setPlayerHealth(data));
          case "setPlayerInventory":
            return dispatch(setPlayerInventory(data));
          case "setPlayerMoney":
            return dispatch(setPlayerMoney(data));
        }
      }
    };

    window.addEventListener("message", handleMessageEvent);

    return () => {
      window.removeEventListener("message", handleMessageEvent);
    };
  }, [dispatch]);
};

export default useMessageEvent;
