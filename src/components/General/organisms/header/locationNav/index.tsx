import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export function LocationNav() {
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    fetch(
      "https://api.geoapify.com/v1/ipinfo?apiKey=3af953e6b2c047bda897bb48d619897d"
    )
      .then((response) => response.json())
      .then((data) => {
        // You can now access the location data in the "data" object
        // console.log("pppp", data);
        setUserCity(data.city.name);
      });
  }, []);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent={{ base: "center", md: "space-between" }}
      py={2}
    >
      <Text fontSize="xs" display={{ base: "none", md: "inline-block" }}>
        We now ship to 100 locations worldwide.{" "}
        <Link href="/" className="!underline">
          Details
        </Link>
      </Text>

      <Text fontSize="xs">
        <Link href="/">Order Tracking</Link> | Shipping to{" "}
        <Text
          as="span"
          fontWeight={500}
          color="outly.main900"
          fontSize="xs"
          cursor="pointer"
        >
          {userCity}
        </Text>
      </Text>
    </Box>
  );
}
