import { useState } from "react";
import { Box, Checkbox, CheckboxProps, HStack, Text } from "@chakra-ui/react";
import { BiCheckDouble } from "react-icons/bi";
import { ColorTypes } from "@/utils";
import { a11yKeyboardClick } from "@/functions";

interface Props {
  label: string;
  value?: string;
  onChange?: (isChecked: boolean) => void;
  onClick?: (color: ColorTypes, isSelected: boolean) => void;
  color?: string;
  checkboxProps?: CheckboxProps;
  isSelectedForColor?: boolean;
}
export function CustomCheckbox(props: Props) {
  const [toggle, setToggle] = useState(false);
  return !props.color ? (
    <Checkbox
      value={props.value}
      onChange={(e) => {
        props.onChange && props.onChange(e.target.checked);
      }}
      {...props.checkboxProps}
    >
      {props.label}
    </Checkbox>
  ) : (
    <HStack
      tabIndex={0}
      cursor={"pointer"}
      onClick={() => {
        setToggle(!toggle);
        props.onClick && props.onClick(props.label as ColorTypes, !toggle);
      }}
      onKeyDown={(e) => {
        if (a11yKeyboardClick(e)) {
          setToggle(!toggle);
          props.onClick && props.onClick(props.label as ColorTypes, !toggle);
        }
      }}
    >
      <Box
        cursor={"pointer"}
        borderWidth={"2.5px"}
        borderRadius={"50%"}
        p={0.5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderColor={
          toggle || props.isSelectedForColor ? "outly.main900" : "gray.200"
        }
        // onClick={() => setToggle(!toggle)}
      >
        <Box p={3} bg={props.color} borderRadius={"50%"} />
      </Box>

      <Text
        color={
          toggle || props.isSelectedForColor
            ? "outly.main900"
            : "outly.black500"
        }
        fontWeight={500}
      >
        {props.label}
      </Text>
    </HStack>
  );
}
