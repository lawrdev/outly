import { AppHeader } from "@/components/General/atoms";
import { CustomSelect } from "@/components/General/atoms/select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const paymentMethods = [
  {
    label: "Direct Bank Transfer",
    value: "direct_transfer",
  },
  {
    label: `Online Payment with PayStack`,
    value: "paystack",
  },
  {
    label: `Online Payment with Flutterwave`,
    value: "flutterwave",
  },
  {
    label: `Cash On Delivery`,
    value: "on_delivery",
  },
];

export const SupportForm = () => {
  const [reason, setReason] = useState<"payment" | "feedback" | "question">(
    "feedback"
  );

  return (
    <Box
      width={"full"}
      bg={"#fff"}
      py={"36px"}
      px={"24px"}
      borderRadius={"md"}
      boxShadow={"md"}
    >
      <AppHeader title="Get in Touch" />
      <Text mt={"12px"} color={"outly.black100"}>
        Your email address will not be published. Required fields are marked *
      </Text>

      <Box pt={"42px"} w={"full"}>
        <form onSubmit={(e) => e.preventDefault()}>
          <HStack mb={6} spacing={8} w={"full"}>
            <FormControl>
              <FormLabel color={"outly.black500"}>Name *</FormLabel>
              <Input
                type="text"
                focusBorderColor={"outly.main900"}
                placeholder="Kakashi Hatake"
                onChange={(e) => {}}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email *</FormLabel>
              <Input
                type="email"
                focusBorderColor={"outly.main900"}
                placeholder="name@example.com"
                onChange={(e) => {}}
                isRequired
              />
            </FormControl>
          </HStack>

          <Box mb={6}>
            <FormControl>
              <FormLabel color={"outly.black500"}>Phone Number </FormLabel>
              <Input
                type={"tel"}
                focusBorderColor={"outly.main900"}
                placeholder="+234 905 XXX XXXX"
                onChange={(e) => {}}
              />
            </FormControl>
          </Box>

          <Box mb={6}>
            <FormControl>
              <FormLabel color={"outly.black500"}>Reason *</FormLabel>
              <CustomSelect
                placeholder={"Select a reason"}
                options={[
                  {
                    label: "Payment Issue",
                    value: "payment",
                  },
                  {
                    label: "Ask a Question",
                    value: "question",
                  },
                  {
                    label: "Send a Feedback",
                    value: "feedback",
                  },
                ]}
                onChange={(value) => {
                  console.log(value);
                  setReason(value.value);
                }}
              />
            </FormControl>
          </Box>

          {reason === "payment" ? (
            <HStack mb={6} spacing={8} w={"full"}>
              <Box flexBasis={"50%"}>
                <FormControl>
                  <FormLabel color={"outly.black500"}>Order Ref/ID *</FormLabel>
                  <Input
                    focusBorderColor={"outly.main900"}
                    placeholder="9I6Y7230531"
                    onChange={(e) => {}}
                    isRequired
                  />
                </FormControl>
              </Box>
              <Box flexBasis={"50%"}>
                <FormControl>
                  <FormLabel color={"outly.black500"}>Payment method</FormLabel>
                  <CustomSelect
                    placeholder={"Select a payment method"}
                    options={paymentMethods}
                    onChange={(value) => {}}
                  />
                </FormControl>
              </Box>
            </HStack>
          ) : null}

          <Box>
            <FormControl>
              <FormLabel color={"outly.black500"}>Message *</FormLabel>
              <Textarea
                rows={5}
                focusBorderColor={"outly.main900"}
                placeholder="Your message..."
                onChange={(e) => {}}
                isRequired
              />
            </FormControl>
          </Box>

          <HStack pt={"22px"} w={"full"} justifyContent={"center"}>
            <Button size={"sm"} px={"42px"} py={"19px"} colorScheme={"appMain"}>
              Submit
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};
