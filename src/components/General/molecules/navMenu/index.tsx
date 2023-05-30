import {
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const CustomNavMenu = ({
  title,
  path,
  children,
}: {
  title: string;
  children: ReactNode;
  path?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Menu isOpen={isOpen} onClose={onClose} gutter={0} isLazy>
      {({ isOpen }) => (
        <>
          <MenuButton
            pb={"10px"}
            aria-label={title}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            position={"relative"}
            _before={{
              content: "' '",
              position: "absolute",
              bottom: "8px",
              left: "0px",
              height: "2.5px",
              width: isOpen ? "100%" : "0%",
              backgroundColor: "outly.main900",
              transition: "all 0.5s cubic-bezier(0.645,0.045,0.355,1)",
            }}
            onClick={() => {
              if (path) router.push(path);
            }}
          >
            <Text
              pt={"10px"}
              cursor={"pointer"}
              fontSize={"lg"}
              fontWeight={"medium"}
            >
              {title}
            </Text>
          </MenuButton>
          <MenuList
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            p={0}
            borderRadius="md"
            boxShadow={"xl"}
          >
            {children}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
