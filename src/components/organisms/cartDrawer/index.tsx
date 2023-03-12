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
import { CartButton } from "@/components/atoms";

export function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CartButton onOpen={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
