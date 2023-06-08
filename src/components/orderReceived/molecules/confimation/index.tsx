import { Box, HStack, Text } from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";

export function ConfirmationBox() {
  return (
    <HStack
      w={"full"}
      mt={"16px"}
      py={"22px"}
      pl={"24px"}
      pr={"10px"}
      spacing={"14px"}
      border={"1.5px solid"}
      borderColor={"outly.green"}
      borderRadius={"md"}
    >
      <Box className="rotate-xd" color={"outly.green"}>
        {<FaRegThumbsUp fontSize={"22px"} />}
      </Box>
      <Text fontSize={"lg"} color={"outly.black500"}>
        Thank you. Your order has been received.
      </Text>
    </HStack>
  );
}
