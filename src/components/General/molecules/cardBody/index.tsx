import { FCProductObjectProp, FormatPrice } from "@/utils";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { Cart } from "./cart";
import { useSetRecoilState } from "recoil";
import { cartState } from "@/recoil";
import { removeItem } from "@/functions";
import {
  CartItemRemoveButton,
  Rating,
  Reviews,
} from "@/components/General/atoms";
import { OutlyPrime } from "@/components/General/molecules";

export function CardBody({ product }: FCProductObjectProp) {
  const [addToCart, setAddToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const setCartValue = useSetRecoilState(cartState);

  const handleItemRemove = (id: string) => {
    setIsInCart(false);
    setCartValue(removeItem(id));
  };

  return (
    <Box role="group">
      <Heading
        as="h3"
        pt={1}
        mb={1}
        size="xs"
        letterSpacing="wide"
        fontWeight="bold"
      >
        {product.brand?.toUpperCase()}
      </Heading>

      <Text
        mb={1}
        fontSize="sm"
        fontWeight="medium"
        width="fit-content"
        className="hover:underline decoration-1 underline-offset-4"
        noOfLines={1}
      >
        <Link href={`/item/${product._id}`}>{product.description}</Link>
      </Text>

      <Box mb={2}>
        <Cart
          itemID={product._id}
          addToCart={addToCart}
          setAddToCart={setAddToCart}
          setIsInCart={setIsInCart}
        />
      </Box>

      <Text
        fontWeight="bold"
        mb={2}
        bg="backgrounds.3"
        width="fit-content"
        px={3}
        borderRadius="md"
        fontSize="lg"
      >
        {<FormatPrice price={product.price!} />}
      </Text>
      {product.isFreeShipping ? (
        <Text fontSize="sm" fontWeight="light" letterSpacing="widest">
          Free shipping
        </Text>
      ) : (
        <Text fontSize="sm" fontWeight="light">
          <FormatPrice price={2999} />` shipping fee`
        </Text>
      )}
      <Box fontSize="sm" mb={1} display="flex" gap={1} alignItems={"center"}>
        <Text>Get 13% off with</Text> {<OutlyPrime />}
      </Box>

      {/* rating and reviews */}
      <HStack mt={1}>
        <Text fontSize={"sm"} fontFamily={"heading"} fontWeight={"normal"}>
          {product.rating! % 1 != 0
            ? product.rating
            : product.rating?.toFixed(1)}
        </Text>
        <Rating value={product.rating!} maxWidth={80} />
        <Link href={`/item/${product._id}`}>
          <Reviews count={product.reviews?.length!} />
        </Link>
      </HStack>

      {addToCart && isInCart ? (
        <HStack spacing={2} mt={3}>
          <Button
            height="fit-content"
            width="100%"
            fontSize="sm"
            colorScheme="brand"
            bgGradient="linear(to-r, brand.800, brand.700)"
            py={1.5}
          >
            Checkout
          </Button>
          <CartItemRemoveButton onClick={() => handleItemRemove(product._id)} />
        </HStack>
      ) : null}
    </Box>
  );
}
