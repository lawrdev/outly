import { getCart } from "@/functions";
import { LocalStorageItemProp } from "@/utils";
import { atom } from "recoil";

const cart: LocalStorageItemProp[] = getCart();

export const cartAtom = atom({
  key: "cart",
  default: cart,
});
