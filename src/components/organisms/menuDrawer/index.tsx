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
import { Hamburger } from "@/components/atoms/buttons";

export function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Hamburger onOpen={onOpen} />
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
