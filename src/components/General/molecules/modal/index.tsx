import { ReactNode } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalOverlayProps,
  ModalProps,
} from "@chakra-ui/react";

export const CustomModal = ({
  disclosure,
  children,
  modalProps,
  modalOverlay,
}: {
  disclosure: any;
  children: ReactNode;
  modalProps?: ModalProps;
  modalOverlay?: ModalOverlayProps;
}) => {
  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      scrollBehavior={"inside"}
      closeOnOverlayClick={false}
      size={"xl"}
      isCentered
      {...modalProps}
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
        {...modalOverlay}
      />
      <ModalContent mx={"12px"} overflow={"hidden"}>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};
