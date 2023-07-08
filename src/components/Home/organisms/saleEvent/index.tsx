import { Container } from "@/components/General/atoms";
import { FormatPrice } from "@/utils";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { SalesTimer } from "../../molecules";

export function SaleEvent() {
  return (
    <Box bg={"#f8f4f1"}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={10}>
          <Box
            pt={{ base: "60px", xl: "0px" }}
            pr={{ base: "0vw", md: "4vw", xl: "8vw" }}
            width="100%"
            position={"relative"}
            overflow={"hidden"}
          >
            <Box
              ml={{ base: "-47px", md: "-50px" }}
              transform={{ base: "scale(1.2)", md: "scale(1)" }}
            >
              <Image
                src={
                  "https://res.cloudinary.com/dqveipmsp/image/upload/v1688827188/Outly/socialImages/aa_yitz9d.png"
                }
                width={512}
                height={550}
                alt="sales event"
                sizes="(max-width: 1200px) 100vw, 100vw"
                style={{
                  minWidth: "100%",
                }}
                quality={100}
                priority
              />
            </Box>
          </Box>

          <VStack
            pb={{ base: "72px", md: 0 }}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Box>
              <Text mb={2} color={"outly.red"} fontWeight={500} fontSize={"md"}>
                SALE UPTO 60%
              </Text>

              <Heading
                mb={5}
                as="h2"
                fontWeight={500}
                fontSize={"3xl"}
                letterSpacing={"tight"}
              >
                Blue classic long sleeves shirt
              </Heading>

              <Box mb={6}>
                <SalesTimer />
              </Box>

              <Button as={Link} href={"/shop"} fontSize={"lg"} px={12} py={6}>
                Shop now
              </Button>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
