import { useRef, useEffect, useState } from "react";
import { BoxLoader } from "@/components/General/atoms";
import { CartButtons } from "@/components/General/molecules";
import {
  currencyFormatter,
  ItemProp,
  LocalStorageItemProp,
  SearchCategoriesTypes,
} from "@/utils";
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  Heading,
  HStack,
  Input,
  Skeleton,
  Text,
  useToast,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { getCartPageSuggestions } from "@/functions/firebase/category";

export function CartItemList({
  loading,
  items,
  refetch,
  getItemPrice,
  removeItem,
  itemInCartFn,
}: {
  loading: boolean;
  items: ItemProp[];
  refetch: any;
  removeItem: (id: string) => void;
  getItemPrice: (id: string) => number;
  itemInCartFn: (id: string) => LocalStorageItemProp | undefined;
}) {
  const timerRef = useRef<any | null>(null);
  const toast = useToast();
  const disclosure = useDisclosure();

  // clear timeout Unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Box>
      <HStack
        pb={6}
        justifyContent={"space-between"}
        border={"1px solid transparent"}
        borderBlockEndColor={"outly.gray100"}
      >
        <Heading as={"h2"} fontSize={"2xl"} fontWeight={500}>
          Your Cart
        </Heading>
        <Text fontSize={"xl"} fontWeight={500} color={"outly.black500"}>
          {items.length > 1 ? `${items.length} items` : `${items.length} item`}
        </Text>
      </HStack>

      {items.length > 0 ? (
        <VStack width={"100%"}>
          {loading ? (
            <YourCartSkeleton />
          ) : (
            <>
              <BoxLoader disclosure={disclosure} rest={{ width: "full" }}>
                {items.map((item, index) => (
                  <Box key={index} width={"full"}>
                    <HStack
                      py={6}
                      border={"1px solid transparent"}
                      borderBlockEndColor={"outly.gray100"}
                      alignItems={"center"}
                      spacing={8}
                    >
                      <Box>
                        <Image
                          alt={item.title}
                          src={item.images[0]}
                          width={120}
                          height={150}
                          quality={100}
                        />
                      </Box>

                      <Box width={"full"}>
                        <HStack width={"full"} justifyContent={"space-between"}>
                          <Text
                            fontWeight={500}
                            fontSize={"lg"}
                            _hover={{ color: "outly.main900" }}
                          >
                            <Link href={`/item/${item._id}`}>{item.title}</Link>
                          </Text>
                          <CloseButton
                            onClick={() => {
                              removeItem(item._id);
                            }}
                          />
                        </HStack>

                        <HStack mt={1} mb={5} spacing={6}>
                          {itemInCartFn(item._id)?.size ? (
                            <Text color={"outly.black500"} fontWeight={400}>
                              Size: {itemInCartFn(item._id)?.size}
                            </Text>
                          ) : null}

                          {itemInCartFn(item._id)?.color ? (
                            <Text color={"outly.black500"} fontWeight={400}>
                              Color: {itemInCartFn(item._id)?.color}
                            </Text>
                          ) : null}
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                          <CartButtons item={item} />

                          <Text color={"outly.black500"} fontSize={"lg"}>
                            {currencyFormatter(getItemPrice(item._id))}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                  </Box>
                ))}{" "}
              </BoxLoader>
            </>
          )}
        </VStack>
      ) : null}

      {items.length === 0 ? (
        <VStack
          mt={"28px"}
          pb={"32px"}
          width={"full"}
          alignItems={"center"}
          spacing={"32px"}
        >
          <HStack>
            <Text color={"outly.black100"}>
              You currently have no item in your cart{" "}
            </Text>

            <Box className={"rotate-xd"} fontSize={"28px"}>
              {<GiShoppingCart />}
            </Box>
          </HStack>

          <Button>Explore Items</Button>
        </VStack>
      ) : null}

      <HStack my={10} width={"full"} justifyContent={"space-between"}>
        <FormControl width={"fit-content"}>
          <HStack justifyContent={"flex-end"} spacing={3}>
            <Input
              maxWidth={"160px"}
              variant={"outline"}
              placeholder={"Coupon Code"}
              borderRadius={"none"}
              border={"none"}
              borderBottom={"1px solid #ddd"}
              focusBorderColor={"outly.black"}
              _focus={{
                outline: "none",
                ring: "none",
              }}
              _hover={{ borderBottomColor: "black" }}
            />
            <Button variant={"outline"}>Apply</Button>
          </HStack>
        </FormControl>

        <Button
          variant={"outline"}
          px={8}
          color={"outly.black500"}
          onClick={() => {
            disclosure.onOpen();
            timerRef.current = setTimeout(() => {
              disclosure.onClose();
              refetch();
              toast({
                status: "success",
                title: "Cart Updated",
              });
            }, 2000);
          }}
        >
          Update Cart
        </Button>
      </HStack>
    </Box>
  );
}

export const YourCartSkeleton = () => {
  return (
    <Box width={"100%"}>
      <HStack
        width={"100%"}
        height={"100%"}
        py={"16px"}
        spacing={"21px"}
        alignItems={"center"}
      >
        <Skeleton height={120} width={"25%"} />

        <VStack
          width={"100%"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          spacing={"12px"}
        >
          <Skeleton height={"14px"} width={"60%"} />
          <Skeleton height={"28px"} width={"40%"} />
        </VStack>

        <Box pt={"24px"} width={"20%"}>
          <Skeleton height={"16px"} />
        </Box>
      </HStack>
    </Box>
  );
};
