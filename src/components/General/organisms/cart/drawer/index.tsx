import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Progress,
  ScaleFade,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { getMultipleItems } from "@/functions/firebase/item";
import { cartAtom } from "@/recoil";
import { currencyFormatter, ItemProp, maxFreeShipping } from "@/utils";
import { calDiscount, removeItemFromCart } from "@/functions";
import { useRouter } from "next/router";
import { CartBagIcon, ListAnimate, SlideIn } from "@/components/General/atoms";
import { AnimatePresence } from "framer-motion";
import { DrawerItemCard } from "../item";
import { YouMayAlsoLike } from "../../youmayalsoLike";

interface Props {
  cartDrawerDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}
const tg = (x: any): x is ItemProp[] => true;

export function CartDrawer({ cartDrawerDisclosure }: Props) {
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<ItemProp[]>([]);

  const router = useRouter();

  const [cartAtomValue, setCartAtomValue] = useRecoilState(cartAtom);

  const fetchItems = useQuery(
    ["get_cart_items"],
    () => {
      if (cartAtomValue && cartAtomValue.length > 0) {
        return getMultipleItems(cartAtomValue.map((item) => item.id));
      }
      return;
    },
    {
      enabled: !!(cartAtomValue.length > 0),
      onSuccess: (data) => {
        // console.log("we haveeeeeeee", data);
        if (data) setCartItems(data);
      },
    }
  );

  useEffect(() => {
    const calcTotal = (): number => {
      if (cartAtomValue.length === 0) return 0;

      if (fetchItems.data && fetchItems.data?.length > 0) {
        const total = [...fetchItems.data].reduce((acc, curr) => {
          let quantity = 1;
          const findQunatity = cartAtomValue.filter(
            (item) => item.id === curr?._id
          );
          if (findQunatity.length > 0) {
            quantity = findQunatity[0].quantity;
          }

          let currentPrice = !curr?.discount
            ? curr.price
            : calDiscount(curr.discount, curr.price);

          acc = currentPrice! * quantity + acc;

          return acc;
        }, 0);

        return total;
      } else {
        return 0;
      }
    };
    let tot = calcTotal();

    setSubTotal(tot);
  }, [cartAtomValue, fetchItems.data]);

  const getTotalQuantity = (): number => {
    let total = 0;
    if (cartAtomValue && cartAtomValue.length > 0) {
      let res = [...cartAtomValue].reduce((acc, curr) => {
        acc = acc + curr.quantity;
        return acc;
      }, 0);

      total = res;
    }

    return total;
  };

  const getItemPrice = (itemID: string): number => {
    let itemAvaliable = [...cartAtomValue].find((item) => item.id === itemID);
    let itemPrice = 0;

    if (cartItems && cartItems?.length > 0) {
      let result = [...cartItems].find((item) => item._id === itemID);

      if (result) {
        itemPrice = result.discount
          ? calDiscount(result.discount, result.price)
          : result.price;
      }
    }

    if (itemAvaliable) {
      return itemPrice * itemAvaliable.quantity;
    }
    return 0;
  };

  const handleRemoveItem = (itemID: string) => {
    setIsLoading(true);
    setCartAtomValue(removeItemFromCart(itemID));

    setCartItems((prev) => {
      return prev?.filter((op) => op._id !== itemID);
    });

    setIsLoading(false);
  };

  return (
    <>
      <Drawer
        isOpen={cartDrawerDisclosure.isOpen}
        placement="right"
        onClose={cartDrawerDisclosure.onClose}
        size={"md"}
        blockScrollOnMount={false}
        colorScheme={"appMain"}
      >
        <DrawerOverlay />
        <DrawerContent maxWidth={{ base: "94vw", sm: "md" }}>
          <DrawerCloseButton />
          <DrawerHeader pt={"32px"} pb={4} mb={1}>
            <Heading mb={"12px"} as={"h2"} fontSize={"24px"} fontWeight={500}>
              Your Cart {`(${getTotalQuantity()})`}
            </Heading>

            {/* FREE SHIPPING */}
            <VStack spacing={"2px"} alignItems={"flex-start"}>
              {subTotal > maxFreeShipping ? (
                <Box width={"100%"}>
                  <ScaleFade initialScale={0.9} in={subTotal > maxFreeShipping}>
                    <Text
                      fontWeight={400}
                      color={"outly.black500"}
                      fontSize={"sm"}
                      mb={"6px"}
                    >
                      Congratulations! You have got
                      <Text
                        as={"span"}
                        fontWeight={600}
                        fontSize={"sm"}
                        color={"outly.black500"}
                      >
                        {" "}
                        FREE Shipping
                      </Text>
                    </Text>
                  </ScaleFade>
                </Box>
              ) : (
                <ScaleFade initialScale={0.9} in={subTotal < maxFreeShipping}>
                  <Text
                    fontWeight={400}
                    fontSize={"sm"}
                    mb={"6px"}
                    color={"outly.black500"}
                  >
                    Free Shipping on orders over{" "}
                    <Text
                      as={"span"}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"outly.black500"}
                    >
                      {currencyFormatter(maxFreeShipping)}{" "}
                    </Text>
                  </Text>
                </ScaleFade>
              )}

              <Box width={"100%"}>
                <Progress
                  max={maxFreeShipping}
                  value={subTotal}
                  colorScheme={subTotal > maxFreeShipping ? "green" : "appMain"}
                  borderRadius={"sm"}
                  height={"10px"}
                />
              </Box>
            </VStack>
          </DrawerHeader>

          <DrawerBody className="thinSB" px={0} py={2}>
            <VStack alignContent={"flex-start"} width={"100%"} spacing={"0px"}>
              {/* ITEMS */}
              {!fetchItems.isLoading && !isLoading && cartItems.length > 0 ? (
                <>
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <ListAnimate key={index}>
                        <DrawerItemCard
                          item={item}
                          handleRemoveItem={handleRemoveItem}
                          getItemPrice={getItemPrice}
                          getTotalQuantity={getTotalQuantity}
                        />
                      </ListAnimate>
                    ))}
                  </AnimatePresence>
                </>
              ) : null}

              {/* EMPTY */}
              {cartAtomValue.length === 0 ? (
                <SlideIn fullWidth>
                  <Box
                    width={"100%"}
                    bg={"outly.bg"}
                    py={"42px"}
                    role={"group"}
                  >
                    <VStack>
                      <Box
                        mb={6}
                        color={"outly.gray"}
                        _groupHover={{ color: "outly.main900" }}
                        transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
                      >
                        {<CartBagIcon />}
                      </Box>

                      <Text fontWeight={400} color={"outly.black400"} pb={3}>
                        Your cart is empty
                      </Text>

                      <Text
                        mb={2}
                        fontWeight={500}
                        textDecoration={"underline"}
                        textUnderlineOffset={"3px"}
                        _hover={{ color: "outly.main900" }}
                        transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
                      >
                        <Link href={"/wishlist"}>Add from Wishlist</Link>
                      </Text>

                      <Text
                        fontWeight={500}
                        textDecoration={"underline"}
                        textUnderlineOffset={"3px"}
                        _hover={{ color: "outly.main900" }}
                        transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
                      >
                        <Link href={"/shop"}>Explore Items</Link>
                      </Text>
                    </VStack>
                  </Box>
                </SlideIn>
              ) : null}

              {/* LOADING */}
              {(cartAtomValue.length > 0 && fetchItems.isLoading) ||
              isLoading ? (
                <HStack
                  width={"100%"}
                  height={"100%"}
                  px={"24px"}
                  py={"16px"}
                  spacing={"10px"}
                  alignItems={"Flex-start"}
                >
                  <Skeleton height={100} width={"35%"} />

                  <VStack
                    pt={"12px"}
                    width={"100%"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                    spacing={"8px"}
                  >
                    <Skeleton height={"20px"} width={"90%"} />
                    <Skeleton height={"14px"} width={"80%"} />
                    <Skeleton height={"14px"} width={"40%"} />
                  </VStack>
                </HStack>
              ) : null}
            </VStack>
          </DrawerBody>

          <DrawerFooter borderBlockStart={"1px solid #ddd"}>
            {!cartItems || cartItems?.length !== 0 ? (
              <Box width={"100%"} pt={"1px"}>
                <HStack
                  mb={"24px"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontWeight={500}>Subtotal:</Text>
                  <Text fontWeight={500}>{currencyFormatter(subTotal)}</Text>
                </HStack>

                <HStack
                  justifyContent={"space-between"}
                  gap={"8px"}
                  width={"100%"}
                >
                  <Button
                    // size={"lg"}
                    variant={"outline"}
                    width={"100%"}
                    onClick={() => {
                      router.push(`/cart`);
                    }}
                  >
                    View Cart
                  </Button>
                  <Button
                    // size={"lg"}
                    variant={"solid"}
                    width={"100%"}
                    onClick={() => {
                      router.push(`/checkout`);
                    }}
                  >
                    Checkout
                  </Button>
                </HStack>
              </Box>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
