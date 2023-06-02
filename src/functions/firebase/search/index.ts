import { ItemProp } from "@/utils";
import { db } from "../../../../firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// test for ItemProp
const tg = (x: any): x is ItemProp[] => true;

export const getSearchItems = async (category: string, search?: string) => {
  try {
    let items: ItemProp[] = [];
    let conditions = [where("category", "==", category)];

    if (search) {
      conditions.push(where("search", "==", search));
    }

    const q = query(collection(db, "items"), ...conditions);

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      items.push({ _id: doc.id, ...doc.data() } as ItemProp);
    });

    if (tg(items) && items.length > 0) {
      return items;
    } else {
      throw new Error("No such item!");
    }
  } catch (error) {
    throw new Error("No such item!");
  }
};
