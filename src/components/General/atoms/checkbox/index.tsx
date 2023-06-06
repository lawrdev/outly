import { useState } from "react";
import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";
import { BiCheckDouble } from "react-icons/bi";

interface Props {
  label: string;
  value?: string;
  onChange?: (isChecked: boolean) => void;
  onClick?: (color: string, isSelected: boolean) => void;
  color?: string;
}
export function CustomCheckbox(props: Props) {
  const [toggle, setToggle] = useState(false);
  return !props.color ? (
    <Checkbox
      value={props.value}
      onChange={(e) => {
        props.onChange && props.onChange(e.target.checked);
      }}
    >
      {props.label}
    </Checkbox>
  ) : (
    <HStack
      onClick={() => {
        setToggle(!toggle);
        props.onClick && props.onClick(props.label!, !toggle);
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
        // onClick={() => setToggle(!toggle)}
      >
        <Box p={3} bg={props.color} borderRadius={"50%"} />
      </Box>

      <Text>{props.label}</Text>
    </HStack>
  );
}
