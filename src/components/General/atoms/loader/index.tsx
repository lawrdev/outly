import { Box, CircularProgress, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Gif from "./loader.gif";

export const ProgressLoader = () => {
  return (
    <Box
      boxShadow={"lg"}
      // p={"8px"}
      borderRadius={"12px"}
      mt={"10px"}
      ml={"10px"}
      position={"fixed"}
      zIndex={1000}
      top={0}
      left={0}
      // bg={"outly.main"}
    >
      {/* @ts-ignore */}
      <CircularProgress
        isIndeterminate
        size={"20px"}
        color="outly.black500"
        trackColor={"outly.main900"}
      />
    </Box>
  );
};

export const Loader = () => {
  return (
    <Box
      position={"fixed"}
      zIndex={100}
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={"white"}
    >
      <HStack justifyContent={"center"} height={"100vh"}>
        <Image
          alt={"loader"}
          src={Gif}
          quality={100}
          width={200}
          height={200}
        />
      </HStack>
    </Box>
  );
};
