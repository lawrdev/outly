import { checkbox } from "../components/checkbox";
import {
  extendTheme,
  withDefaultColorScheme,
  ComponentStyleConfig,
} from "@chakra-ui/react";
import { skeleton } from "../components/skeleton";
import { input } from "../components/input";

const Button: ComponentStyleConfig = {
  baseStyle: {
    // bgGradient: "linear(to-r, brand.500, brand.900)",
    borderRadius: "sm",
    fontWeight: "medium",
    _active: { transform: "scale(0.95)", color: "white" },
    transition: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
  },
  defaultProps: {},
};

export const chakraTheme = extendTheme(
  {
    fonts: {
      heading: `"Jost", 'Open Sans', sans-serif`,
      body: `"Jost", 'Raleway', sans-serif`,
    },

    transition: {
      fast: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
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
        3: "linear(to-r, brand.800, brand.700)",
      },
      backgrounds: {
        0: "#FFEAEE",
        1: "#E4E4DA",
        2: "#DBD6C4",
        3: "#F1E1D1",
        4: "#F8F9FA",
        5: "#e9d1c8",
      },
      outly: {
        black: "#111111",
        black100: "#999",
        black400: "#515151",
        black500: "#555",
        main: "#F6E6CF", // light brown
        main100: "#FAF0E8",
        main500: "#C8815F50",
        main900: "#C8815F",
        sec: "#c8815f",
        bg: "#F6F6F6",
        bg100: "#c7c7c780",
        red: "#ed0006",
        green: "#20D756",
        gray: "#BCBCBC",
        gray100: "#ddd",
        yellow: "#FFAA4A",
        blue: "#00AFF0",
      },
      blacks: {
        100: "#000",
        500: "#111111",
      },
      appMain: {
        100: "#F6E6CF",
        500: "#C8815F",
      },
      appSuccess: {
        100: "#00800030",
        500: "#008000",
      },
      appGray: {
        100: "#F6F6F6",
        500: "#F6F6F6",
      },
      appRed: {
        100: "#ed000650",
        500: "#FF4154",
      },
    },

    components: {
      Button,
      Text: {
        baseStyle: {
          fontSize: "md",
          fontWeight: 400,
        },
      },
      Tooltip: {
        baseStyle: {
          bg: "outly.black",
          color: "#fff",
          fontWeight: 400,
        },
      },
      Checkbox: checkbox,
      Skeleton: skeleton,
      Input: input,
    },

    styles: {
      global: {
        body: {
          bg: "outly.bg", // TODO
          color: "outly.black",
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
    colorScheme: "blacks",
  })
);
