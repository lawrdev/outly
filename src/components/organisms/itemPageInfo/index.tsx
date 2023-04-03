import { Rating } from "@/components/atoms";
import { FormatPrice, ProductProp } from "@/utils";
import { Box, Heading, HStack, Text, chakra, Tooltip } from "@chakra-ui/react";
import { OutlyPrime } from "../../molecules/outlyPrime";

interface Props {
  product: ProductProp;
}
export function ItemPageInfo({ product }: Props) {
  return (
    <Box>
      <Text
        letterSpacing={"wide"}
        fontWeight={"extrabold"}
        color="brand.500"
        cursor={"default"}
      >
        {product.brand?.toUpperCase()}
      </Text>
      <Heading as={"h2"} size={"lg"} mb={1} noOfLines={2}>
        {product.description}
      </Heading>

      <HStack mb={6}>
        <Rating value={product.rating!} />
        <Text fontSize={"md"} fontFamily="heading">
          {product.rating! % 1 != 0
            ? product.rating
            : product.rating?.toFixed(1)}{" "}
          <Tooltip label="Reviews">
            <span className="cursor-pointer hover:underline underline-offset-4">{`( ${product.reviews?.length} )`}</span>
          </Tooltip>
        </Text>
      </HStack>

      <Text fontWeight={"semibold"} fontSize={"2xl"}>
        {<FormatPrice price={product.price!} />}
      </Text>

      <Box fontSize="sm" mb={1} display="flex" gap={1} alignItems={"center"}>
        <Text>Get 13% off with</Text> {<OutlyPrime />}
      </Box>

      <Text
        fontSize="xs"
        fontWeight="medium"
        color="brand.500"
        letterSpacing="widest"
        pb={2}
        mb={4}
        borderBottomWidth={1}
        borderBottomColor="gray.300"
      >
        {product.isFreeShipping ? (
          `Free shipping`
        ) : (
          <p>
            <FormatPrice price={2999} />` shipping fee`
          </p>
        )}
      </Text>

      <Box>
        <Text fontWeight={"bold"}>About this item</Text>
        <chakra.ul listStyleType={"disc"} ml={4}>
          {Array.from(Array(3)).map((_, i) => (
            <chakra.li key={i} display="list-item" textAlign={"match-parent"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </chakra.li>
          ))}
        </chakra.ul>
      </Box>
    </Box>
  );
}
