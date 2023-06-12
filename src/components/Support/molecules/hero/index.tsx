import { AppHeader2 } from "@/components/General/atoms";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export const SupportHero = () => {
  return (
    <Box
      bg={"outly.main100"}
      width={"100%"}
      height={{ base: "calc(80vh - 30px)", lg: "calc(90vh - 30px)" }}
    >
      <VStack
        alignItems={"center"}
        justifyContent={"center"}
        h={"100%"}
        maxW={"410px"}
        mx={"auto"}
      >
        <Text
          fontWeight={600}
          color={"outly.main900"}
          textTransform={"uppercase"}
        >
          NEED HELP?
        </Text>
        <Heading textAlign={"center"} size={"2xl"} fontWeight={500}>
          Haven’t found what you’re looking for? Contact us
        </Heading>
      </VStack>
    </Box>
  );
};
