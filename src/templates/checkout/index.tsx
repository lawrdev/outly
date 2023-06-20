import { useState, useEffect } from "react";
import { Box, HStack, useToast, useDisclosure, Text } from "@chakra-ui/react";
import { Footer, Header } from "@/components/General/organisms";
import { CategoryHero } from "@/components/Category/organisms";
import { Container, PageWrapper } from "@/components/General/atoms";
import {
  Billings,
  InsertCoupon,
  Summary,
} from "@/components/Checkout/organisms";
import {
  DATE_NOW_WITH_TIME,
  FLUTTERWAVE_PUBLIC_KEY,
  ItemProp,
  maxFreeShipping,
  PAYSTACK_PUBLIC_KEY,
  shippingFee,
  TransactionErrorProp,
  TransactionProp,
} from "@/utils";
import { useRecoilState, useResetRecoilState } from "recoil";
import { cartAtom, checkoutInfoAtom } from "@/recoil";
import { getMultipleItems } from "@/functions/firebase/item";
import { useQuery } from "@tanstack/react-query";
import { calDiscount, generateID, getCart, updateCart } from "@/functions";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import { ConfirmOrder } from "@/components/Checkout/molecules";
import { CustomModal } from "@/components/General/molecules";
import { postTransactionResponse } from "@/functions/firebase/transactions";
import Link from "next/link";

const paymentMethods = [
  {
    label: "Direct Bank Transfer",
    desc: `Make your payment directly into our bank account. Please use
your Order ID as the payment reference. Your order will not be
shipped until the funds have cleared in our account.`,
    value: "direct_transfer",
  },
  {
    label: `Online Payment with PayStack`,
    desc: `Pay using Card, USSD or Online bank transfers`,
    value: "paystack",
  },
  {
    label: `Online Payment with Flutterwave`,
    desc: `Pay using Card, USSD or Online bank transfers`,
    value: "flutterwave",
  },
  {
    label: `Cash On Delivery`,
    desc: `Pay with cash upon delivery.`,
    value: "on_delivery",
  },
];

export interface PaystackConfigProps {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

export function CheckoutTemplate() {
  const [subTotal, setSubTotal] = useState(0);
  const [cartItems, setCartItems] = useState<ItemProp[]>([]);
  const [orderID, setOrderID] = useState("");

  const [cartAtomValue, setCartAtomValue] = useRecoilState(cartAtom);
  const [checkoutInfo, setCheckoutInfo] = useRecoilState(checkoutInfoAtom);
  const resetCheckoutInfo = useResetRecoilState(checkoutInfoAtom);

  const confirmOrderDisclosure = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  // generate orderID
  useEffect(() => {
    const orderString = generateID(5);
    const tday = dayjs().format("YYMMDD");
    setOrderID(`${orderString.toUpperCase()}${tday}`);
  }, []);

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

  // cal subTotal and totalPrice
  useEffect(() => {
    const calcTotalWithoutShipping = (): number => {
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
    let tot = calcTotalWithoutShipping();

    setSubTotal(tot);
  }, [cartAtomValue, fetchItems.data]);
  const calTotalPrice = (): number => {
    return subTotal > maxFreeShipping ? subTotal : subTotal + shippingFee;
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

  // flutterwave & Paystack
  const [flutterwaveConfig, setFlutterwaveConfig] = useState({
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: orderID,
    amount: checkoutInfo.total_price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: checkoutInfo.billings.email,
      phone_number: checkoutInfo.billings.phone,
      name: `${checkoutInfo.billings.first_name} ${checkoutInfo.billings.last_name}`,
    },
    customizations: {
      title: `Outly Payment`,
      description: `Payment for order id ${orderID}`,
      logo: "https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/outlyPNG.png?alt=media&token=6fae135a-f039-4f1d-8a5d-65a744c8fb44",
    },
  });
  const [paystackConfig, setPaystackConfig] = useState<PaystackConfigProps>({
    reference: orderID,
    email: checkoutInfo.billings.email,
    amount: checkoutInfo.total_price,
    publicKey: PAYSTACK_PUBLIC_KEY,
  });

  // sets paystack and flutterwave configs
  useEffect(() => {
    if (checkoutInfo) {
      setFlutterwaveConfig({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: orderID,
        amount: checkoutInfo.total_price,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: checkoutInfo.billings.email,
          phone_number: checkoutInfo.billings.phone,
          name: `${checkoutInfo.billings.first_name} ${checkoutInfo.billings.last_name}`,
        },
        customizations: {
          title: `Outly Payment`,
          description: `Payment for order id ${orderID}`,
          logo: "https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/outlyPNG.png?alt=media&token=6fae135a-f039-4f1d-8a5d-65a744c8fb44",
        },
      });

      setPaystackConfig({
        reference: new Date().getTime().toString(),
        email: checkoutInfo.billings.email,
        amount: checkoutInfo.total_price * 100,
        publicKey: PAYSTACK_PUBLIC_KEY,
      });
    }
  }, [checkoutInfo, orderID]);

  // RESET ALL
  const resetAll = () => {
    updateCart([]);
    setCartAtomValue([]);
    resetCheckoutInfo();
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    setCheckoutInfo((prev) => ({
      ...prev,
      orderID: orderID,
      total_price: calTotalPrice(),
    }));

    if (
      checkoutInfo.payment_method === "flutterwave" ||
      checkoutInfo.payment_method === "paystack"
    ) {
      confirmOrderDisclosure.onOpen();
    } else {
      const data: TransactionProp = {
        status: "pending",
        response: {
          status: "pending",
          method: checkoutInfo.payment_method,
          trxref: checkoutInfo.orderID,
        },
        checkoutInfo: checkoutInfo,
        amount: calTotalPrice(),
        method: checkoutInfo.payment_method,
        orderID: orderID,
        orderDate: DATE_NOW_WITH_TIME,
        freeShipping: subTotal > maxFreeShipping ? true : false,
        items: [...getCart()]?.map((x) => {
          let title =
            [...cartItems].find((i) => i._id === x.id)?.title || "unknown";
          let total = getItemPrice(x.id);
          return {
            ...x,
            title,
            total,
          };
        }),
      };

      postTransactionResponse(data);

      resetAll();

      return router.push({
        pathname: `/checkout/order-received`,
        query: {
          ...router.query,
          channel: checkoutInfo.payment_method,
          txref: orderID,
        },
      });
    }
  };

  //   PAYSTACK
  const onPaystackSuccess = (reference: any) => {
    const data: TransactionProp = {
      status: "success",
      response: reference,
      amount: calTotalPrice(),
      checkoutInfo: checkoutInfo,
      method: "paystack",
      orderID: orderID,
      orderDate: DATE_NOW_WITH_TIME,
      freeShipping: subTotal > maxFreeShipping ? true : false,
      items: [...getCart()]?.map((x) => {
        let title =
          [...cartItems].find((i) => i._id === x.id)?.title || "unknown";
        let total = getItemPrice(x.id);
        return {
          ...x,
          title,
          total,
        };
      }),
    };
    postTransactionResponse(data);
    toast({
      status: "success",
      title: "Payment successful!",
    });

    resetAll();

    router.push({
      pathname: `/checkout/order-received`,
      query: {
        ...router.query,
        channel: checkoutInfo.payment_method,
        txref: orderID,
      },
    });
  };
  const onPaystackClose = () => {
    // console.log("closeddddd paystack");
  };
  const initializePayment = usePaystackPayment(paystackConfig);

  // Flutterwave
  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);
  const handlePayWithFlutterwave = () => {
    handleFlutterPayment({
      callback: (response) => {
        const data: TransactionProp = {
          status: "success",
          response: response,
          amount: calTotalPrice(),
          checkoutInfo: checkoutInfo,
          method: "flutterwave",
          orderID: orderID,
          orderDate: DATE_NOW_WITH_TIME,
          freeShipping: subTotal > maxFreeShipping ? true : false,
          items: [...getCart()]?.map((x) => {
            let title =
              [...cartItems].find((i) => i._id === x.id)?.title || "unknown";
            let total = getItemPrice(x.id);
            return {
              ...x,
              title,
              total,
            };
          }),
        };

        postTransactionResponse(data);
        if (response.status === "successful") {
          resetAll();
          router.push({
            pathname: `/checkout/order-received`,
            query: {
              ...router.query,
              channel: checkoutInfo.payment_method,
              txref: orderID,
            },
          });
        } else {
          toast({
            status: "error",
            title: "Something went wrong",
            description: (
              <Text
                as={"span"}
                color={"outly.black100"}
                textDecoration={"underline"}
                textUnderlineOffset={"4px"}
              >
                <Link href={"/support"}>Contact us</Link>
              </Text>
            ),
          });
        }

        closePaymentModal();
      },

      onClose: () => {},
    });
  };

  const handlePayment = () => {
    if (
      checkoutInfo.total_price > 0 &&
      checkoutInfo.payment_method === "paystack"
    ) {
      // @ts-ignore
      initializePayment(onPaystackSuccess, onPaystackClose);
    } else if (
      checkoutInfo.total_price > 0 &&
      checkoutInfo.payment_method === "flutterwave"
    ) {
      handlePayWithFlutterwave();
    }
  };

  return (
    <>
      <PageWrapper>
        <header>
          <Header inActive />
        </header>

        <CategoryHero isCheckout />

        <main>
          <Container>
            <Box mt={"40px"}>
              <InsertCoupon />
            </Box>

            <form onSubmit={onSubmit}>
              <Box>
                <HStack
                  width={"full"}
                  alignItems={"flex-start"}
                  spacing={"0px"}
                  flexWrap={"wrap"}
                >
                  <Box
                    flexBasis={{ base: "100%", lg: "50%" }}
                    pr={{ base: "0px", lg: "24px" }}
                  >
                    <Billings />
                  </Box>

                  <Box
                    flexBasis={{ base: "100%", lg: "50%" }}
                    pl={{ base: "0px", lg: "24px" }}
                  >
                    <Summary
                      items={cartItems}
                      subTotal={subTotal}
                      orderID={orderID}
                      paymentMethods={paymentMethods}
                    />
                  </Box>
                </HStack>
              </Box>
            </form>
          </Container>
        </main>

        <Footer />
      </PageWrapper>

      {/* comfirm order modal */}
      <CustomModal disclosure={confirmOrderDisclosure}>
        <ConfirmOrder
          method={checkoutInfo.payment_method}
          disclosure={confirmOrderDisclosure}
          onClick={handlePayment}
        />
      </CustomModal>
    </>
  );
}
