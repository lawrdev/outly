import { PageWrapper } from "@/components/General/atoms";
import { Footer, Head, Header } from "@/components/General/organisms";
import { chakra, Box, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiErrorAlt } from "react-icons/bi";

function Custom404() {
  return (
    <>
      <Head pageTitle="404| OutlyStore" />

      <PageWrapper bg={"outly.bg"}>
        <chakra.header bg={"white"} boxShadow={"sm"}>
          <Header inActive />
        </chakra.header>

        <VStack
          minHeight={"calc(100vh - 210px)"}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box className="rotate-xd" mb={"26px"}>
            <BiErrorAlt fontSize={"112px"} color={"#ddd"} />
          </Box>

          <Box maxW={"400px"} textAlign={"center"}>
            <Text mb={1} fontSize={"xl"} fontWeight={500}>
              Broken link or Something went wrong!
            </Text>
            <Text color={"outly.black500"}>
              Confirm your url or please
              <Text
                as={"span"}
                pl={"6px"}
                textDecoration={"underline"}
                textUnderlineOffset={"4px"}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={"/support"}>contact us</Link>
              </Text>
            </Text>
          </Box>
        </VStack>

        <Footer />
      </PageWrapper>
    </>
  );
}

export default Custom404;
