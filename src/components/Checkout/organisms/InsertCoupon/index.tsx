import { useState } from "react";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { ImGift } from "react-icons/im";

export function InsertCoupon() {
  const [toggle, setToggle] = useState(false);

  return (
    <Box>
      <HStack
        fontSize={"24px"}
        color={"outly.main900"}
        spacing={3}
        alignItems={"flex-end"}
        mb={"32px"}
      >
        <ImGift />
        <Text fontSize={"16px"} color={"outly.black500"}>
          Do you have a coupon?
          <Text
            as={"span"}
            pl={"6px"}
            fontWeight={500}
            userSelect={"none"}
            cursor={"pointer"}
            onClick={() => setToggle(!toggle)}
          >
            Click here to enter your code
          </Text>
        </Text>
      </HStack>

      <Box
        maxH={toggle ? "200px" : "0"}
        overflow={"hidden"}
        transition={"max-height 0.7s cubic-bezier(0.645,0.045,0.355,1) 0.1s"}
      >
        <Box border={`1px solid #ddd`} p={"24px"} mb={"32px"} width={"full"}>
          <Text mb={4}>If you have a coupon code, please apply it below.</Text>

          <HStack spacing={2}>
            <Input
              placeholder="Coupon code"
              focusBorderColor={"transparent"}
              border={"none"}
              bg={"outly.bg"}
              width={"full"}
              maxWidth={"280px"}
              borderRadius={"2px"}
            />
            <Button px={6} colorScheme={"appMain"}>
              Apply Coupon
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
