import { db } from "../../../firebase.config";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import {
  CategoryProp,
  HeroImagesProp,
  ItemProp,
  SocialImageProp,
} from "@/utils";
import { calcItemRating } from "../general";

export const getHeroImgs = async () => {
  let imageArr: HeroImagesProp[] = [];
  const q = query(collection(db, "heroImages"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    imageArr.push(doc.data() as HeroImagesProp);
  });
  return imageArr;
};

export const getSocialImgs = async () => {
  let imageArr: SocialImageProp[] = [];
  const q = query(collection(db, "socialImages"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    imageArr.push(doc.data() as SocialImageProp);
  });
  return imageArr;
};

export const getCategories = async () => {
  let categories: CategoryProp[] = [];
  const q = query(collection(db, "categoryItems"), orderBy("category"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    categories.push({ ...doc.data() } as CategoryProp);
  });

  return categories;
};

export const getItems = async (categoryFilter?: string) => {
  let items: ItemProp[] = [];

  if (categoryFilter) {
    const q = query(
      collection(db, "items"),
      orderBy("sort"),
      where("category", "==", categoryFilter)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ _id: doc.id, ...doc.data() } as ItemProp);
    });
  } else {
    const q = query(collection(db, "items"), orderBy("sort"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ _id: doc.id, ...doc.data() } as ItemProp);
    });
  }

  //   console.log("products", products);
  return items;
};

export const getAllItems = async (limitBy?: number): Promise<ItemProp[]> => {
  let items: ItemProp[] = [];

  const q = query(
    collection(db, "items"),
    orderBy("timestamp"),
    limit(limitBy || 30)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({ _id: doc.id, ...doc.data() } as ItemProp);
  });

  return items.map((item) => calcItemRating(item));
};
