import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { INUIShowPageMessage } from "../shared/interfaces";
import { cRequest } from "../utils/request";
import { IView } from "../shared/interfaces";

export type IUseShowProp = [boolean, Dispatch<SetStateAction<boolean>>];
const request = new cRequest();

function useShow(
  isShow: boolean,
  componentName: string,
  hasFocus: boolean = false,
  hasCursor: boolean = false,
  keepInput: boolean = false,
  canClose: boolean = true
): IUseShowProp {
  const [show, setShow] = useState<boolean>(isShow);

  useEffect(() => {
    const messageHandler = (e: MessageEvent<INUIShowPageMessage>) => {
      const component = e.data.component;
      const type = e.data.type;
      const data = e.data.data;
      if (component !== componentName) return;
      if (type !== "show") return;
      setShow(data);
      const pageData: IView = {
        component: componentName,
        hasFocus,
        hasCursor,
        keepInput,
        show: data,
      };
      request.post("SetPageData", pageData);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const pageData: IView = {
          component: componentName,
          hasFocus,
          hasCursor,
          keepInput,
          show: false,
        };
        request.post("SetPageData", pageData);
        setShow(false);
      }
    };
    window.addEventListener("message", messageHandler);
    if (show && canClose) {
      window.addEventListener("keyup", keyHandler);
    }
    return () => {
      window.removeEventListener("message", messageHandler);
      if (show && canClose) {
        window.removeEventListener("keyup", keyHandler);
      }
    };
  }, [canClose, componentName, hasCursor, hasFocus, keepInput, show]);

  return [show, setShow];
}

export default useShow;
