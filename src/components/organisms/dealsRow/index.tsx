import { ArrowRIcon, SubHeadText } from "@/components/atoms";
import { cartState } from "@/recoil/atoms";
import { ProductProp } from "@/utils";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ProductCard } from "../productCard";

interface Props {
  products: ProductProp[];
}
export function DealsRow({ products }: Props) {
  const [cartValue, setCartValue] = useRecoilState(cartState);
  // setUId(7000);
  console.log(cartValue);

  useEffect(() => {
    localStorage.setItem(
      "outlyCart",
      JSON.stringify({ quantity: 3, items: ["43663", "25363"] })
    );
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <SubHeadText>Deals just for you</SubHeadText>
        <Box display="inline-block" userSelect="none">
          <Link href="/">
            {" "}
            <Text
              fontWeight="medium"
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="underline underline-offset-4"
              _hover={{ color: "brand.600" }}
              gap={1}
            >
              View all <ArrowRIcon boxSize={4} />
            </Text>
          </Link>
        </Box>
      </Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
        spacing={{ base: 9, sm: 6 }}
      >
        {products?.map((product, index) => (
          <Box key={index}>
            <ProductCard product={product} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
