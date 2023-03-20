import { useState, useEffect } from "react";
import {
  CartAddButton,
  CartSubButton,
  CartItemRemoveButton,
} from "@/components/atoms";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "@/functions";
import { cartState } from "@/recoil";
import { FormatPrice, LocalStorageItemProp, ProductProp } from "@/utils";
import {
  Box,
  Divider,
  Heading,
  chakra,
  Grid,
  Text,
  HStack,
  GridItem,
  Skeleton,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useScroll } from "@/hooks/useScroll";

interface Props {
  cart: Array<LocalStorageItemProp>;
  products: Array<ProductProp> | null;
}
export function CheckoutCart({ cart, products }: Props) {
  const [total, setTotal] = useState(0);
  const [cartValue, setCartValue] = useRecoilState(cartState);

  const { scrollDirection } = useScroll();

  useEffect(() => {
    if (products) {
      let nu = cart.reduce((acc, curr) => {
        let currItem = products?.find((p) => p?._id === curr.id);
        acc = acc + currItem?.price! * curr.quantity;

        return acc;
      }, 0);
      setTotal(nu);
    }
  }, [cart, products]);

  const handleCartAddIconClick = (id: string) => {
    setCartValue(increaseItemQuantity(id));
  };
  const handleCartSubIconClick = (id: string) => {
    setCartValue(decreaseItemQuantity(id));
  };
  const handleItemRemove = (id: string) => {
    setCartValue(removeItem(id));
  };

  const getTotalPrice = (id: string): number => {
    let p = products?.find((p) => p?._id === id);
    let c = cart.find((c) => c.id === id);

    if (p && c) {
      return p?.price * c?.quantity;
    } else {
      return 0;
    }
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 0, lg: 20 }}>
      <GridItem colSpan={{ base: 12, lg: 7 }}>
        <Box>
          <Heading
            as="h2"
            size="md"
            fontFamily={"heading"}
            borderBottomWidth={1}
            borderBottomColor={"gray.300"}
            pb={7}
          >
            Your Cart
          </Heading>

          <chakra.ul>
            {products?.map((product, index) => (
              <chakra.li
                key={index}
                py={7}
                borderBottomWidth={1}
                borderBottomColor={"gray.300"}
              >
                <Grid
                  templateColumns="repeat(12, 1fr)"
                  gap={{ base: 0, md: 10 }}
                  // rowGap={{ base: 8, md: 6 }}
                >
                  <GridItem
                    colSpan={{ base: 2 }}
                    position="relative"
                    overflow="hidden"
                    height={70}
                    width={54}
                    bg="white"
                    borderRadius={"lg"}
                  >
                    <Image
                      src={product?.images[0]}
                      alt="item"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                      sizes={"(max-width: 1000px) 100vw, 100vw"}
                      fill
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 6 }}>
                    <Text
                      color={"brand.500"}
                      fontWeight={"semibold"}
                      fontSize={"xs"}
                    >
                      {product?.brand.toUpperCase()}
                    </Text>
                    <Text
                      textDecoration={"underline"}
                      textDecorationThickness={"0.5px"}
                      textUnderlineOffset={"3px"}
                    >
                      <Link href={`/${product?._id}`}>
                        {product?.description}
                      </Link>
                    </Text>

                    <Box pt={4}>
                      <HStack spacing={7} mb={8}>
                        <CartSubButton
                          onClick={() => handleCartSubIconClick(product?._id)}
                        />
                        <Text fontSize="xl" fontWeight="bold">
                          {cartValue.find((item) => item?.id === product?._id)
                            ? cartValue.find(
                                (item) => item?.id === product?._id
                              )?.quantity
                            : 0}
                        </Text>
                        <CartAddButton
                          onClick={() => handleCartAddIconClick(product?._id)}
                        />
                      </HStack>

                      <Text
                        textDecoration={"underline"}
                        textDecorationThickness={"0.5px"}
                        textUnderlineOffset={"3px"}
                        onClick={() => handleItemRemove(product?._id)}
                        cursor={"pointer"}
                        _hover={{ color: "red.500" }}
                      >
                        Remove
                      </Text>
                    </Box>
                  </GridItem>

                  <GridItem colSpan={{ base: 4 }}>
                    <Text mb={2} textAlign={"end"}>
                      {<FormatPrice price={product?.price} />}
                    </Text>
                    <Text fontWeight={"bold"} textAlign={"end"}>
                      Total:{" "}
                      {<FormatPrice price={getTotalPrice(product?._id)} />}
                    </Text>
                  </GridItem>
                </Grid>
              </chakra.li>
            ))}
            {products == null || products.length === 0 ? (
              <Text
                fontWeight={"medium"}
                color={"gray.500"}
                fontSize={"sm"}
                my={5}
              >
                No items in your cart
              </Text>
            ) : null}
          </chakra.ul>
        </Box>
      </GridItem>

      <GridItem
        colSpan={{ base: 12, lg: 5 }}
        height={"fit-content"}
        position={{ base: "relative", lg: "sticky" }}
        top={2}
        left={0}
      >
        <Box pb={7} borderBottomWidth={1} borderBottomColor={"gray.300"}>
          <Text fontWeight={"semibold"} mb={5}>
            Enter Promo Code
          </Text>

          <InputGroup overflow={"hidden"}>
            <Input
              placeholder="Enter Promo Code"
              focusBorderColor="brand.500"
            />
            <InputRightElement width={"fit-content"}>
              <Button
                bgGradient="linear(to-r, brand.800, brand.700)"
                borderRadius={"none"}
                borderTopEndRadius={"md"}
                borderBottomEndRadius={"md"}
              >
                Apply
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box py={7}>
          <HStack justifyContent={"space-between"} mb={8}>
            <Text>Subtotal</Text>
            <Text fontWeight={"bold"}>{<FormatPrice price={total} />}</Text>
          </HStack>

          <Text color={"gray.500"} fontSize={"sm"} mb={3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit, quidem nemo
            eaque.
          </Text>

          <Button
            mb={3}
            bgGradient="linear(to-r, brand.800, brand.700)"
            width={"100%"}
          >
            Proceed To Checkout
          </Button>

          <Text
            fontSize={"sm"}
            textDecoration={"underline"}
            textDecorationThickness={"0.5px"}
            textUnderlineOffset={"3px"}
            textAlign={"center"}
          >
            <Link href={"/"}>Continue Shopping</Link>
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
}
