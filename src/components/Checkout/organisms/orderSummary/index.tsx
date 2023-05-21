import { ReactNode, useState, useEffect } from "react";
import { AppHeader2 } from "@/components/General/atoms";
import {
  currencyFormatter,
  ItemProp,
  LocalStorageItemProp,
  maxFreeShipping,
  shippingFee,
} from "@/utils";
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Text,
  VStack,
  chakra,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { TfiCheck } from "react-icons/tfi";
import { calDiscount, getCart } from "@/functions";
import { useSetRecoilState } from "recoil";
import { checkoutInfoAtom } from "@/recoil";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface PaymentMethdProps {
  label: string;
  desc: string;
  value: string;
}
interface ItemSummaryProp {
  item: ItemProp;
  cart: LocalStorageItemProp;
}
type ValueProps =
  | "direct_transfer"
  | "paystack"
  | "flutterwave"
  | "on_delivery";

export function Summary({
  items,
  subTotal,
  orderID,
  paymentMethods,
}: {
  items: ItemProp[];
  subTotal: number;
  orderID: string;
  paymentMethods: PaymentMethdProps[];
}) {
  const [itemSummaries, setItemSummaries] = useState<ItemSummaryProp[]>();
  const [accdIndex, setAccdIndex] = useState(0);
  const setCheckoutInfo = useSetRecoilState(checkoutInfoAtom);
  const cart = getCart();

  const accdDisclosure = useDisclosure();

  useEffect(() => {
    let newArr = [];

    if (items.length > 0 && cart.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let itemCart = cart.find((x) => x.id === items[i]._id);
        if (itemCart) {
          newArr.push({ item: items[i], cart: itemCart });
        }
      }

      setItemSummaries(newArr);
    }
  }, [items, cart]);

  return (
    <Box>
      <AppHeader2 title={"Your Order"} />

      <Box mt={"32px"} bg={"outly.bg"} p={"24px"}>
        <Box width={"full"}>
          {/* ITEMS */}
          <Box width={"full"}>
            <SummaryHeader> Item(s)</SummaryHeader>
            {itemSummaries ? (
              <VStack
                py={"10px"}
                alignItems={"flex-start"}
                width={"full"}
                borderBlockStart={`1px solid #ddd`}
              >
                {itemSummaries.map((op, index) => (
                  <Box key={index} width={"full"}>
                    <HStack
                      width={"100%"}
                      mx={"auto"}
                      alignItems={"center"}
                      spacing={"4px"}
                      // borderBlockEnd={`1px solid #ddd`}
                    >
                      <Box position={"relative"} flexBasis={"20%"} height={90}>
                        <Image
                          src={op.item.images[0]}
                          alt={op.item.title}
                          style={{
                            objectFit: "contain",
                            objectPosition: "center left",
                          }}
                          quality={90}
                          fill
                        />
                      </Box>

                      <Box flex={1}>
                        <Text pb={1} fontWeight={500}>
                          {op.item.title}
                        </Text>
                        {op.cart.size ? (
                          <Text color={"outly.black500"}>
                            Size: {op.cart.size?.join(" ")}
                          </Text>
                        ) : null}
                        {op.cart.color ? (
                          <Text my={0.5} color={"outly.black500"}>
                            Color: {op.cart.color?.join(" ")}
                          </Text>
                        ) : null}
                      </Box>

                      <Text fontSize={"md"} fontWeight={500}>
                        {op.item.discount
                          ? currencyFormatter(
                              calDiscount(op.item.discount, op.item.price) *
                                op.cart.quantity
                            )
                          : currencyFormatter(op.item.price * op.cart.quantity)}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            ) : null}
            <HStack
              py={"24px"}
              justifyContent={"space-between"}
              borderBlock={`1px solid #ddd`}
              spacing={"12px"}
            >
              <Text fontWeight={500} fontSize={"lg"}>
                SubTotal:
              </Text>
              <Text fontWeight={500}>{currencyFormatter(subTotal)}</Text>
            </HStack>
          </Box>

          {/* SHIPPING */}
          <Box width={"full"} mb={"24px"} pt={"24px"}>
            <Box mb={"10px"}>
              <SummaryHeader> Shipping</SummaryHeader>
            </Box>

            <Text color={"outly.black500"}>
              Flat fee:{" "}
              <Text as={"span"} fontWeight={500}>
                {currencyFormatter(shippingFee)}
              </Text>
            </Text>
            <Text color={"outly.black500"}>
              Order ID:{" "}
              <Text as={"span"} fontWeight={500}>
                {orderID}
              </Text>
            </Text>
            <HStack
              pt={"16px"}
              justifyContent={"center"}
              width={"full"}
              color={"outly.black500"}
            >
              {subTotal > maxFreeShipping ? (
                <>
                  <Text color={"outly.black400"}>You have Free shipping</Text>
                  <Text as={"span"}>{<TfiCheck />}</Text>
                </>
              ) : (
                <>
                  <Text color={"outly.black100"}>
                    Get free shipping on orders above{" "}
                    {currencyFormatter(maxFreeShipping)}
                  </Text>
                </>
              )}
            </HStack>
            {subTotal < maxFreeShipping ? (
              <Text
                mt={"6px"}
                mb={"24px"}
                width={"fit-content"}
                mx={"auto"}
                textAlign={"center"}
                textDecoration={"underline"}
                textUnderlineOffset={"4px"}
                color={"outly.black100"}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={"/shop"}>Continue Shopping</Link>
              </Text>
            ) : null}

            <HStack
              py={"24px"}
              justifyContent={"space-between"}
              spacing={"12px"}
              borderBlock={`1px solid #ddd`}
              color={"outly.main900"}
            >
              <Text fontWeight={500} fontSize={"xl"}>
                Total:
              </Text>
              <Text fontWeight={500}>
                {subTotal > maxFreeShipping
                  ? currencyFormatter(subTotal)
                  : currencyFormatter(subTotal + shippingFee)}
              </Text>
            </HStack>
          </Box>

          {/* PAYMENT */}
          <Box mb={"24px"}>
            <SummaryHeader>PAYMENT</SummaryHeader>

            <Accordion
              mb={"42px"}
              width={"full"}
              defaultIndex={[0]}
              userSelect={"none"}
              onChange={(currIndex: number) => {
                setAccdIndex(currIndex);

                const selected = [
                  "direct_transfer",
                  "paystack",
                  "flutterwave",
                  "on_delivery",
                ];

                setCheckoutInfo((prev) => ({
                  ...prev,
                  payment_method: selected[currIndex] as ValueProps,
                }));
              }}
            >
              {paymentMethods.map((item, index) => (
                <AccordionItem key={index} width={"full"} border={"none"}>
                  <chakra.h2
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={"16px"}
                  >
                    <AccordionButton
                      position={"relative"}
                      zIndex={2}
                      px={0}
                      width={"full"}
                      justifyContent={"flex-start"}
                      gap={"18px"}
                      // _hover={{ bg: "transparent" }}
                    >
                      <Checkbox
                        borderRadius={"full"}
                        border={"1.5px solid #111"}
                        overflow={"hidden"}
                        colorScheme={"appMain"}
                        isChecked={accdIndex === index}
                        _hover={{ cursor: "default" }}
                        value={item.value}
                      />
                      {item.label}
                    </AccordionButton>
                  </chakra.h2>
                  <AccordionPanel
                    pl={"24px"}
                    pt={0}
                    pb={4}
                    color={"outly.black100"}
                  >
                    {item.desc}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <Button type={"submit"} size={"lg"} width={"full"}>
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const SummaryHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Heading
      mb={4}
      as={"h5"}
      fontSize={"sm"}
      fontWeight={500}
      color={"outly.black100"}
      letterSpacing={"wide"}
      textTransform={"uppercase"}
    >
      {children}
    </Heading>
  );
};
