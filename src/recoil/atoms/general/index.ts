import { getUserLocationInfo } from "@/functions";
import {
  CheckoutInfoProp,
  FilterObjectProps,
  FilterValueProp,
  ItemProp,
  UserLocationProp,
} from "@/utils";
import { atom } from "recoil";

let value: UserLocationProp = {
  state: "Lagos",
  country: "Nigeria",
  currency: "NGN",
  countryCode: "NG",
};
if (typeof window !== "undefined") {
  async () => {
    value = await getUserLocationInfo();
  };
}

export const userLocationState = atom({
  key: "UserCountryState",
  default: value,
});

// for showing loader in a page by current page
export const appLoader = atom({
  key: "app_loader",
  default: {
    category: false,
  },
});

// for toast
export const appToastAtom = atom({
  key: "app_toast",
  default: {
    title: "",
  },
});

// for checkout
export const checkoutInfoAtom = atom({
  key: "checkout_info",
  default: {
    billings: {
      first_name: "",
      last_name: "",
      country: "",
      address: "",
      city: "",
      email: "",
      phone: "",
      zip_code: null,
      customer_note: null,
    },
    items: [
      {
        uid: "",
        quantity: null,
        size: "",
        color: "",
      },
    ],
    total_price: 0,
    orderID: "",
    orderTimestamp: 0,
    isFreeShipping: false,
    payment_method: "direct_transfer",
    create_account: false,
  } as CheckoutInfoProp,
});

// for shop items
export const shopItemsAtom = atom({
  key: "shop_items",
  default: [] as ItemProp[],
});
// for shop filter
export const shopFiltersAtom = atom({
  key: "shop_filters",
  default: [] as FilterObjectProps[],
});
// for user filter
export const userFiltersAtom = atom({
  key: "user_filters",
  default: {
    categories: [],
    brand: [],
    color: [],
    size: [],
    price: [],
  } as FilterValueProp,
});
