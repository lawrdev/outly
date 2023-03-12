import { LocalStorageItemProp } from "@/utils";

export const getCart = (): LocalStorageItemProp[] => {
  if (typeof localStorage !== "undefined") {
    const cart = localStorage.getItem("outlyCart");

    if (cart != null) {
      return JSON.parse(cart);
    } else {
      localStorage.setItem("outlyCart", JSON.stringify([]));
      return [] as LocalStorageItemProp[];
    }
  }
  return [] as LocalStorageItemProp[];
};
export const updateCart = (cart: LocalStorageItemProp[]) => {
  localStorage.setItem("outlyCart", JSON.stringify(cart));
};

// REFRESH AND CLEAR UP SIMLIPER

export const increaseItemQuantity = (id: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    localStorage.setItem(
      "outlyCart",
      JSON.stringify([...cart, { id, quantity: 1 }])
    );
    return getCart();
  } else {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
    updateCart(newCart);
    return getCart();
  }
};

export const decreaseItemQuantity = (id: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    return getCart();
  } else if (cart.find((item) => item?.id === id)?.quantity === 1) {
    let newCart = cart.filter((item) => item?.id !== id);
    updateCart(newCart);
    return getCart();
  } else {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );
    updateCart(newCart);
    return getCart();
  }
};

export const removeItem = (id: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    return getCart();
  } else {
    let newCart = cart.filter((item) => item?.id !== id);
    updateCart(newCart);
    return getCart();
  }
};
