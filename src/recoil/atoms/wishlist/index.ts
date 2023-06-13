import { getWishlist } from "@/functions";
import { LocalStorageWishlistProp } from "@/utils";
import { atom } from "recoil";

const wishlist: LocalStorageWishlistProp[] = getWishlist();

export const wishlistAtom = atom({
  key: "wishlist",
  default: wishlist,
});
