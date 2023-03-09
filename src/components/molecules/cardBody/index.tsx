import { FCProductObjectProp, formatPrice } from "@/utils";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Cart } from "./cart";

export function CardBody({ product }: FCProductObjectProp) {
  return (
    <Box role="group">
      <Heading
        as="h3"
        pt={1}
        mb={1}
        size="xs"
        letterSpacing="wide"
        fontWeight="bold"
        className="duration-500 ease-in-out"
        // _groupHover={{ transitionDuration: "3s" }}
      >
        {product.brand?.toUpperCase()}
      </Heading>
      <Link
        href="/"
        className="hover:!underline underline-offset-4 decoration-1"
      >
        <Text
          mb={2}
          fontSize="sm"
          fontWeight="medium"
          className="hover:underline decoration-1 underline-offset-4"
          noOfLines={1}
        >
          {product.description}
        </Text>
      </Link>

      <Box>
        <Cart />
      </Box>

      <Text fontWeight="bold" mb={2}>
        {formatPrice(product.price as number)}
      </Text>
      <Text>
        Get 13% off with{" "}
        <Text
          as="span"
          cursor="pointer"
          className="underline underline-offset-4 decoration-1"
        >
          Outly Prime
        </Text>
      </Text>
      {product.isFreeShipping ? (
        <Text fontSize="sm">FREE SHIPPING</Text>
      ) : (
        <Text fontSize="sm">{formatPrice(2999)} shipping fee</Text>
      )}

      {/* rating and reviews */}
    </Box>
  );
}
