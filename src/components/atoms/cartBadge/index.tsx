import { useState, useEffect } from "react";
import { cartState } from "@/recoil";
import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

export function CartBadge() {
  const [count, setCount] = useState(0);
  const cart = useRecoilValue(cartState);

  useEffect(() => {
    setCount(cart.length);
  }, [cart]);

  return (
    <Box bg="main.400" borderRadius="md" px={2} pb={1}>
      <Text fontSize="sm" fontWeight="semibold" color="white" lineHeight="4">
        {count}
      </Text>
    </Box>
  );
}
