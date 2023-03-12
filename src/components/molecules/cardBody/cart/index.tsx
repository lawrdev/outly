import { Dispatch, SetStateAction, useEffect } from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { CartAddIcon } from "@/components/atoms";
import { Box, Text, IconButton, Tooltip, HStack } from "@chakra-ui/react";
import {
  decreaseItemQuantity,
  getCart,
  increaseItemQuantity,
} from "@/functions";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil";
import { LocalStorageItemProp } from "@/utils";

interface Props {
  itemID: string;
  addToCart: boolean;
  setAddToCart: Dispatch<SetStateAction<boolean>>;
  setIsInCart: Dispatch<SetStateAction<boolean>>;
}

export function Cart({ itemID, addToCart, setAddToCart, setIsInCart }: Props) {
  const [cartValue, setCartValue] = useRecoilState(cartState);

  const handleCartIconClick = (id: string) => {
    setAddToCart(true);
    setIsInCart(true);
    setCartValue(increaseItemQuantity(id));
  };
  const handleCartAddIconClick = (id: string) => {
    setCartValue(increaseItemQuantity(id));
  };
  const handleCartSubIconClick = (id: string) => {
    setCartValue(decreaseItemQuantity(id));
    const cart = getCart();
    if (cart.find((item) => item?.id === itemID) == null) {
      setIsInCart(false);
    }
  };

  return (
    <Box
      position="relative"
      zIndex={1}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      overflow="hidden"
    >
      <Box>
        {addToCart && cartValue.find((item) => item?.id === itemID) != null ? (
          <HStack spacing={3}>
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
              onClick={() => handleCartSubIconClick(itemID)}
            />
            <Text fontSize="xl" fontWeight="bold">
              {cartValue.find((item) => item?.id === itemID)
                ? cartValue.find((item) => item?.id === itemID)?.quantity
                : 0}
            </Text>
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
              onClick={() => handleCartAddIconClick(itemID)}
            />
          </HStack>
        ) : (
          <Tooltip label="Add to cart" placement="left">
            <IconButton
              onClick={() => handleCartIconClick(itemID)}
              position="relative"
              zIndex={6}
              bg="backgrounds.4"
              variant="unstyled"
              _hover={{ bg: "gray.100" }}
              py={2}
              px={2}
              aria-label="cart"
              icon={<CartAddIcon color="main.600" boxSize={6} />}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
