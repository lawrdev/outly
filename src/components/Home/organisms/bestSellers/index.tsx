import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import "swiper/css";
import { ItemProp } from "@/utils";
import { useEffect, useState } from "react";
import { ItemCard } from "@/components/General/molecules";
import Link from "next/link";

export function BestSellers({ items }: { items: Array<ItemProp> }) {
  const [mensItems, setMensItems] = useState<ItemProp[]>([]);
  const [womensItems, setWomensItems] = useState<ItemProp[]>([]);
  const [kidsItems, setKidsItems] = useState<ItemProp[]>([]);

  useEffect(() => {
    if (items) {
      let mens: ItemProp[] = [];
      let womens: ItemProp[] = [];
      let kids: ItemProp[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].category.includes("Kids")) {
          kids.push(items[i]);
        } else if (items[i].category.includes("Womens")) {
          womens.push(items[i]);
        } else if (items[i].category.includes("Mens")) {
          mens.push(items[i]);
        }
      }

      setMensItems(mens.slice(0, 4));
      setWomensItems(womens.slice(0, 4));
      setKidsItems(kids.slice(0, 4));
    }
  }, [items]);

  return (
    <Box>
      <HStack justifyContent={"center"} pb={1}>
        <Heading as="h3" size={"xl"} fontWeight="medium">
          Best Sellers
        </Heading>
      </HStack>

      <Box>
        <Tabs variant={""} align={"center"} size={"lg"}>
          <TabList mb={4}>
            <Tab
              _selected={{
                color: "outly.sec",
                textDecoration: "underline",
                textDecorationThickness: "1.1px",
                textUnderlineOffset: "14px",
              }}
            >
              Mens
            </Tab>
            <Tab
              _selected={{
                color: "outly.sec",
                textDecoration: "underline",
                textDecorationThickness: "1.1px",
                textUnderlineOffset: "14px",
              }}
            >
              Womens
            </Tab>
            <Tab
              _selected={{
                color: "outly.sec",
                textDecoration: "underline",
                textDecorationThickness: "1.1px",
                textUnderlineOffset: "14px",
              }}
            >
              Kids
            </Tab>
          </TabList>

          <TabPanels px={"6px"}>
            <TabPanel px={0}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 4 }}
                spacingX={{ base: 4, sm: 5, md: 6, lg: 8 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {mensItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>

              <ViewMoreLink category={"Mens"} />
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 4 }}
                spacingX={{ base: 4, sm: 5, md: 6, lg: 8 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {womensItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>

              <ViewMoreLink category={"Womens"} />
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 4 }}
                spacingX={{ base: 4, sm: 5, md: 6, lg: 8 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {kidsItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>

              <ViewMoreLink category={"Kids"} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

const ViewMoreLink = ({ category }: { category: string }) => {
  return (
    <HStack mt={6} w={"full"} justifyContent={"center"}>
      <Text
        textDecoration={"underline"}
        textUnderlineOffset={"3px"}
        fontWeight={500}
        textAlign={"center"}
        _hover={{ color: "outly.main900" }}
      >
        <Link href={`/category/${category}`}> View more </Link>
      </Text>
    </HStack>
  );
};
