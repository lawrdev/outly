import Item from "@/pages/item/[id]";
import {
  Box,
  CloseButton,
  HStack,
  Text,
  Link as ChakraLink,
  LinkProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiError } from "react-icons/bi";
import { BsBagCheck, BsCheck2Circle } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";

export const CustomToastComponent = ({
  title,
  description,
  status = "info",
  variant = "alert",
  onClose,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: "loading" | "info" | "success" | "error" | "warning" | undefined;
  onClose?: () => void;
  variant?: "product" | "alert" | any;
}) => {
  return (
    <Box
      mx={"2vw"}
      mt={"5vh"}
      boxShadow={"md"}
      bg={status === "success" ? "#C1F8D1" : "white"}
      borderRadius={"md"}
      p={"12px"}
    >
      {variant === "alert" ? (
        <HStack gap={"32px"} width={"100%"} justifyContent={"space-between"}>
          <Box
            px={2}
            fontWeight={600}
            fontSize={"16px"}
            noOfLines={1}
            display={"flex"}
            alignItems={"center"}
            gap={"21px"}
            color={
              status === "info"
                ? "outly.black500"
                : status === "error"
                ? "outly.red"
                : "outly.black"
            }
          >
            <Box>
              {status === "info" ? (
                <FcInfo fontSize={"24px"} />
              ) : status === "error" ? (
                <BiError fontSize={"24px"} />
              ) : (
                <BsCheck2Circle fontSize={"24px"} color={"green"} />
              )}
            </Box>
            <Box>
              <Text
                mb={1}
                fontWeight={600}
                fontSize={"16px"}
                noOfLines={1}
                color={
                  status === "info"
                    ? "outly.black500"
                    : status === "error"
                    ? "outly.red"
                    : "outly.black"
                }
              >
                {title}
              </Text>

              {description ? (
                <Text
                  mb={3}
                  fontWeight={400}
                  fontSize={"14px"}
                  color={"outly.black500"}
                  noOfLines={2}
                >
                  {description}
                </Text>
              ) : null}
            </Box>
          </Box>
          <CloseButton color={"outly.black100"} onClick={onClose} />
        </HStack>
      ) : (
        <HStack spacing={"24px"} alignItems={"flex-start"}>
          <HStack spacing={"12px"} alignItems={"center"}>
            <Box px={3} fontSize={"32px"} overflow={"hidden"}>
              <BsBagCheck />
            </Box>

            <Box>
              <Text fontWeight={600} fontSize={"16px"} noOfLines={1}>
                {title}
              </Text>
              <Text
                mb={3}
                fontWeight={400}
                fontSize={"14px"}
                color={"outly.black500"}
                noOfLines={2}
              >
                {description}
              </Text>
              <Text
                width={"fit-content"}
                fontWeight={400}
                textDecoration={"underline"}
                color={"outly.black500"}
                fontSize={"14px"}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={"/cart"}>View Cart</Link>
              </Text>
            </Box>
          </HStack>

          <CloseButton onClick={onClose} />
        </HStack>
      )}
    </Box>
  );
};

const Link = ({ href, ...rest }: LinkProps) => {
  const router = useRouter();
  const onClick = (e: any) => {
    e.preventDefault();
    router.push(href!);
  };

  return (
    <ChakraLink
      textDecoration="underline"
      href={href}
      onClick={onClick}
      {...rest}
    />
  );
};
