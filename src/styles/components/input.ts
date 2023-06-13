import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    color: "outly.black500",
    focusBorderColor: "outly.main900",
    rounded: "none",
    _focus: {
      color: "#555",
    },
    _placeholder: {
      color: "#999",
    },
  },
});

export const input = defineMultiStyleConfig({ baseStyle });
