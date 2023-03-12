import { getCart } from "@/functions";
import { LocalStorageItemProp } from "@/utils";
import { atom } from "recoil";

let value: LocalStorageItemProp[] | [] = [];
if (typeof localStorage !== "undefined") {
  if (localStorage.getItem("outlyCart") == null)
    localStorage.setItem("outlyCart", JSON.stringify([]));

  value = JSON.parse(localStorage.getItem("outlyCart") as string);
}

export const cartState = atom({
  key: "CartState",
  default: getCart(),
});
