import { AppHeader2 } from "@/components/General/atoms";
import { checkoutInfoAtom } from "@/recoil";
import { currencyFormatter } from "@/utils";
import { Box, Button, ModalBody, ModalFooter } from "@chakra-ui/react";

export function ConfirmOrder({
  method,
  disclosure,
  onClick,
}: {
  method: string;
  disclosure: any;
  onClick: () => void;
}) {
  return (
    <>
      <ModalBody bg={"outly.bg"}>
        <Box pt={"38px"} pb={"18px"} maxW={"500px"} mx={"auto"}>
          <AppHeader2
            title={`Continue to ${method} to complete your order`}
            isCentered
          />
        </Box>
      </ModalBody>

      <ModalFooter bg={"outly.bg"} justifyContent={"center"}>
        <Button
          onClick={() => {
            disclosure.onClose();
            onClick();
          }}
          colorScheme={"appMain"}
          type={"button"}
          size={"lg"}
          px={"52px"}
        >
          Confirm
        </Button>
      </ModalFooter>
    </>
  );
}
