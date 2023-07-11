import { useState } from "react";
import { currencyFormatter, ItemProp, SearchCategoriesTypes } from "@/utils";
import { Box, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { getCartPageSuggestions } from "@/functions/firebase/category";
import { useQuery } from "@tanstack/react-query";
import { YourCartSkeleton } from "../cartItemList";
import Image from "next/image";
import Link from "next/link";
import { CartButtons } from "@/components/General/molecules";

export const CartPageYouMayAlsoLike = ({
  categories,
  idArray,
}: {
  categories: SearchCategoriesTypes[];
  idArray: string[];
}) => {
  const [dataToShow, setDataToShow] = useState<ItemProp[]>();
  const toast = useToast();
  const { isLoading } = useQuery(
    ["get_cart_suggestions"],
    () => {
      return getCartPageSuggestions({
        categoryNames: categories,
      });
    },
    {
      onSuccess: (data) => {
        if (data.length > 0) {
          let newItems: ItemProp[] = [...data];
          for (let i = 0; i < idArray.length; i++) {
            newItems = newItems.filter((item) => item._id !== idArray[i]);
          }

          setDataToShow(newItems.slice(0, 4));
        } else {
          setDataToShow([]);
        }
      },
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
      },
    }
  );

  return (
    <section>
      <Box
        mt={"50px"}
        pb={6}
        border={"1px solid transparent"}
        borderBlockEndColor={"outly.gray100"}
      >
        <Heading as={"h2"} fontSize={"2xl"} fontWeight={500}>
          You May Also Like
        </Heading>
      </Box>
      <Box width={"full"}>
        <VStack alignItems={"flex-start"} width={"full"}>
          {isLoading || !dataToShow ? (
            <Box width={"100%"}>
              <YourCartSkeleton />
            </Box>
          ) : null}

          {dataToShow && dataToShow?.length > 0 ? (
            <Box width={"full"}>
              {dataToShow.map((item, index) => (
                <HStack
                  key={index}
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
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={"lg"}
                          _hover={{ color: "outly.main900" }}
                        >
                          <Link href={`/item/${item._id}`}>{item.title}</Link>
                        </Text>
                        <Text
                          fontWeight={400}
                          fontSize={"lg"}
                          color={"outly.black500"}
                        >
                          {currencyFormatter(item.price)}
                        </Text>

                        <Box
                          display={{ base: "block", md: "none" }}
                          pt={"12px"}
                        >
                          <CartButtons size={"sm"} item={item} showWishlist />
                        </Box>
                      </Box>

                      <Box display={{ base: "none", md: "block" }}>
                        <CartButtons item={item} showButtons showWishlist />
                      </Box>
                    </HStack>
                  </Box>
                </HStack>
              ))}
            </Box>
          ) : null}

          {dataToShow && dataToShow.length === 0 ? (
            <Text mt={8} mb={5} color={"outly.black100"}>
              Nothing to show here.{" "}
              <Link href={"/shop"}>
                <Text
                  as={"span"}
                  textDecoration={"underline"}
                  textUnderlineOffset={"4px"}
                  _hover={{ color: "outly.main900" }}
                >
                  View Shop
                </Text>
              </Link>
            </Text>
          ) : null}
        </VStack>
      </Box>
    </section>
  );
};
