import { db } from "../../../firebase.config";
import { collection, query, getDocs } from "firebase/firestore";
import { HeaderImagesProp, ProductProp } from "@/utils";

export const getProducts = async () => {
  let products: ProductProp[] = [];
  const q = query(collection(db, "products"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    products.push({ _id: doc.id, ...doc.data() });
  });
  //   console.log("products", products);
  return products;
};

export const getHeaderImgs = async () => {
  let imageArr: HeaderImagesProp[] = [];
  const q = query(collection(db, "headerImages"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    imageArr.push(doc.data() as HeaderImagesProp);
  });
  return imageArr;
};
