import { useState } from "react";
import { ItemStyles, Rating as Rater, ThinStar } from "@smastrom/react-rating";

interface RatingProps {
  value?: number;
  readOnly?: boolean;
  height?: string;
  maxWidth?: number;
  black?: boolean;
  isEditable?: boolean;
  onChange?: (value: number) => void;
}

const myStyles: ItemStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#C8815F",
  inactiveFillColor: "#00000001",
  inactiveStrokeColor: "#C8815F",
  activeStrokeColor: "#C8815F",
  itemStrokeWidth: 1.5,
};
const myStyles2: ItemStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#111",
  inactiveFillColor: "#f1f1f1",
  inactiveStrokeColor: "#111",
  activeStrokeColor: "#111",
  itemStrokeWidth: 1.5,
};

export function Rating({
  value = 0,
  readOnly = true,
  maxWidth = 120,
  height = "22px",
  isEditable,
  black,
  onChange,
}: RatingProps) {
  const [rating, setRating] = useState(0);

  if (isEditable) {
    return (
      <Rater
        style={{ maxWidth, fontSize: "12px", height }}
        itemStyles={black ? myStyles2 : myStyles}
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
        itemStyles={black ? myStyles2 : myStyles}
      />
    );
  }
}
