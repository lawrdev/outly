import { ItemProp } from "@/utils";
import { db } from "../../../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { calcItemRating } from "@/functions/general";

export const getSingleItem = async (id: string) => {
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const item: ItemProp = { _id: id, ...docSnap.data() } as ItemProp;
    return calcItemRating(item);
  }
};

const tg = (x: any): x is ItemProp[] => true;
export const getMultipleItems = async (arrID: string[]) => {
  try {
    const allItems = await Promise.all(
      [...arrID].map((item) => getSingleItem(item))
    );

    if (tg(allItems)) {
      return allItems;
    } else {
      throw new Error("No such Items!");
    }
  } catch (error) {
    throw new Error("No such Items!");
  }
};
