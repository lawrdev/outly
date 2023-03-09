import { IconButton } from "@chakra-ui/react";
import { CartIcon, MenuIcon } from "../icons";

interface Props {
  onOpen?: () => void;
}

export function CartButton({ onOpen }: Props) {
  return (
    <IconButton
      colorScheme="brand"
      variant="outline"
      px={{ base: 2, md: 1 }}
      py={{ base: 2, md: 1 }}
      borderRadius={4}
      _hover={{ bg: "sec.2" }}
      borderWidth={1.5}
      aria-label="Cart"
      icon={<CartIcon color="brand.600" boxSize={{ base: 6, md: 7 }} />}
      onClick={onOpen}
      boxShadow="lgb "
    />
  );
}

export function Hamburger({ onOpen }: Props) {
  return (
    <IconButton
      display={{ base: "block", md: "none" }}
      colorScheme="main"
      variant="ghost"
      px={2}
      py={2}
      _hover={{ bg: "sec.2" }}
      borderRadius="full"
      borderWidth={0}
      aria-label="Menu"
      icon={<MenuIcon color="main.600" boxSize={7} />}
      onClick={onOpen}
    />
  );
}
