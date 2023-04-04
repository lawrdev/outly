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
import { Hamburger } from "@/components/atoms";

export function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Hamburger onOpen={onOpen} />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
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
