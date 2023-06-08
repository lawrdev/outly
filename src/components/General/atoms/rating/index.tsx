import { useState } from "react";
import { Rating as Rater, Star } from "@smastrom/react-rating";

interface RatingProps {
  value?: number;
  readOnly?: boolean;
  height?: string;
  maxWidth?: number;
  black?: boolean;
  isEditable?: boolean;
  onChange?: (value: number) => void;
}

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#C8815F",
  inactiveFillColor: "#c7c7c780",
};

export function Rating({
  value = 0,
  readOnly = true,
  maxWidth = 120,
  height = "22px",
  isEditable,
  onChange,
}: RatingProps) {
  const [rating, setRating] = useState(0);

  if (isEditable) {
    return (
      <Rater
        style={{ maxWidth, fontSize: "12px", height }}
        value={rating}
        onChange={(val: number) => {
          setRating(val);
          onChange && onChange(val);
        }}
      />
    );
  } else {
    return (
      <Rater
        style={{ maxWidth, fontSize: "12px", height }}
        value={value}
        readOnly={readOnly}
        itemStyles={myStyles}
      />
    );
  }
}
