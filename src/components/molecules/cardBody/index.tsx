import { FCProductObjectProp, formatPrice } from "@/utils";
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
import { BsCartXFill } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState } from "@/recoil";
import { removeItem } from "@/functions";

export function CardBody({ product }: FCProductObjectProp) {
  const [addToCart, setAddToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const setCartValue = useSetRecoilState(cartState);

  const handleItemRemove = (id: string) => {
    setIsInCart(false);
    setCartValue(removeItem(id));
  };

  return (
    <Box role="group" className="transition duration-300 ease-in-out ">
      <Heading
        as="h3"
        pt={1}
        mb={1}
        size="xs"
        letterSpacing="wide"
        fontWeight="bold"
        className="duration-500 ease-in-out"
        // _groupHover={{ transitionDuration: "3s" }}
      >
        {product.brand?.toUpperCase()}
      </Heading>
      <Link href="/">
        <Text
          mb={2}
          fontSize="sm"
          fontWeight="medium"
          width="fit-content"
          className="hover:underline decoration-1 underline-offset-4"
          noOfLines={1}
        >
          {product.description}
        </Text>
      </Link>

      <Box mb={3}>
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
        {formatPrice(product.price as number)}
      </Text>
      <Text fontSize="sm" mb={1}>
        Get 13% off with{" "}
        <Text
          fontSize="sm"
          as="span"
          cursor="pointer"
          color="main.600"
          className="underline underline-offset-4 decoration-1"
        >
          Outly Prime
        </Text>
      </Text>
      {product.isFreeShipping ? (
        <Text fontSize="sm" fontWeight="light" letterSpacing="widest">
          Free shipping
        </Text>
      ) : (
        <Text fontSize="sm" fontWeight="light">
          {formatPrice(2999)} shipping fee
        </Text>
      )}

      {/* rating and reviews */}

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
              onClick={() => handleItemRemove(product._id)}
            />
          </Tooltip>
        </HStack>
      ) : null}
    </Box>
  );
}
