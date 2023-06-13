import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const outlySkeleton = defineStyle({
  _light: {
    [$startColor.variable]: "colors.gray.200",
    [$endColor.variable]: "colors.gray.300",
  },
  _dark: {
    [$startColor.variable]: "colors.gray.800",
    [$endColor.variable]: "colors.gray.600",
  },
});

// custum size
const xl = defineStyle({
  h: "10px",
  w: "100%",
  borderRadius: "0px",
});

export const skeleton = defineStyleConfig({
  variants: { outlySkeleton },
  sizes: { xl },
  defaultProps: {
    variant: "outlySkeleton",
    size: "xl",
  },
});
