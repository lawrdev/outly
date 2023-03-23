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
  Grid,
  GridItem,
  Flex,
  Center,
  Square,
  Button,
  VStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { HiArrowsRightLeft } from "react-icons/hi2";
import "swiper/css";
import Image from "next/image";
import { ItemProp } from "@/utils";
import { useEffect, useState } from "react";
import { SearchIcon, LoveIcon, CompareIcon } from "@/components/atoms";

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
      <HStack justifyContent={"center"} py={10}>
        <Heading as="h3" size={"lg"}>
          Best Sellers
        </Heading>
      </HStack>

      <Box>
        <Tabs variant={""} align={"center"} size={"lg"}>
          <TabList>
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
              <Grid
                templateColumns="repeat(12, 1fr)"
                gap={{ base: 4, md: 5, xl: 10 }}
              >
                {mensItems.map((item, index) => (
                  <GridItem colSpan={{ base: 6, md: 4, lg: 3 }} key={index}>
                    <Box
                      p={0.5}
                      boxShadow="inset 0px 0px 3px rgba(0, 0, 0, 0.15)"
                    >
                      <Box
                        width={"100%"}
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"end"}
                        position={"relative"}
                        zIndex={1}
                        overflow="hidden"
                        role="group"
                        cursor={"pointer"}
                      >
                        {/* first image */}
                        <Box
                          height={"100%"}
                          maxHeight={330}
                          bg="red.200"
                          _groupHover={{
                            visibility: "hidden",
                            opacity: 0,
                          }}
                          transition={
                            "all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"
                          }
                        >
                          <Image
                            src={item.images[0]}
                            alt={item.title}
                            title={item.title}
                            width={270}
                            height={350}
                            style={{
                              transform: "scale(1.1)",
                              objectFit: "contain",
                              objectPosition: "center",
                            }}
                            sizes={"(max-width: 1200px) 100vw, 100vw"}
                            quality={100}
                          />
                        </Box>

                        {/* Second image */}
                        <Box
                          position={"absolute"}
                          zIndex={2}
                          visibility={"hidden"}
                          height={"100%"}
                          top={"20px"}
                          left={0}
                          right={0}
                          opacity={0}
                          _groupHover={{
                            visibility: "visible",
                            opacity: 1,
                            top: "0px",
                          }}
                          transition={
                            "all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"
                          }
                        >
                          <Image
                            src={item.images[1]}
                            alt={item.title}
                            title={item.title}
                            sizes={"(max-width: 1200px) 100vw, 100vw"}
                            width={270}
                            height={350}
                            quality={100}
                          />
                        </Box>

                        {/* right menu */}
                        <Box
                          position={"absolute"}
                          zIndex={3}
                          visibility={"hidden"}
                          top={0}
                          right={0}
                          opacity={0}
                          transform={"translateX(100%)"}
                          _groupHover={{
                            visibility: "visible",
                            opacity: 1,
                            transform: "translateX(0)",
                          }}
                          transition={
                            "all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"
                          }
                        >
                          <VStack pt={3} pr={3} spacing={3}>
                            <Tooltip
                              label="Quick view"
                              placement="left"
                              hasArrow
                            >
                              <IconButton
                                display={{ base: "none", lg: "inline-flex" }}
                                bg="white"
                                color={"black"}
                                aria-label="Search"
                                p={1}
                                borderRadius={"50%"}
                                icon={<FiSearch size={20} />}
                              />
                            </Tooltip>

                            <Tooltip
                              label="Add to Wishlist"
                              placement="left"
                              hasArrow
                            >
                              <IconButton
                                bg="white"
                                color={"black"}
                                aria-label="Search"
                                p={1}
                                borderRadius={"50%"}
                                icon={<FaRegHeart size={20} />}
                              />
                            </Tooltip>

                            <Tooltip label="Compare" placement="left" hasArrow>
                              <IconButton
                                display={{ base: "none", lg: "inline-flex" }}
                                bg="white"
                                color={"black"}
                                aria-label="Search"
                                p={1}
                                borderRadius={"50%"}
                                icon={<HiArrowsRightLeft size={20} />}
                              />
                            </Tooltip>
                          </VStack>
                        </Box>

                        {/* bottom menu */}
                        <Box
                          position={"absolute"}
                          zIndex={3}
                          visibility={"hidden"}
                          bottom={0}
                          left={0}
                          right={0}
                          opacity={0}
                          transform={"translateY(100%)"}
                          _groupHover={{
                            visibility: "visible",
                            opacity: 1,
                            transform: "translateY(0)",
                          }}
                          transition={
                            "all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"
                          }
                        >
                          <Button
                            width={"100%"}
                            borderRadius={"none"}
                            _hover={{ bg: "outly.sec" }}
                          >
                            Add To Cart
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
