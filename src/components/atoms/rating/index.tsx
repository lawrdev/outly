import StarRatingComponent from "react-star-rating-component";

export function Rating({ value }: { value: number }) {
  return <StarRatingComponent name="cartRating" starCount={5} value={value} />;
}
