import { FormatPrice } from "@/utils";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";

export function SaleEvent() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={2}>
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
          py={12}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Box mb={4}>
            <Heading as="h4" fontWeight={"medium"} size="sm">
              SALE EVENT
            </Heading>
          </Box>
          <Box mb={2}>
            <Heading
              as="h3"
              fontWeight={"semibold"}
              size={"lg"}
              lineHeight={1.4}
            >
              Summer Shirt
              <br />
              Limited Offer - {<FormatPrice price={999} />}
            </Heading>
          </Box>
          <Box mb={6}>
            <Text>Until 30/12/23. Use code FESTIVE at checkout</Text>
          </Box>

          <Button px={8} py={6}>
            Shop now
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
