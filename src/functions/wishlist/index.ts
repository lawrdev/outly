import { DATE_NOW, LocalStorageWishlistProp } from "@/utils";

export function getWishlist(): LocalStorageWishlistProp[] {
  if (typeof localStorage !== "undefined") {
    const wishlist = localStorage.getItem("outlyWishlist");

    if (wishlist != null) {
      return JSON.parse(wishlist) as LocalStorageWishlistProp[];
    } else {
      localStorage.setItem("outlyWishlist", JSON.stringify([]));
      return [] as LocalStorageWishlistProp[];
    }
  } else {
    return [] as LocalStorageWishlistProp[];
  }
}
export const updateWishlist = (newWishlist: LocalStorageWishlistProp[]) => {
  localStorage.setItem("outlyWishlist", JSON.stringify(newWishlist));
};

export const addItemToWishlist = (id: string) => {
  const wishlist: LocalStorageWishlistProp[] = getWishlist();

  if (wishlist.find((item) => item.id === id) == null) {
    localStorage.setItem(
      "outlyWishlist",
      JSON.stringify([...wishlist, { id, date: DATE_NOW }])
    );
  }

  return;
};
export const removeItemFromWishlist = (id: string) => {
  const wishlist: LocalStorageWishlistProp[] = getWishlist();

  if (wishlist.find((item) => item.id === id) != null) {
    let newWishlist = [...wishlist].filter((item) => item.id !== id);

    updateWishlist(newWishlist);
  }

  return getWishlist();
};
