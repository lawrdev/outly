import { Icon } from "@chakra-ui/react";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  bg?: string;

  boxSize?: number | object;
}

export function LogoIcon({ color, w, h, boxSize, bg }: Props) {
  return (
    <Icon as={FaCrown} color={color} w={w} h={h} boxSize={boxSize} bg={bg} />
  );
}
