import { BiMenuAltLeft } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  boxSize?: number;
}

export function MenuIcon({ color, w, h, boxSize }: Props) {
  return (
    <Icon as={BiMenuAltLeft} color={color} w={w} h={h} boxSize={boxSize} />
  );
}
