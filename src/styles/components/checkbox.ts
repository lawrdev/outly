import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  label: {
    color: "outly.black500",
    _hover: { color: "outly.black" },
    fontSize: "14px",
    fontWeight: 400,
  },
  control: {
    borderRadius: 0, // change the border radius of the control
    borderWidth: "1px",
    borderColor: "gray.400",
    _hover: { borderColor: "gray.700" },
  },
  icon: {
    size: "21px",
    border: "none",
    outline: "none",
  },
});

export const checkbox = defineMultiStyleConfig({ baseStyle });
