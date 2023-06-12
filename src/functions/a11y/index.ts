import { KeyboardEvent } from "react";

export function a11yKeyboardClick<T>(event: KeyboardEvent<T>): boolean {
  if (event.type === "keydown") {
    let code = event.code || event.keyCode || event.charCode;
    if (code === "Enter" || code === "Space" || code === 32 || code === 13) {
      return true;
    } else return false;
  } else {
    return false;
  }
}
