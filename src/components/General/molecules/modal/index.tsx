import { ReactNode } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export const CustomModal = ({
  disclosure,
  children,
}: {
  disclosure: any;
  children: ReactNode;
}) => {
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      scrollBehavior={"inside"}
      closeOnOverlayClick={false}
      size={"xl"}
      isCentered
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent mx={"12px"}>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};
