import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  boxSize?: number;
}

export function CartIcon({ color, w, h, boxSize }: Props) {
  return (
    <Icon as={HiShoppingCart} color={color} w={w} h={h} boxSize={boxSize} />
  );
}
