import {
  ButtonBox,
  DeliveryIcon,
  HotIcon,
  Rating,
  ShippingIcon,
} from "@/components/General/atoms";
import { CartButtons } from "@/components/General/molecules";
import {
  addItemColorToCart,
  addItemSizeToCart,
  calDiscount,
  getCart,
  getSizeLabel,
} from "@/functions";
import { cartAtom, OwnerAtom } from "@/recoil";
import { currencyFormatter, ItemProp, maxFreeShipping } from "@/utils";
import {
  Box,
  Heading,
  Skeleton,
  Text,
  VStack,
  chakra,
  HStack,
  Link as ChakraLink,
  Progress,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { BsShop } from "react-icons/bs";
import { GrOverview } from "react-icons/gr";
import { useRecoilValue } from "recoil";

interface Props {
  item: ItemProp;
  setDefaultIndex?: Dispatch<SetStateAction<number>>;
}

export function ItemDetails({ item, setDefaultIndex }: Props) {
  const [currSize, setCurrSize] = useState("");
  const [currColor, setCurrColor] = useState("");

  const ownerRecoilAtom = useRecoilValue(OwnerAtom);
  const cartAtomValue = useRecoilValue(cartAtom);
  const cart = getCart();

  const onSizeClick = (str: string) => {
    setCurrSize(str);
    addItemSizeToCart(item._id, str);
  };
  const onColorClick = (str: string) => {
    setCurrColor(str);
    addItemColorToCart(item._id, str);
  };

  useEffect(() => {
    if (cartAtomValue.find((x) => x?.id === item._id) == null) {
      setCurrColor("");
      setCurrSize("");
    }
  }, [cartAtomValue, item._id]);

  return (
    <Box pt={"20px"} pb={"20px"} width={"100%"}>
      <Text
        mb={"22px"}
        fontWeight={400}
        color={"outly.black500"}
        display={"inline-flex"}
        gap={1.5}
        alignItems={"center"}
      >
        <Text
          as={"span"}
          display={"inline-flex"}
          gap={2}
          alignItems={"center"}
          fontWeight={500}
          color={"#FF4154"}
        >
          {<GrOverview className="binoculars" fontSize={"20px"} />} 546 guests
        </Text>{" "}
        have viewed this product
      </Text>

      <Heading as={"h1"} mb={"6px"} size={"lg"} fontWeight={500}>
        {item.title}
      </Heading>

      {/* RATING */}
      {/* !item.discount && !item.hot && */}
      {item.reviews ? (
        <Box ml={"-4px"}>
          <HStack>
            <Rating maxWidth={110} value={item.rating || 4} black />
            <Link
              href={"#reviews"}
              onClick={() => setDefaultIndex && setDefaultIndex(0)}
              className="hover:underline underline-offset-8"
            >{`(${item.reviews?.length})`}</Link>
          </HStack>
        </Box>
      ) : null}

      {/* PRICE */}
      <Text mb={"20px"}>
        {item.discount ? (
          <Text
            as={"span"}
            fontSize={"24px"}
            display={"flex"}
            py={"6px"}
            gap={2}
            fontWeight={400}
            color={"outly.black500"}
          >
            <chakra.del color={"outly.gray"}>
              {currencyFormatter(item.price)}
            </chakra.del>
            <chakra.ins textDecoration={"none"} color={"outly.black500"}>
              {`${currencyFormatter(calDiscount(item.discount, item.price))}`}
            </chakra.ins>
            {/* – ${currencyFormatter(item.price)} */}
          </Text>
        ) : (
          <Text
            as={"span"}
            fontSize={"24px"}
            fontWeight={400}
            color={"outly.black500"}
          >
            {currencyFormatter(item.price)}
          </Text>
        )}
      </Text>

      {item.outOfStock && (
        <Box mb={8}>
          <Text mb={4} color={"outly.red"} fontWeight={500} fontSize={"md"}>
            Out of stock
          </Text>
          <Box border={"1px solid #FFD75E"} p={"24px"}>
            <Heading mb={3} as={"h5"} size={"md"} fontWeight={500}>
              Email me when available
            </Heading>
            <Text mb={2} color={"outly.black100"}>
              Get notified via email when this product is back in stock!
            </Text>

            <form onSubmit={(e) => e.preventDefault()}>
              <HStack spacing={4}>
                <Input
                  type={"email"}
                  placeholder={"Email Address *"}
                  size={"lg"}
                  focusBorderColor="#FFD75E50"
                  isRequired
                />
                <Button type={"submit"} size={"lg"} px={"34px"}>
                  Notify Me
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      )}

      {!item.outOfStock && (
        <>
          {/* HOT ??? */}
          {item.hot ? (
            <Box mb={6}>
              <Text
                mb={2}
                fontSize={"md"}
                color={"#FF4154"}
                display={"flex"}
                gap={1.5}
                fontWeight={500}
              >
                <BsShop fontSize={"22px"} color={"#FF4154"} />
                {`${item.hot.itemsLeft} item(s) left in stock`}
              </Text>
              <Progress
                max={50}
                value={item.hot.itemsLeft}
                height={"8px"}
                borderRadius={"sm"}
                bg="outly.bg100"
                colorScheme={"appRed"}
              />
            </Box>
          ) : null}

          {/* SIZE */}
          {item.sizes ? (
            <Box mb={6}>
              <Text mb={2} color={"outly.black500"}>
                Size: {currSize}
              </Text>
              <HStack spacing={3}>
                {item.sizes?.map((size, index) => (
                  <ButtonBox
                    key={index}
                    tooltip={getSizeLabel(size)}
                    itemQuantity={
                      cart.find((x) => x.id === item._id)?.quantity || 0
                    }
                    isLight
                    isSize
                    value={size}
                    onClick={() => {
                      onSizeClick(size);
                    }}
                    isClicked={currSize === size}
                  >
                    <Text px={2}>{size}</Text>
                  </ButtonBox>
                ))}
              </HStack>
            </Box>
          ) : null}

          {/* COLOR */}
          {item.colors ? (
            <Box mb={6}>
              <Text mb={2} color={"outly.black500"}>
                Color: {currColor}
              </Text>
              <HStack spacing={3}>
                {item.colors?.map((color, index) => (
                  <ButtonBox
                    key={index}
                    isColor={color.hex}
                    itemQuantity={
                      cart.find((x) => x.id === item._id)?.quantity || 0
                    }
                    value={color.color}
                    onClick={() => {
                      onColorClick(color.color);
                    }}
                    isClicked={currColor === color.color}
                  />
                ))}
              </HStack>
            </Box>
          ) : null}

          {/* QUANTITY */}
          {item._id ? (
            <Box mb={6}>
              <Text mb={2} color={"outly.black500"}>
                Quantity
              </Text>

              <Box>
                <CartButtons item={item} showButtons showWishlist showBuynow />
              </Box>
            </Box>
          ) : null}
        </>
      )}

      {/* CHECKOUT */}
      <Box mb={6}>
        <Stack
          p={"18px"}
          bg={"outly.bg"}
          spacing={"0px"}
          gap={"12px"}
          borderRadius={"md"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Text
            maxWidth={"fit-content"}
            fontSize={"sm"}
            color={"outly.black500"}
            flexBasis={{ base: "100%", xl: "auto" }}
          >
            Secure checkout with
          </Text>
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/item%2Faa.webp?alt=media&token=c124998c-d889-4947-9d7c-35c3f794d739`}
            alt="payment gateways"
            width={300}
            height={30}
            quality={100}
          />
        </Stack>
      </Box>

      <Box mb={6}>
        <HStack mb={6} spacing={4}>
          <ShippingIcon />
          <Text color={"outly.black500"}>
            Free shipping on orders over {currencyFormatter(maxFreeShipping)}
          </Text>
        </HStack>

        <HStack spacing={4}>
          <DeliveryIcon />
          <Text color={"outly.black500"}>
            Delivers in: 3-7 Working Days.
            <Text
              pl={2}
              as={Link}
              href="#"
              color={"outly.black500"}
              cursor={"pointer"}
              textDecoration={"underline"}
              textUnderlineOffset={"4px"}
              _hover={{ color: "outly.main900", textDecoration: "underline" }}
            >
              Learn more
            </Text>
          </Text>
        </HStack>
      </Box>

      <Box
        mb={6}
        pt={"24px"}
        border={"1px solid transparent"}
        borderTopColor={"outly.bg"}
      >
        <Text mb={2} color={"outly.black500"}>
          Order Ref:{" "}
          <Text as={"span"} color={"outly.black"} fontWeight={500}>
            BYMBA801-BLK
          </Text>
        </Text>
        <Text color={"outly.black500"}>
          Category:{" "}
          <Text
            as={"span"}
            color={"outly.black500"}
            textDecoration={"underline"}
            textUnderlineOffset={"3px"}
            textDecorationThickness={"1px"}
            _hover={{ color: "outly.main900" }}
          >
            <Link
              href={`/category/${
                item.subCategory ? item.subCategory : item.category[0]
              }`}
            >
              {item.subCategory ? item.subCategory : item.category[0]}
            </Link>
          </Text>
        </Text>
      </Box>

      {/* SHARE */}
      <Box mb={6}>
        <HStack spacing={3} alignItems={"flex-start"}>
          <Text color={"outly.black500"}>Share:</Text>
          <chakra.ul display={"flex"} alignItems={"center"} gap={2}>
            {ownerRecoilAtom?.socials.map((item, index) => (
              <chakra.li key={index}>
                <ChakraLink
                  href={item.link}
                  fontSize={"20px"}
                  _hover={{
                    color: "outly.main900",
                  }}
                  isExternal
                >
                  {item.icon}
                </ChakraLink>
              </chakra.li>
            ))}
          </chakra.ul>
        </HStack>
      </Box>
    </Box>
  );
}

export function ItemDetailsSkelton() {
  return (
    <VStack mt={"20px"} spacing={2} width={"100%"} alignItems={"flex-start"}>
      <Skeleton height={"14px"} width={"100%"} />
      <Skeleton height={"26px"} width={"70%"} />
      <Skeleton height={"26px"} width={"40%"} />
    </VStack>
  );
}
