import { Rating as Rater, Star } from "@smastrom/react-rating";

interface RatingProps {
  value: number;
  readOnly?: boolean;
  height?: string;
  maxWidth?: number;
  black?: boolean;
}

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#000",
  inactiveFillColor: "#c7c7c7",
};

export function Rating({
  value,
  readOnly = true,
  maxWidth = 150,
  height = "26px",
  black = false,
}: RatingProps) {
  if (black) {
    return (
      <Rater
        style={{ maxWidth, fontSize: "12px", height }}
        value={value}
        readOnly={readOnly}
        itemStyles={myStyles}
      />
    );
  } else {
    return (
      <Rater
        style={{ maxWidth, fontSize: "12px", height }}
        value={value}
        readOnly={readOnly}
      />
    );
  }
}
