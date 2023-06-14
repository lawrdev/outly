import { CustomDrawer } from "@/components/General/molecules";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export function MobileMenu({
  disclosure,
}: {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}) {
  return (
    <CustomDrawer disclosure={disclosure}>
      <Box pt={"2.75rem"}>
        <HStack width={"100%"} spacing={"22px"}>
          <Text
            fontWeight={500}
            color={"outly.black"}
            textDecoration={"underline"}
            textUnderlineOffset={"5px"}
            _hover={{ color: "outly.main900" }}
          >
            <Link href={"/signIn"}>Log In</Link>
          </Text>

          <Text
            fontWeight={500}
            color={"outly.black"}
            textDecoration={"underline"}
            textUnderlineOffset={"5px"}
            _hover={{ color: "outly.main900" }}
          >
            <Link href={"/signUp"}>Sign Up</Link>
          </Text>
        </HStack>
      </Box>
    </CustomDrawer>
  );
}
