import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

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
        500: "#6F3F4D",
        // 600: "#6F3F4D",
        600: "#562836",
        700: "#3D1221",
        800: "#290009",
        900: "#000",
      },
      brand: {
        50: "#faf5ef",
        100: "#f6ebe0",
        200: "#f1e1d1",
        300: "#e8cdb3",
        400: "#dab086",
        500: "#d19c68",
        600: "#c8894a",
        700: "#c37f3b",
        800: "#a56b32",
        900: "#865829",
      },
      sec: {
        1: "#010101",
        2: "#DBD6C490",
        3: "linear(to-r, brand.500, brand.900)",
      },
      backgrounds: {
        0: "#FFEAEE",
        1: "#E4E4DA",
        2: "#DBD6C4",
        3: "#F1E1D1",
        4: "#F8F9FA",
        5: "#e9d1c8",
      },
    },
    components: {
      Button: {
        baseStyle: {
          // bgGradient: "linear(to-r, brand.500, brand.900)",
        },
      },
      Text: {
        baseStyle: {
          fontSize: { base: "sm", md: "md" },
        },
      },
    },

    styles: {
      global: {
        body: {
          bg: "backgrounds.4", // TODO
          color: "sec.1",
          fontSize: "16px",
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
