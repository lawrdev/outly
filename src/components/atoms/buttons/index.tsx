import { IconButton } from "@chakra-ui/react";
import { MutableRefObject, RefObject } from "react";
import { CartIcon, MenuIcon } from "../icons";

interface Props {
  onOpen?: () => void;
  ref?: MutableRefObject<HTMLButtonElement | null>;
}

export function CartButton({ onOpen, ref }: Props) {
  return (
    <IconButton
      colorScheme="main"
      variant="outline"
      px={2}
      py={2}
      borderRadius="full"
      borderWidth={2}
      aria-label="Cart"
      icon={<CartIcon boxSize={7} />}
      onClick={onOpen}
    />
  );
}

export function Hamburger({ onOpen, ref }: Props) {
  return (
    <IconButton
      colorScheme="main"
      variant="unstyled"
      px={2}
      py={2}
      borderRadius="full"
      borderWidth={0}
      aria-label="Menu"
      icon={<MenuIcon boxSize={8} />}
      onClick={onOpen}
    />
  );
}
