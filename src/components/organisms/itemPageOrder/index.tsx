import { useState, useEffect } from "react";
import Link from "next/link";
import { FormatPrice, ProductProp, UserLocationProp } from "@/utils";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";
import dayjs from "dayjs";
import {
  decreaseItemQuantity,
  findItemInCart,
  increaseItemQuantity,
} from "@/functions";
import { CartAddButton, CartSubButton } from "@/components/atoms";
import { cartState, userLocationState } from "@/recoil";
import { useRecoilState, useRecoilValue } from "recoil";

interface Props {
  product: ProductProp;
}
export function ItemPageOrder({ product }: Props) {
  const [isInCart, setIsInCart] = useState(false);

  const [cartValue, setCartValue] = useRecoilState(cartState);
  const userCountry: UserLocationProp = useRecoilValue(userLocationState);

  useEffect(() => {
    const result = findItemInCart(product._id);
    setIsInCart(result.inCart);
  }, [product._id]);

  const handleCartClick = (id: string) => {
    setIsInCart(true);
    setCartValue(increaseItemQuantity(id));
  };
  const handleCartAddIconClick = (id: string) => {
    setCartValue(increaseItemQuantity(id));
  };
  const handleCartSubIconClick = (id: string) => {
    setCartValue(decreaseItemQuantity(id));
  };

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      borderColor={"gray.300"}
      px={3}
      py={5}
      width="100%"
      boxShadow={"md"}
      bg={{ base: "backgrounds.4", xl: "backgrounds.3" }}
    >
      <Text fontWeight={"medium"} fontSize={"2xl"} mb={4}>
        {<FormatPrice price={product.price!} />}
      </Text>

      <Text
        mb={1}
        display={"flex"}
        gap={1}
        fontSize="sm"
        alignItems={"end"}
        lineHeight={"4"}
      >
        {<IoLocationOutline size={16} />} Deliver to{" "}
        <span className="c_link text-xs inline cursor-pointer">
          {userCountry.state}, {userCountry.country}
        </span>
      </Text>

      <Text mb={3} fontSize="sm">
        <span className="c_link">{<FormatPrice price={2999} />}</span> Shipping
        & Import Fees
      </Text>

      <Text mb={6} fontSize={"sm"}>
        Delivery: <strong>{dayjs().add(3, "day").format("MMMM DD")}</strong> -{" "}
        <strong>{dayjs().add(7, "day").format("MMMM DD")} </strong>
      </Text>

      <Box>
        <VStack spacing={3}>
          {isInCart &&
          cartValue.find((item) => item?.id === product._id) != null ? (
            <HStack spacing={7}>
              <CartSubButton
                onClick={() => handleCartSubIconClick(product._id)}
              />
              <Text fontSize="2xl" fontWeight="bold">
                {cartValue.find((item) => item?.id === product._id)
                  ? cartValue.find((item) => item?.id === product._id)?.quantity
                  : 0}
              </Text>
              <CartAddButton
                onClick={() => handleCartAddIconClick(product._id)}
              />
            </HStack>
          ) : (
            <Button
              width="100%"
              bgGradient="linear(to-r, main.500, main.300)"
              _hover={{ bgGradient: "linear(to-r, main.500, main.500)" }}
              onClick={() => handleCartClick(product._id)}
            >
              Add To Your Cart
            </Button>
          )}

          <Button
            as={Link}
            href="/checkout"
            width="100%"
            bgGradient="linear(to-r, brand.800, brand.700)"
          >
            Checkout
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
