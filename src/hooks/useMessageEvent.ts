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
  setPlayerInventoryWeight,
  setPlayerMaxInventoryWeight,
  setPlayerMoney,
} from "../store/player";
import { IReduxNuiMessage } from "../shared/interfaces";
import {
  setMenuConversation,
  setMenuData,
  setMenuElements,
} from "../store/menu";
import { setWeaponShopIndex, setWeaponShopItems } from "../store/weapon-shop";

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text: string) {
  fallbackCopyTextToClipboard(text);
  return;
  /* navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  ); */
}

const useMessageEvent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessageEvent = (e: MessageEvent<IReduxNuiMessage>) => {
      const { component, event, data } = e.data;
      if (component === "Redux") {
        switch (event) {
          case "setPlayerInventoryWeight":
            return dispatch(setPlayerInventoryWeight(data));
          case "setPlayerMaxInventoryWeight":
            return dispatch(setPlayerMaxInventoryWeight(data));
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
          case "setMenuData":
            return dispatch(setMenuData(data));
          case "setMenuElements":
            return dispatch(setMenuElements(data));
          case "setMenuConversation":
            return dispatch(setMenuConversation(data));
          case "setWeaponShopItems":
            return dispatch(setWeaponShopItems(data));
          case "setWeaponShopIndex":
            return dispatch(setWeaponShopIndex(data));
          case "copy":
            return copyTextToClipboard(data);
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
