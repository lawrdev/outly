import { db } from "../../../../../firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AddReviewProp } from "@/utils";

export const postReview = async (data: AddReviewProp) => {
  const newRef = doc(db, "items", data.itemID);

  await updateDoc(newRef, {
    reviews: arrayUnion(data.review),
  });
};
