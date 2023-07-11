import { Box, HStack } from "@chakra-ui/react";
import { SupportForm } from "../../molecules/form";
import { SupportInfo } from "../../molecules/info";

export const SupportGrid = () => {
  return (
    <Box w={"full"} pt={"65px"}>
      <HStack
        w={"100%"}
        spacing={{ base: 0, lg: 5 }}
        flexWrap={{ base: "wrap", lg: "nowrap" }}
        alignItems={"flex-start"}
      >
        <Box flexBasis={{ base: "100%", lg: "30%" }}>
          <SupportInfo />
        </Box>
        <Box
          flexBasis={{ base: "100%", lg: "70%" }}
          pl={{ base: 0, lg: "42px" }}
          // borderInlineStart={"1px solid"}
          // borderColor={"#ddd"}
        >
          <SupportForm />
        </Box>
      </HStack>
    </Box>
  );
};
