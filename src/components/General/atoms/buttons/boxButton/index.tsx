import { Box, Tooltip } from "@chakra-ui/react";
import { useState, useEffect } from "react";
interface Props {
  children?: React.ReactNode;
  isLight?: boolean;
  isSize?: boolean;
  onClick?: (str: string) => void;
  value?: string;
  isColor?: string;
  tooltip?: string;
  itemQuantity?: number;
}
export function ButtonBox(props: Props) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (props.itemQuantity === 0) {
      setToggle(false);
    }
  }, [props.itemQuantity]);

  return (
    <>
      {!props.isColor ? (
        <Box
          color={
            props.isSize && toggle
              ? "white"
              : props.isSize
              ? "outly.black500"
              : props.isLight
              ? "#ddd"
              : toggle
              ? "#F8F9FA"
              : "#111"
          }
          border={!props.isLight ? `1px solid #111` : "1px solid #ddd"}
          bg={toggle ? "#111" : "inherit"}
          borderRadius={"4px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          px={"8px"}
          py={"4px"}
          onClick={() => {
            if (props.value) {
              setToggle(!toggle);
            }
            props.onClick && props.onClick(props.value!);
          }}
          _active={{ transform: "scale(0.95)" }}
        >
          <Tooltip label={props.tooltip ? props.tooltip : ""}>
            {props.children}
          </Tooltip>
        </Box>
      ) : (
        <Box
          cursor={"pointer"}
          borderWidth={2}
          borderRadius={"50%"}
          p={0.5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderColor={toggle ? "outly.black" : "gray.300"}
          onClick={() => {
            if (props.value) {
              setToggle(!toggle);
            }
            props.onClick && props.onClick(props.value!);
          }}
        >
          <Box p={3} bg={props.isColor} borderRadius={"50%"} />
        </Box>
      )}
    </>
  );
}
