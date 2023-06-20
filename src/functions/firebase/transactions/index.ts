import { db } from "../../../../firebase.config";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TransactionErrorProp, TransactionProp } from "@/utils";

export const postTransactionResponse = async (
  data: TransactionProp | TransactionErrorProp
) => {
  const newRef = doc(collection(db, "transactions"));

  await setDoc(newRef, {
    ...data,
    timestamp: serverTimestamp(),
  });
};

export const getTransaction = async (txref: string) => {
  let obj = {};

  const q = query(
    collection(db, "transactions"),
    where("orderID", "==", txref)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());

    obj = {
      _id: doc.id,
      ...doc.data(),
    };
  });

  return obj as TransactionProp;
};
