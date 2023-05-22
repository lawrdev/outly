import { useState } from "react";
import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";
import { BiCheckDouble } from "react-icons/bi";

interface Props {
  label: string;
  value?: string;
  onChange?: (e: any) => void;
  onClick?: (color: string) => void;
  color?: string;
}
export function CustomCheckbox(props: Props) {
  const [toggle, setToggle] = useState(false);
  return !props.color ? (
    <Checkbox
      // icon={<BiCheckDouble />}
      value={props.value}
      onChange={props.onChange}
    >
      {props.label}
    </Checkbox>
  ) : (
    <HStack
      onClick={() => {
        props.onClick && props.onClick(props.label!);
      }}
    >
      <Box
        cursor={"pointer"}
        borderWidth={2}
        borderRadius={"50%"}
        p={0.5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderColor={toggle ? "outly.black" : "gray.300"}
        onClick={() => setToggle(!toggle)}
      >
        <Box p={3} bg={props.color} borderRadius={"50%"} />
      </Box>

      <Text>{props.label}</Text>
    </HStack>
  );
}
