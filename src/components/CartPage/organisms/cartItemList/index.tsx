import { CartButtons } from "@/components/General/molecules";
import { getSuggestions } from "@/functions";
import { currencyFormatter, ItemProp } from "@/utils";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  FormControl,
  Heading,
  HStack,
  Input,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";

export function CartItemList({
  loading,
  items,
  getItemPrice,
  refetch,
  removeItem,
}: {
  loading: boolean;
  items: ItemProp[];
  removeItem: (id: string) => void;
  getItemPrice: (id: string) => number;
  refetch: any;
}) {
  const toast = useToast();
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
                    {item.sizes && item.sizes.length > 0 ? (
                      <Text color={"outly.black500"} fontWeight={400}>
                        Size: {item.sizes?.join(", ")}
                      </Text>
                    ) : null}
                    {item.colors && item.colors?.length > 0 ? (
                      <Text color={"outly.black500"} fontWeight={400}>
                        Color: {item.colors.map((clr) => clr.color).join(", ")}
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
          ))}
        </VStack>
      ) : null}

      {items.length === 0 && !loading ? (
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

      {loading && items.length === 0 ? <YourCartSkeleton /> : null}

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
            refetch();
            toast({
              status: "success",
              title: "Cart Updated",
            });
          }}
        >
          Update Cart
        </Button>
      </HStack>

      {items.length > 0 ? (
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

          {items && items.length > 0 ? (
            <CartPageYouMayAlsoLike
              itemCategory={items[0]?.category}
              idArray={items.map((item) => item._id)}
            />
          ) : null}
        </section>
      ) : null}
    </Box>
  );
}

const YourCartSkeleton = () => {
  return (
    <Box>
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

const CartPageYouMayAlsoLike = ({
  itemCategory,
  idArray,
}: {
  itemCategory: string;
  idArray: string[];
}) => {
  const toast = useToast();
  const { data, isLoading } = useQuery(
    ["get_cart_suggestions"],
    () => {
      return getSuggestions(itemCategory, idArray);
    },
    {
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
      },
    }
  );

  return (
    <Box width={"full"}>
      <VStack alignItems={"flex-start"} width={"full"}>
        {isLoading || !data ? (
          <Box width={"100%"}>
            <YourCartSkeleton />
          </Box>
        ) : null}

        {data && data?.length > 0 ? (
          <Box width={"full"}>
            {data.map((item, index) => (
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
                    </Box>

                    <CartButtons item={item} showButtons showWishlist />
                  </HStack>
                </Box>
              </HStack>
            ))}
          </Box>
        ) : null}

        {data && data.length === 0 ? (
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
  );
};
