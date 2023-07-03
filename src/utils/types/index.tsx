import { Timestamp } from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";

// localStorage Item & wishList
export interface LocalStorageItemProp {
  id: string;
  quantity: number;
  size?: string;
  color?: string;
}
export interface LocalStorageWishlistProp {
  id: string;
  date: string;
  note?: string;
}

// header Images Prop
export interface HeroImagesProp {
  image: string;
  label: string;
  heading: string;
}
export interface SocialImageProp {
  img: string;
}

// userCountryObject Prop
export interface UserLocationProp {
  state: string;
  country: string;
  currency: string;
  countryCode: string;
}

// item Prop
export type CategoryTypes =
  | "Mens"
  | "Accessories"
  | "Coats and Jackets"
  | "Kids"
  | "Pants & Chinos"
  | "Pants & Leggings"
  | "Shirts"
  | "Shorts"
  | "Skirts"
  | "Womens"
  | "Footwear";

export type BrandTypes =
  | "Adidas"
  | "Balenciaga"
  | "Harmony"
  | "Jeans Co"
  | "Kenzo"
  | "Nike"
  | "Superette"
  | "Local";

export type ColorTypes =
  | "Black"
  | "Gray"
  | "Green"
  | "Latte"
  | "Navy"
  | "Pink"
  | "White"
  | "Brown"
  | "Gold";

export type SizeTypes = "L" | "S" | "M" | "XL" | "XXL" | "XXXL";

export type PriceTypes = "low" | "mid" | "high";
export interface ItemProp {
  _id: string;
  brand: BrandTypes;
  category: CategoryTypes[];
  description: string;
  price: number;
  title: string;
  images: Array<string>;
  reviews?: Array<{
    comment: string;
    person: {
      name: string;
      profile?: string;
      id?: string;
    };
    rating?: number;
    reviewDate?: string;
  }>;
  rating?: number;
  hot?: {
    itemsLeft: number;
  };
  discount?: number;
  sort?: number;
  colors?: Array<{
    color: ColorTypes;
    hex: string;
    image: string;
  }>;
  sizes?: Array<SizeTypes>;
  subCategory?: CategoryTypes;
  outOfStock?: boolean;
  timestamp?: any;
}
// category Prop
export interface CategoryProp {
  category: string;
  quantity: number;
  images: Array<string>;
  timestamp?: any;
}
export interface SelectOptionsType {
  label: string;
  value: string;
}

export type SearchCategoriesTypes =
  | "All"
  | "Accessories"
  | "Coats and Jackets"
  | "Kids"
  | "Mens"
  | "Pants & Chinos"
  | "Pants & Leggings"
  | "Shirts"
  | "Shorts"
  | "Skirts"
  | "Womens"
  | "Footwear";

export interface CategoryPageProp {
  hero: {
    image: string;
  };
}

export interface FilterObjectProps {
  name: string;
  options: {
    category?: CategoryTypes | BrandTypes | ColorTypes | SizeTypes;
    noOfItems?: number;

    color?: string;
    price?: {
      category: PriceTypes;
      from: number;
      to: number;
    };
    isSelected?: boolean;

    subCategory?: {
      category: CategoryTypes | BrandTypes | ColorTypes | SizeTypes;
      noOfItems?: number;
      isSelected?: boolean;
    }[];
  }[];
  order?: number;
}
export interface FilterValueProp {
  categories: CategoryTypes[];
  brand: BrandTypes[];
  color: ColorTypes[];
  size: SizeTypes[];
  price: PriceTypes[];
}

// checkout
export interface BillingsInfoProp {
  first_name: string;
  last_name: string;
  country: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  zip_code?: number | null;
  customer_note?: string | null;
}
export interface CheckoutItemProp {
  uid: string;
  quantity: number | null;
  size?: string | string[];
  color?: string | string[];
}
export interface CheckoutInfoProp {
  billings: BillingsInfoProp;
  items: CheckoutItemProp[];
  total_price: number;
  orderID: string;
  orderTimestamp: number;
  isFreeShipping: boolean;
  payment_method:
    | "direct_transfer"
    | "paystack"
    | "flutterwave"
    | "on_delivery";
  create_account?: boolean;
}

// transactions
export interface TransactionProp {
  status: "success" | "failed" | "pending";
  response:
    | {
        message: string;
        redirecturl: string;
        reference: string;
        status: string;
        trans: string;
        transaction: string;
        trxref: string;
      }
    | FlutterWaveResponse
    | {
        status: "pending";
        method: "on_delivery" | "direct_transfer";
        trxref: string;
      };
  checkoutInfo: CheckoutInfoProp;
  amount: number;
  orderID: string;
  orderDate: string;
  method: "on_delivery" | "direct_transfer" | "paystack" | "flutterwave";
  items:
    | {
        title: string;
        id: string;
        quantity: number;
        total: number;
        size?: string;
        color?: string;
      }[]
    | [];
  freeShipping: boolean;
  timestamp?: Timestamp;
  _id?: string;
}
export interface TransactionErrorProp {
  response: any;
  orderId: string;
  orderDate: string;
  method: string;
  amount: number;
  message?: string;
}

//  Reviews
export interface AddReviewProp {
  itemID: string;
  review: {
    comment: string;
    person: {
      name: string;
      profile?: string;
      id?: string;
    };
    rating: number;
    reviewDate: string;
  };
}

// CUSTOM
export interface DrawerItemProp {
  item: ItemProp;
  handleRemoveItem: (id: string) => void;
  getItemPrice: (id: string) => number;
  getTotalQuantity: () => number;
}

export type DraggableCustomCompItem<T> = T;
export type DraggableCustomCompExtraProps<T> = T;
