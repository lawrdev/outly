import { useState, useEffect } from "react";
import { CategoryHero } from "@/components/Category/organisms";
import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header } from "@/components/General/organisms";
import {
  ConfirmationBox,
  OrderDetails,
} from "@/components/orderReceived/molecules";
import { Box, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/functions/firebase/transactions";
import { TransactionProp } from "@/utils";
import { TfiInfo } from "react-icons/tfi";
import { BiErrorAlt } from "react-icons/bi";
import Link from "next/link";

export function OrderReceivedTemplate() {
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const { channel: queryChannel, txref: queryTxRef } = router.query;

  const fetchTransaction = useQuery(
    ["get_transaction"],
    () => {
      return getTransaction(queryTxRef as string);
    },
    {
      enabled: !!queryTxRef,
      onSuccess: (data) => {
        if (Object.keys(data).length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
      },
    }
  );

  return (
    <PageWrapper>
      <header>
        <Header inActive />
      </header>

      <CategoryHero isCheckout />

      <main>
        <Container>
          {fetchTransaction.data && !isEmpty ? <ConfirmationBox /> : null}

          {fetchTransaction.data && !isEmpty ? (
            <Box pt={"39px"}>
              <OrderDetails op={fetchTransaction.data} />
            </Box>
          ) : null}

          {fetchTransaction.isLoading && queryTxRef ? (
            <Box width={"full"} mt={"32px"}>
              <Skeleton height={"68px"} borderRadius={"md"} />

              <VStack mt={"18px"} spacing={"20px"}>
                <Skeleton height={"18px"} borderRadius={"md"} />
                <Skeleton height={"18px"} borderRadius={"md"} />
                <Skeleton height={"18px"} borderRadius={"md"} />
              </VStack>
            </Box>
          ) : null}

          {(!fetchTransaction.isLoading && isEmpty) ||
          isEmpty ||
          !queryTxRef ||
          !queryChannel ? (
            <VStack my={"52px"} w={"full"} alignItems={"center"}>
              <BiErrorAlt fontSize={"112px"} color={"#ddd"} />

              <Box maxW={"400px"} textAlign={"center"}>
                <Text mb={1} fontSize={"xl"} fontWeight={500}>
                  Missing transaction or Something went wrong
                </Text>
                <Text color={"outly.black500"}>
                  Confirm your transaction reference or please
                  <Text
                    as={"span"}
                    pl={"6px"}
                    textDecoration={"underline"}
                    textUnderlineOffset={"4px"}
                    _hover={{ color: "outly.main900" }}
                  >
                    <Link href={"/support"}>contact us</Link>
                  </Text>
                </Text>
              </Box>
            </VStack>
          ) : null}
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
