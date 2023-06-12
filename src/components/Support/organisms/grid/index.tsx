import { Box, HStack } from "@chakra-ui/react";
import { SupportForm } from "../../molecules/form";
import { SupportInfo } from "../../molecules/info";

export const SupportGrid = () => {
  return (
    <Box w={"full"} pt={"65px"}>
      <HStack w={"100%"} alignItems={"flex-start"}>
        <Box flexBasis={"30%"}>
          <SupportInfo />
        </Box>
        <Box
          flexBasis={"70%"}
          pl={"42px"}
          borderInlineStart={"1px solid"}
          borderColor={"#ddd"}
        >
          <SupportForm />
        </Box>
      </HStack>
    </Box>
  );
};
