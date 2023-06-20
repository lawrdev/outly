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

export const removeItemFromCart = (id: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    return getCart();
  } else {
    let newCart = cart.filter((item) => item?.id !== id);
    updateCart(newCart);
    return getCart();
  }
};

export const findItemInCart = (id: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) != null) {
    // cartItem = cart.find((item) => item?.id === id)!;
    return { inCart: true, cart };
  } else {
    return { inCart: false, cart };
  }
};

// remove/add size and color to cart
export const addItemSizeToCart = (id: string, size: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    localStorage.setItem(
      "outlyCart",
      JSON.stringify([...cart, { id, quantity: 1, size }])
    );
  } else {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            size,
          }
        : item
    );
    updateCart(newCart);
  }
};

export const addItemColorToCart = (id: string, color: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) == null) {
    localStorage.setItem(
      "outlyCart",
      JSON.stringify([...cart, { id, quantity: 1, color }])
    );
  } else {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            color,
          }
        : item
    );
    updateCart(newCart);
  }
};

export const removeItemSizeFromCart = (id: string, size: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) != null) {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            size,
          }
        : item
    );
    updateCart(newCart);
  }
};

export const removeItemColorFromCart = (id: string, color: string) => {
  const cart: LocalStorageItemProp[] = getCart();

  if (cart.find((item) => item?.id === id) != null) {
    let newCart = cart.map((item) =>
      item?.id === id
        ? {
            ...item,
            color,
          }
        : item
    );
    updateCart(newCart);
  }
};
