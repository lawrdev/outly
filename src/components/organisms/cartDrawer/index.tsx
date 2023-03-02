import { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { CartButton } from "@/components/atoms/buttons";

export function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <CartButton onOpen={onOpen} ref={btnRef} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>HEADER HERE</DrawerHeader>

          <DrawerBody>
            <Text>BODY HERE</Text>
          </DrawerBody>

          <DrawerFooter>
            <Text>FOOTER HERE</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
