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
} from "@chakra-ui/react";
import "swiper/css";
import { ItemProp } from "@/utils";
import { useEffect, useState } from "react";
import { ItemCard } from "@/components/molecules";

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
        if (items[i].category === "Mens") {
          mens.push(items[i]);
        } else if (items[i].category === "Womens") {
          womens.push(items[i]);
        } else if (items[i].category === "Kids") {
          kids.push(items[i]);
        }
      }

      setMensItems(mens);
      setWomensItems(womens);
      setKidsItems(kids);
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

          <TabPanels>
            <TabPanel px={0}>
              <SimpleGrid
                columns={{ base: 2, md: 3, xl: 4 }}
                spacingX={{ base: 4, sm: 6, md: 10, lg: 14 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {mensItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid
                columns={{ base: 2, md: 3, xl: 4 }}
                spacingX={{ base: 4, sm: 6, md: 10, lg: 14 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {womensItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid
                columns={{ base: 2, md: 3, xl: 4 }}
                spacingX={{ base: 4, sm: 6, md: 10, lg: 14 }}
                spacingY={{ base: 5, sm: 8, md: 14, lg: 14 }}
              >
                {kidsItems.map((item, index) => (
                  <Box key={index}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
