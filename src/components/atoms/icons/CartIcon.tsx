import { HiShoppingCart } from "react-icons/hi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Icon } from "@chakra-ui/react";

interface Props {
  color?: string;
  w?: number;
  h?: number;
  boxSize?: number | object;
  bg?: string;
}

export function CartIcon({ color, w, h, boxSize }: Props) {
  return (
    <Icon as={HiShoppingCart} color={color} w={w} h={h} boxSize={boxSize} />
  );
}
export function CartAddIcon({ color, w, h, boxSize, bg }: Props) {
  return (
    <Icon
      as={MdOutlineAddShoppingCart}
      color={color}
      w={w}
      h={h}
      boxSize={boxSize}
      bg={bg}
    />
  );
}
