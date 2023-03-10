import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export function LocationNav() {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent={{ base: "center", md: "space-between" }}
      py={2}
    >
      <Text fontSize="xs">
        We now ship to 100 locations worldwide.{" "}
        <Link href="/" className="!underline">
          Details
        </Link>
      </Text>

      <Box display={{ base: "none", md: "inline-block" }}>
        <Text fontSize="xs">
          <Link href="/">Order Tracking</Link> | Shipping to
        </Text>
      </Box>
    </Box>
  );
}
