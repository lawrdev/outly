import { Dispatch, SetStateAction, useEffect } from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import {
  CartAddButton,
  CartAddIcon,
  CartSubButton,
  ProductCardCartButton,
} from "@/components/General/atoms";
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
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      overflow="hidden"
    >
      <Box>
        {addToCart && cartValue.find((item) => item?.id === itemID) != null ? (
          <HStack spacing={3}>
            <CartSubButton onClick={() => handleCartSubIconClick(itemID)} />
            <Text fontSize="xl" fontWeight="bold">
              {cartValue.find((item) => item?.id === itemID)
                ? cartValue.find((item) => item?.id === itemID)?.quantity
                : 0}
            </Text>
            <CartAddButton onClick={() => handleCartAddIconClick(itemID)} />
          </HStack>
        ) : (
          <ProductCardCartButton onClick={() => handleCartIconClick(itemID)} />
        )}
      </Box>
    </Box>
  );
}
