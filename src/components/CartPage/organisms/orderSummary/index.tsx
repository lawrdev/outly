import { currencyFormatter } from "@/utils";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdLocalCarWash } from "react-icons/md";

const freeShippingValue = 30000;

export function OrderSummary({ subTotal }: { subTotal: number }) {
  return (
    <section>
      <Box pb={6}>
        <Heading as={"h2"} fontSize={"2xl"} fontWeight={500}>
          Order Summary
        </Heading>
      </Box>

      <Box
        width={"full"}
        maxWidth={"440px"}
        mr={"auto"}
        p={"32px"}
        bg={"outly.bg"}
        borderRadius={"md"}
      >
        <HStack
          mb={8}
          pb={6}
          justifyContent={"space-between"}
          border={"1px solid transparent"}
          borderBlockEndColor={"outly.gray100"}
        >
          <Heading as={"h2"} fontSize={"xl"} fontWeight={500}>
            Subtotal
          </Heading>
          <Text fontSize={"xl"} fontWeight={500} color={"outly.black500"}>
            {currencyFormatter(subTotal)}
          </Text>
        </HStack>

        <Box>
          <Heading
            mb={3}
            as={"h5"}
            size={"sm"}
            fontWeight={400}
            letterSpacing={"widest"}
            color={"outly.black100"}
            width={"100%"}
            textAlign={"end"}
          >
            SHIPPING
          </Heading>
          <Text mb={1} color={"outly.black500"}>
            Flat fee:{" "}
            <Text
              as={"span"}
              textDecoration={
                subTotal > freeShippingValue ? "line-through" : "none"
              }
            >
              {currencyFormatter(5000)}
            </Text>
          </Text>

          <Text mb={1} color={"outly.black500"}>
            Delivering to{" "}
            <Text as={"span"} fontWeight={600}>
              NG
            </Text>
          </Text>

          <Text
            mb={1}
            color={"outly.black500"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            Calculate delivery fee to your address{<MdLocalCarWash />}
          </Text>

          <Text
            pt={5}
            width={"full"}
            textAlign={"center"}
            fontWeight={500}
            color={subTotal > freeShippingValue ? "teal.400" : "outly.black100"}
          >
            FREE shipping on orders over {currencyFormatter(freeShippingValue)}
          </Text>
        </Box>

        <HStack
          mt={8}
          pt={6}
          justifyContent={"space-between"}
          border={"1px solid transparent"}
          borderBlockStartColor={"outly.gray100"}
        >
          <Heading as={"h2"} fontSize={"xl"} fontWeight={500}>
            Total
          </Heading>
          <Text fontSize={"xl"} fontWeight={500} color={"outly.black500"}>
            {currencyFormatter(subTotal + 5000)}
          </Text>
        </HStack>

        <Button
          my={7}
          width={"full"}
          _hover={{ bg: "outly.main900" }}
          _active={{ bg: "outly.main900" }}
        >
          Proceed To Checkout
        </Button>

        <Text
          width={"fit-content"}
          mx={"auto"}
          color={"outly.black500"}
          fontSize={"sm"}
          textAlign={"center"}
          textDecoration={"underline"}
          textUnderlineOffset={"4px"}
          _hover={{ color: "outly.main900" }}
        >
          <Link href={"/shop"}>Continue Shopping</Link>
        </Text>
      </Box>
    </section>
  );
}
