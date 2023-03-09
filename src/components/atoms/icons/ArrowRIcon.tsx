import { FiArrowRight } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  boxSize?: number | object;
}

export function ArrowRIcon({ color, w, h, boxSize }: Props) {
  return <Icon as={FiArrowRight} color={color} w={w} h={h} boxSize={boxSize} />;
}
