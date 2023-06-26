import { Box, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CartIcon, CartAddIcon, MenuIcon } from "../icons";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { BsCartXFill } from "react-icons/bs";
import Link from "next/link";
import { CartBadge } from "../cartBadge";
import { FiShare } from "react-icons/fi";
interface Props {
  onOpen?: () => void;
}

export function ShareButton() {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      status: "success",
      variant: "subtle",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Tooltip label="Share" placement="left">
      <Box
        borderRadius="lg"
        p={1}
        _hover={{
          bgGradient: "linear(to-r, brand.800, brand.700)",
          color: "white",
        }}
        color="brand.500"
        cursor="pointer"
        onClick={handleCopy}
      >
        <FiShare size={18} />
      </Box>
    </Tooltip>
  );
}

export function CartButton({ onOpen }: Props) {
  return (
    <Link href="/checkout">
      <Box position="relative" zIndex={1}>
        <Box
          position="absolute"
          zIndex={2}
          className="bottom-0 right-0 translate-x-3 translate-y-1/2"
        >
          <CartBadge />
        </Box>
        <IconButton
          colorScheme="main"
          variant="outline"
          px={{ base: 2, md: 1 }}
          py={{ base: 2, md: 1 }}
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
          borderWidth={1.5}
          aria-label="Cart"
          icon={<CartIcon color="main.400" boxSize={{ base: 6, md: 7 }} />}
          onClick={onOpen}
          boxShadow="md"
        />
      </Box>
    </Link>
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

//  ProductCard cart buttons
export function ProductCardCartButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip label="Add to cart" placement="left">
      <IconButton
        onClick={onClick}
        position="relative"
        bg="backgrounds.4"
        variant="unstyled"
        _hover={{ bg: "gray.100" }}
        py={2}
        px={2}
        aria-label="cart"
        icon={<CartAddIcon color="main.600" boxSize={6} />}
      />
    </Tooltip>
  );
}
export function CartAddButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      aria-label="add"
      boxSize={8}
      icon={<RiAddFill size={18} />}
      colorScheme="sec.1"
      bg="gray.200"
      color="gray.500"
      _hover={{ bg: "gray.300", color: "gray.600" }}
      variant="ghost"
      borderRadius="sm"
      height={4}
      paddingInline={0}
      minWidth={7}
      onClick={onClick}
    />
  );
}
export function CartSubButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      aria-label="subtract"
      icon={<RiSubtractFill size={18} />}
      colorScheme="sec.1"
      bg="gray.200"
      color="gray.500"
      _hover={{ bg: "gray.300", color: "gray.600" }}
      variant="ghost"
      borderRadius="sm"
      height={4}
      paddingInline={0}
      minWidth={7}
      onClick={onClick}
    />
  );
}
export function CartItemRemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip label="remove">
      <IconButton
        variant="unstyled"
        color="main.500"
        minHeight="10px"
        height="30px"
        maxWidth="fit-content"
        width="60px"
        px={1}
        aria-label="remove from cart"
        icon={<BsCartXFill size={24} />}
        onClick={onClick}
      />
    </Tooltip>
  );
}

export * from "./dropdown";
export * from "./boxButton";
export * from "./back";
