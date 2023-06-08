import { useState, useEffect } from "react";
import { AppHeader2 } from "@/components/General/atoms";
import { currencyFormatter, maxFreeShipping, TransactionProp } from "@/utils";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Button,
} from "@chakra-ui/react";

type DetailsProp = Array<{
  title?: string;
  id?: string;
  quantity?: number;
  total?: number;
  size?: string;
  color?: string;
  label?: string;
  value?: string | undefined;
}>;
export function OrderDetails({ op }: { op: TransactionProp }) {
  const [details, setDetails] = useState<DetailsProp>();
  const checkPaymentMethod = (str: string) => {
    const ops = [
      { op: "on_delivery", text: "Cash On Delivery" },
      { op: "direct_transfer", text: "Direct Bank Transfer" },
      {
        op: "paystack",
        text: "Paystack",
      },
      {
        op: "flutterwave",
        text: "Flutterwave",
      },
    ];

    const x = ops.find((p) => p.op === str)?.text;
    return x;
  };

  useEffect(() => {
    const xItems = [...op.items];
    const xDescs = [
      {
        label: "Subtotal",
        value: op.freeShipping
          ? currencyFormatter(op.amount)
          : currencyFormatter(op.amount - maxFreeShipping),
      },
      {
        label: "Shipping",
        value: op.freeShipping
          ? "Free Shipping"
          : currencyFormatter(maxFreeShipping),
      },
      {
        label: "Payment Method",
        value: checkPaymentMethod(op.method),
      },
      {
        label: "Total",
        value: currencyFormatter(op.amount),
      },
    ];

    setDetails([...xItems, ...xDescs]);
  }, [op]);

  return (
    <Box>
      <VStack pt={"22px"} mb={"52px"}>
        {op.method === "flutterwave" ||
        op.method === "paystack" ||
        op.method === "on_delivery" ? (
          <>
            <Text fontSize={"xl"} fontWeight={500}>
              Your order is being processed!
            </Text>
            <Text color={"outly.black400"}>We will contact you shortly...</Text>
          </>
        ) : null}
        {op.method === "direct_transfer" ? (
          <>
            <Text mb={3} fontSize={"xl"} fontWeight={500}>
              Complete your order
            </Text>

            <Box maxW={"501px"} w={"full"} p={"20px"} bg={"outly.bg"}>
              <TableContainer className="thinSB">
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Account Number: </Td>
                      <Td fontWeight={600}>004648XXXXX</Td>
                    </Tr>
                    <Tr>
                      <Td>Bank Name: </Td>
                      <Td fontWeight={500}>Kuda Bank</Td>
                    </Tr>
                    <Tr>
                      <Td>Account Name: </Td>
                      <Td fontWeight={500}>Outly & Co, Inc</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            <Text
              pt={3}
              maxW={"501px"}
              textAlign={"center"}
              fontSize={"lg"}
              color={"outly.black500"}
            >
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </Text>

            <HStack pt={"12px"} spacing={"18px"}>
              <Button variant={"outline"} px={"28px"}>
                Cancel
              </Button>
              <Button colorScheme={"appMain"} px={"28px"}>
                PAYMENT SENT
              </Button>
            </HStack>
          </>
        ) : null}
      </VStack>

      {/* TOP BOX */}
      <Grid
        mb={"42px"}
        templateColumns="repeat(12, 1fr)"
        border={"2px dotted #ddd"}
        borderRadius={"md"}
      >
        <GridItem
          colSpan={{ base: 12, sm: 6, md: 4, lg: 3 }}
          borderInlineEnd={"2px dotted #ddd"}
          borderTop={{ base: "2px dotted #ddd", sm: "none" }}
        >
          <VStack p={"16px"} alignItems={"flex-start"} w={"full"}>
            <Heading
              as={"h6"}
              fontSize={"sm"}
              letterSpacing={"wider"}
              fontWeight={400}
              color={"outly.black400"}
            >
              ORDER ID:
            </Heading>
            <Text fontWeight={500}>{op.orderID}</Text>
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 12, sm: 6, md: 4, lg: 3 }}
          borderInlineEnd={"2px dotted #ddd"}
          borderTop={{ base: "2px dotted #ddd", sm: "none" }}
        >
          <VStack p={"16px"} alignItems={"flex-start"} w={"full"}>
            <Heading
              as={"h6"}
              fontSize={"sm"}
              letterSpacing={"wider"}
              fontWeight={400}
              color={"outly.black400"}
            >
              DATE:
            </Heading>
            <Text fontWeight={500}>{op.orderDate}</Text>
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 12, sm: 6, md: 4, lg: 3 }}
          borderTop={{ base: "2px dotted #ddd", md: "none" }}
        >
          <VStack p={"16px"} alignItems={"flex-start"} w={"full"}>
            <Heading
              as={"h6"}
              fontSize={"sm"}
              letterSpacing={"wider"}
              fontWeight={400}
              color={"outly.black400"}
            >
              TOTAL:
            </Heading>
            <Text fontWeight={500}>{currencyFormatter(op.amount)}</Text>
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 12, sm: 6, md: 12, lg: 3 }}
          borderTop={{ base: "2px dotted #ddd", lg: "none" }}
        >
          <VStack p={"16px"} alignItems={"flex-start"} w={"full"}>
            <Heading
              as={"h6"}
              fontSize={"sm"}
              letterSpacing={"wider"}
              fontWeight={400}
              color={"outly.black400"}
            >
              PAYMENT METHOD:
            </Heading>
            <Text fontWeight={500}>{checkPaymentMethod(op.method)}</Text>
          </VStack>
        </GridItem>
      </Grid>

      {/* DETAILS */}
      <Box>
        <AppHeader2 title="Order Details" />
        <TableContainer mt={"10px"} className="thinSB">
          <Table variant="striped" colorScheme="appGray">
            <Thead>
              <Tr>
                <Th textAlign={"center"} fontSize={"md"}>
                  Item
                </Th>
                <Th textAlign={"center"} fontSize={"md"}>
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {details?.map((item, index) => (
                <Tr key={index}>
                  {item.label ? (
                    <>
                      <Td>
                        <Text textAlign={"center"} fontWeight={500}>
                          {item.label}:
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          textAlign={"center"}
                          color={"outly.black400"}
                          fontWeight={600}
                        >
                          {item.value}
                        </Text>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>
                        <Text
                          color={"outly.black500"}
                          mb={3}
                          textAlign={"center"}
                          fontWeight={500}
                        >
                          {`${item.title} x ${item.quantity}`}
                        </Text>

                        {item.size ? (
                          <Text
                            color={"outly.black100"}
                            textAlign={"center"}
                          >{`Size: ${item.size}`}</Text>
                        ) : null}
                        {item.color ? (
                          <Text
                            color={"outly.black100"}
                            textAlign={"center"}
                          >{`Color: ${item.color}`}</Text>
                        ) : null}
                      </Td>
                      <Td>
                        <Text textAlign={"center"} color={"outly.black400"}>
                          {currencyFormatter(item.total!)}
                        </Text>
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
