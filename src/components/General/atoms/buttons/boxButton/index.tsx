import { Box, IconButton } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  isLight?: boolean;
  onClick?: () => void;
}
export function ButtonBox(props: Props) {
  return (
    <Box
      color={props.isLight ? "#ddd" : "#111"}
      border={!props.isLight ? `1px solid #111` : "1px solid #ddd"}
      borderRadius={"4px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      px={"8px"}
      py={"4px"}
      onClick={props.onClick}
      _active={{ transform: "scale(0.95)" }}
    >
      {props.children}
    </Box>
  );
}
