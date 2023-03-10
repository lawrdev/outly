// product type
export interface ProductProp {
  _id: string;
  brand?: string;
  description?: string;
  price?: number;
  images?: string[];
  reviews?: string[];
  rating?: number;
  isFreeShipping?: boolean;
  category?: string;
}

export interface FCProductObjectProp {
  product: ProductProp;
}

// localStorage productItem
export interface ItemPropLocalStorage {
  id: string;
  quantity: number;
}

// header Images Prop
export interface HeaderImagesProp {
  desktop: string;
  mobile: string;
}
