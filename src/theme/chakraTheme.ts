import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const chakraTheme = extendTheme(
  {
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
    colors: {
      main: {
        50: "#FFDBEA",
        100: "#F9BFCD",
        200: "#C08997",
        300: "#A4707D",
        400: "#8A5765",
        500: "#562836",
        // 600: "#6F3F4D",
        600: "#6F3F4D",
        700: "#3D1221",
        800: "#290009",
        900: "#000",
      },
      sec: {
        1: "#010101",
        2: "#DBD6C490",
      },
      backgrounds: {
        1: "#E4E4DA",
        2: "#DBD6C4",
        3: "#F1E1D1",
        4: "#F8F9FA",
      },
    },
    components: {
      Button: {
        sizes: {
          md: {
            h: "fit-content",
            px: "1.5em",
            py: "0.5em",
            fontSize: "16px",
          },
          xl: {
            h: "fit-content",
            fontSize: "lg",
            px: "32px",
          },
        },
        variants: {
          // add variant
          "with-shadow": {
            bg: "red.400",
            boxShadow: "0 0 2px 2px #efdfde",
          },
        },
      },
    },

    styles: {
      global: {
        body: {
          bg: "backgrounds.4",
          color: "sec.1",
        },
        a: {
          color: "inherit",
          _hover: {
            textDecoration: "none",
          },
        },
        h1: {
          fontFamily: "heading",
        },
      },
    },
  },

  withDefaultColorScheme({
    colorScheme: "main",
  })
);
