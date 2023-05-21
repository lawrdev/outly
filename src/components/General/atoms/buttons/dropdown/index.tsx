import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
  title: string;
  list: Array<{
    label: string;
    onClick: () => void;
  }>;
  changeTitleOnClick?: boolean;
  variant?: "solid" | "outline" | "ghost";
  buttonProps?: {};
}

export function ButtonDropdown(props: Props) {
  const [newTitle, setNewTitle] = useState(props.title);
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        variant={props.variant ? props.variant : "outline"}
        _active={{ variant: props.variant ? props.variant : "outline" }}
        {...props.buttonProps}
      >
        {newTitle}
      </MenuButton>
      <MenuList zIndex={10} boxShadow={"md"}>
        {props.list.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (props.changeTitleOnClick) {
                setNewTitle(item.label);
              }
              item.onClick();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
