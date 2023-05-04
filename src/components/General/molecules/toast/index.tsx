import {
  Box,
  Button,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { BiError } from "react-icons/bi";
import { FcInfo } from "react-icons/fc";
import { IoCheckmarkDoneCircleOutline, IoClose } from "react-icons/io5";

export const CustomToastComponent = ({
  title,
  description,
  status = "info",
  variant = "alert",
  image,
  onClose,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: "loading" | "info" | "success" | "error" | "warning" | undefined;
  onClose?: () => void;
  variant?: "product" | "alert" | any;
  image: React.ReactNode | string;
}) => {
  return (
    <Box
      bg="white"
      borderWidth={"1px"}
      borderRadius={"6px"}
      px={"20px"}
      py={"12px"}
      borderColor={status === "error" ? "outly.red" : "outly.black"}
    >
      {variant === "alert" ? (
        <HStack width={"100%"} justifyContent={"space-between"}>
          <Text
            fontSize={"sm"}
            display={"flex"}
            alignItems={"center"}
            gap={"12px"}
            color={
              status === "info"
                ? "outly.black500"
                : status === "error"
                ? "outly.red"
                : "outly.black"
            }
            fontWeight={600}
          >
            {status === "info" ? (
              <FcInfo fontSize={"24px"} />
            ) : status === "error" ? (
              <BiError fontSize={"24px"} />
            ) : (
              <IoCheckmarkDoneCircleOutline fontSize={"24px"} color={"green"} />
            )}
            {title}
          </Text>
          <CloseButton color={"outly.black500"} onClick={onClose} />
        </HStack>
      ) : (
        <HStack spacing={"30px"} alignItems={"flex-start"}>
          <HStack spacing={"16px"} alignItems={"flex-start"}>
            <Box position={"relative"} py={"50px"} px={"50px"}>
              <Image
                src={image as string}
                alt="product"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                quality={100}
                sizes="(max-width: 1200px) 100vw,
          100vw"
              />
            </Box>

            <VStack alignItems={"flex-start"}>
              <Heading as={"h4"} fontSize={"20px"} px={0} noOfLines={1}>
                {title}
              </Heading>
              <Text fontSize={"md"} color={"outly.black500"} noOfLines={3}>
                {description}
              </Text>
            </VStack>
          </HStack>

          <CloseButton onClick={onClose} />
        </HStack>
      )}
    </Box>
  );
};
