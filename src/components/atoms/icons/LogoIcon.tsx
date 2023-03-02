import { Icon } from "@chakra-ui/react";
import { RiVipCrownLine } from "react-icons/ri";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  boxSize?: number;
}

export function LogoIcon({ color, w, h, boxSize }: Props) {
  return (
    <Icon as={RiVipCrownLine} color={color} w={w} h={h} boxSize={boxSize} />
  );
}
