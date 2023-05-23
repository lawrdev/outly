import {
  Box,
  Button,
  Collapse,
  HStack,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ImGift } from "react-icons/im";

export function InsertCoupon() {
  const { isOpen, onToggle } = useDisclosure();

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
            onClick={onToggle}
          >
            Click here to enter your code
          </Text>
        </Text>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
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
      </Collapse>
    </Box>
  );
}
