import { ArrowRIcon, SubHeadText } from "@/components/atoms";
import { ProductProp } from "@/utils";
import { Box, Text, SimpleGrid, HStack, Select } from "@chakra-ui/react";
import Link from "next/link";
import { ProductCard } from "../productCard";

interface Props {
  products: ProductProp[];
}

export function DealsRow({ products }: Props) {
  return (
    <Box>
      <HStack mb={6}>
        <Box display="flex" alignItems="center" gap={2}>
          <SubHeadText>Top picks for you</SubHeadText>
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
      </HStack>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
        spacingY={8}
        spacingX={{ base: 9, sm: 6 }}
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
