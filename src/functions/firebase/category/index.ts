import {
  CategoryPageProp,
  FilterObjectProps,
  ItemProp,
  SearchCategoriesTypes,
} from "@/utils";
import { db } from "../../../../firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";

export const getCategoryHero = async () => {
  try {
    const docRef = doc(db, "categoryPage", "49AKe0VyKp4wfTW6AB3V");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data() as CategoryPageProp;
    }
  } catch (error) {
    throw new Error("No such document!");
  }
};

export const getFilterOptions = async () => {
  let options: FilterObjectProps[] = [];
  const q = query(collection(db, "filterOptions"), orderBy("order"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    options.push({ ...doc.data() } as FilterObjectProps);
  });

  if (options.length === 0) {
    throw new Error("No documents found");
  } else {
    return options;
  }
};

export const getSuggestionsRandom = async (
  categoryNames: SearchCategoriesTypes[],
  limitBy?: number
) => {
  let items: ItemProp[] = [];

  const q = query(
    collection(db, "items"),
    where("category", "array-contains-any", categoryNames),
    limit(limitBy || 10)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({ _id: doc.id, ...doc.data() } as ItemProp);
  });

  return items;
};

export const getCartPageSuggestions = async (data: {
  categoryNames: SearchCategoriesTypes[];
}) => {
  let items: ItemProp[] = [];

  const q = query(
    collection(db, "items"),
    where("category", "array-contains-any", data.categoryNames),
    limit(30)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({ _id: doc.id, ...doc.data() } as ItemProp);
  });

  return items;
};
