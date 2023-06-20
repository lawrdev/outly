import { ItemProp, SearchCategoriesTypes } from "@/utils";
import { db } from "../../../../firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { formatSearchString } from "@/functions/general";

// test for ItemProp
const tg = (x: any): x is ItemProp[] => true;

export const getSearchItems = async ({
  category = "All",
  search,
}: {
  category: SearchCategoriesTypes;
  search?: string;
}) => {
  try {
    let items: ItemProp[] = [];
    let conditions = [];

    if (category !== "All") {
      conditions.push(where("category", "array-contains", category));
    }

    if (search) {
      let whatToSearch = formatSearchString(search);
      conditions.push(where("title", ">=", `${whatToSearch}`));
      conditions.push(where("title", "<=", `${whatToSearch}\uf7ff`));
    }

    // FIX limit to pagination
    const q = query(collection(db, "items"), ...conditions, limit(10));

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
    console.log("issssh", error);
    throw new Error(
      // @ts-ignore
      typeof error.message === "string" ? error.message : "Firebase Error"
    );
  }
};
