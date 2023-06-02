import { ReactNode } from "react";
import { Box, BoxProps, CircularProgress, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Gif from "./loader2.gif";

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

export const BoxLoader = ({
  disclosure,
  children,
  rest,
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
  children: ReactNode;
  rest?: BoxProps;
}) => {
  return (
    <Box position={"relative"} {...rest}>
      <Box
        opacity={disclosure.isOpen ? 1 : 0}
        visibility={disclosure.isOpen ? "visible" : "hidden"}
        transition={"opacity 0.35s cubic-bezier(0.645,0.045,0.355,1) 0.2s"}
        position={"absolute"}
        top={0}
        bottom={0}
        right={0}
        left={0}
        zIndex={10}
        bg={"#00000030"}
        borderRadius={"sm"}
      >
        <HStack justifyContent={"center"} height={"100%"}>
          <Image
            alt={"loading"}
            src={Gif}
            quality={100}
            width={70}
            height={70}
            // style={{ minWidth: "auto" }}
          />
        </HStack>
      </Box>
      {children}
    </Box>
  );
};
