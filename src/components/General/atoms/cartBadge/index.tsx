import { useState, useEffect } from "react";
import { cartAtom } from "@/recoil";
import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

export function CartBadge() {
  const [count, setCount] = useState(0);
  const cartAtomValue = useRecoilValue(cartAtom);

  useEffect(() => {
    const getTotalQuantity = (): number => {
      let total = 0;
      if (cartAtomValue && cartAtomValue.length > 0) {
        let res = [...cartAtomValue].reduce((acc, curr) => {
          acc = acc + curr.quantity;
          return acc;
        }, 0);

        total = res;
      }

      return total;
    };
    let tots = getTotalQuantity();
    setCount(tots);
  }, [cartAtomValue]);

  return (
    <Box bg="outly.black" borderRadius="50%" px={2} py={1}>
      <Text
        fontSize={"xs"}
        fontWeight={500}
        color="white"
        lineHeight={1}
        minWidth={"16px"}
        textAlign={"center"}
      >
        {count}
      </Text>
    </Box>
  );
}
