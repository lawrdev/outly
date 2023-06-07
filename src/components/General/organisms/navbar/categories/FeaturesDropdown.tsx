import { AppHeader4 } from "@/components/General/atoms";
import { Text, Box, VStack, HStack } from "@chakra-ui/react";
import Image from "next/image";

const listI = [
  { title: "Deals Of Week", path: "#" },
  { title: "Summer Items", path: "#" },
  { title: "Spring Collection", path: "#" },
  { title: "Fashion trends", path: "#" },
  { title: "Pants & leggings", path: "#" },
  { title: "Headwear", path: "#" },
  { title: "More", path: "#" },
];

export const FeaturesDropdown = () => {
  return (
    <Box py={"26px"} px={"20px"} width={"fit-content"}>
      <VStack alignItems={"flex-start"} spacing={"12px"} width={"fit-content"}>
        {listI.map((item, index) => (
          <HStack
            key={index}
            spacing={"0px"}
            fontWeight={400}
            color={"outly.black500"}
          >
            <Text
              fontSize={"md"}
              cursor={"pointer"}
              _hover={{ color: "outly.main900" }}
              transition={`all 0.5s cubic-bezier(0.645,0.045,0.355,1)`}
              className="__link __link-light"
            >
              {item.title}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
