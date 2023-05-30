import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
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
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { getMultipleItems } from "@/functions/firebase/item";
import { cartAtom } from "@/recoil";
import { currencyFormatter, ItemProp, maxFreeShipping } from "@/utils";
import { CartButtons } from "@/components/General/molecules";
import { calDiscount, getCart, removeItemFromCart } from "@/functions";
import { useRouter } from "next/router";
import { CartBagIcon, SlideIn } from "@/components/General/atoms";

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
  const queryClient = useQueryClient();

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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader pt={5} pb={4}>
            <Heading mb={"12px"} as={"h2"} size={"md"} fontWeight={500}>
              Your Cart {`(${getTotalQuantity()})`}
            </Heading>

            {/* FREE SHIPPING */}
            <VStack spacing={"2px"} alignItems={"flex-start"}>
              {subTotal > maxFreeShipping ? (
                <Box width={"100%"}>
                  <Text
                    className={subTotal > maxFreeShipping ? "track-in" : ""}
                    fontWeight={400}
                    color={"outly.black500"}
                    fontSize={"sm"}
                    mb={"6px"}
                  >
                    Congratulations! You have got
                    <Text as={"span"} fontWeight={500} color={"outly.black"}>
                      {" "}
                      FREE Shipping
                    </Text>
                  </Text>
                </Box>
              ) : (
                <Text fontWeight={500} fontSize={"sm"} mb={"6px"}>
                  Free Shipping
                  <Text as={"span"} fontWeight={400} color={"outly.black500"}>
                    {" "}
                    on orders over{" "}
                  </Text>
                  {currencyFormatter(maxFreeShipping)}
                </Text>
              )}

              <Box width={"100%"}>
                <Progress
                  max={maxFreeShipping}
                  value={subTotal}
                  colorScheme={
                    subTotal > maxFreeShipping ? "appSuccess" : "appMain"
                  }
                  borderRadius={"sm"}
                  height={"6px"}
                />
              </Box>
            </VStack>
          </DrawerHeader>

          <DrawerBody className="thinSB" px={0} py={0}>
            {/* ITEMS */}
            <VStack alignContent={"flex-start"} width={"100%"} spacing={"0px"}>
              {/* ITEMS */}
              {!fetchItems.isLoading && !isLoading && cartItems.length > 0 ? (
                <>
                  {cartItems.map((item, index) => (
                    <SlideIn key={index} fullWidth>
                      <Box
                        mb={2}
                        bg={"outly.bg"}
                        px={"24px"}
                        py={"10px"}
                        width={"100%"}
                        position={"relative"}
                      >
                        <HStack width={"100%"} spacing={"28px"}>
                          <Box>
                            <Image
                              alt={"cart item"}
                              src={item?.images[0]!}
                              width={120}
                              height={150}
                              quality={100}
                            />
                          </Box>

                          <VStack
                            alignItems={"flex-start"}
                            justifyContent={"center"}
                            width={"100%"}
                          >
                            <Text
                              fontWeight={500}
                              noOfLines={1}
                              _hover={{ color: "outly.main900" }}
                              transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
                            >
                              <Link href={`/item/${item?._id}`}>
                                {item?.title}
                              </Link>
                            </Text>
                            <HStack
                              width={"100%"}
                              justifyContent={"space-between"}
                            >
                              <CartButtons
                                item={item}
                                onClick={() => {
                                  getItemPrice(item?._id);
                                  getTotalQuantity();
                                }}
                              />

                              <Text fontWeight={500} fontSize={"md"}>
                                {currencyFormatter(getItemPrice(item?._id))}
                              </Text>
                            </HStack>
                          </VStack>
                        </HStack>
                        <CloseButton
                          size={"sm"}
                          position={"absolute"}
                          top={2}
                          right={4}
                          onClick={() => {
                            handleRemoveItem(item._id);
                          }}
                        />
                      </Box>
                    </SlideIn>
                  ))}
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
                        <Link href={"#"}>Add from Wishlist</Link>
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
                  spacing={"21px"}
                  alignItems={"center"}
                >
                  <Skeleton height={120} width={"25%"} />

                  <VStack
                    width={"100%"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                  >
                    <Skeleton height={"14px"} width={"60%"} />
                    <Skeleton height={"28px"} width={"40%"} />
                  </VStack>

                  <Box pt={"24px"} width={"20%"}>
                    <Skeleton height={"16px"} />
                  </Box>
                </HStack>
              ) : null}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {!cartItems || cartItems?.length !== 0 ? (
              <Box width={"100%"} pt={"1px"}>
                <HStack
                  mb={"34px"}
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
