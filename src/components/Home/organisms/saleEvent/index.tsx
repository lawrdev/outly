import { FormatPrice } from "@/utils";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export function SaleEvent() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={0}>
        <Box width="100%" position={"relative"} overflow={"hidden"}>
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/hero%2FsaleEvent.jpg?alt=media&token=8a5e93cf-dcd3-4651-b5ef-6a84c8313efb"
            }
            width={441}
            height={372}
            alt="sale event"
            sizes="(max-width: 1200px) 100vw, 100vw"
            style={{
              minWidth: "100%",
            }}
            quality={100}
          />
        </Box>

        <Box
          bg="outly.main"
          py={{ base: "72px", md: 0 }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Box mb={1}>
            <Text color={"outly.black500"} fontWeight={500} fontSize={"sm"}>
              SALE EVENT
            </Text>
          </Box>
          <Box mb={7}>
            <Heading as="h3" fontWeight={600} size={"lg"} lineHeight={1.4}>
              Summer Shirt
              <br />
              Limited Offer - {<FormatPrice price={999} />}
            </Heading>
          </Box>
          <Box mb={3}>
            <Text color={"outly.black500"}>
              Until 30/12/23. Use code FESTIVE at checkout
            </Text>
          </Box>

          <Button px={12} py={6}>
            <Link href={"/shop"}>Shop now</Link>
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
