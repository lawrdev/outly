import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  color?: string;
}
export function LogoText({ color }: Props) {
  return (
    <Text
      as="h1"
      fontSize="22px"
      fontWeight="bold"
      letterSpacing="wider"
      color={color}
    >
      OUTLY
    </Text>
  );
}
