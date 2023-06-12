import { ReactNode } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerProps,
  UseDisclosureProps,
} from "@chakra-ui/react";

interface Props {
  disclosure: UseDisclosureProps;

  children: ReactNode;
  placement?: "right" | "left";
  blockScrollOnMount?: boolean;
}
export function CustomDrawer({
  disclosure,
  placement = "left",
  blockScrollOnMount = true,
  children,
}: Props) {
  return (
    <Drawer
      isOpen={disclosure.isOpen!}
      placement={placement}
      blockScrollOnMount={blockScrollOnMount}
      onClose={disclosure.onClose!}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody className="thinSB">{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
