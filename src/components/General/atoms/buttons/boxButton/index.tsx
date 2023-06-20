import { a11yKeyboardClick } from "@/functions";
import { Box, Tooltip } from "@chakra-ui/react";
import { useState, useEffect } from "react";
interface Props {
  children?: React.ReactNode;
  isLight?: boolean;
  isSize?: boolean;
  onClick?: (str: string, isSelected?: boolean) => void;
  value?: string;
  isColor?: string;
  tooltip?: string;
  itemQuantity?: number;
  // external control
  isClicked?: boolean;
}
export function ButtonBox({
  children,
  isClicked = true,
  isColor,
  isLight,
  isSize,
  onClick,
  value,
  tooltip,
  itemQuantity,
}: Props) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (itemQuantity === 0) {
      setToggle(false);
    }
  }, [itemQuantity]);

  return (
    <>
      {!isColor ? (
        <Box
          role={"button"}
          tabIndex={0}
          color={
            isSize && toggle && isClicked
              ? "white"
              : isSize
              ? "outly.black500"
              : isLight
              ? "#ddd"
              : toggle
              ? "#F8F9FA"
              : "#111"
          }
          border={!isLight ? `1px solid #111` : "1px solid #ddd"}
          bg={toggle && isClicked ? "#111" : "inherit"}
          borderRadius={"4px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          px={"8px"}
          py={"4px"}
          onClick={() => {
            if (value) {
              setToggle(!toggle);
            }
            onClick && onClick(value!, !toggle);
          }}
          onKeyDown={(e) => {
            let val = a11yKeyboardClick<HTMLDivElement>(e);
            if (val) {
              if (value) {
                setToggle(!toggle);
              }
              onClick && onClick(value!, !toggle);
            }
          }}
          _active={{ transform: "scale(0.95)" }}
        >
          <Tooltip label={tooltip ? tooltip : ""}>{children}</Tooltip>
        </Box>
      ) : (
        <Box
          tabIndex={0}
          cursor={"pointer"}
          borderWidth={2}
          borderRadius={"50%"}
          p={0.5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderColor={isClicked && toggle ? "outly.black" : "gray.300"}
          onClick={() => {
            if (value) {
              setToggle(!toggle);
            }

            onClick && onClick(value!, toggle);
          }}
          onKeyDown={(e) => {
            let val = a11yKeyboardClick<HTMLDivElement>(e);
            if (val) {
              if (value) {
                setToggle(!toggle);
              }

              onClick && onClick(value!, toggle);
            }
          }}
        >
          <Box p={3} bg={isColor} borderRadius={"50%"} />
        </Box>
      )}
    </>
  );
}
