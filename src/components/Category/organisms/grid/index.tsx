import { useState, useEffect } from "react";
import { ButtonBox, ButtonDropdown } from "@/components/General/atoms";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { FilterAccordion, FilterAccordionSkeleton } from "./filterAccordion";
import { FilterObjectProps, ItemProp } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "@/functions/firebase/category";
import { CardsGrid } from "./cardGrid";
import { getAllItems } from "@/functions";

export function CategoryGrid({ isShop }: { isShop?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [view2Mode, setView2Mode] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [allProducts, setAllProducts] = useState<ItemProp[]>([]);
  const [filterObject, setFilterObject] = useState<FilterObjectProps[]>([
    {
      name: "Category",
      options: [
        {
          category: "Mens",
          noOfItems: 3,
        },
      ],
    },
    {
      name: "Brand",
      options: [{ category: "Adidas" }],
    },
    {
      name: "Color",
      options: [{ category: "Black", color: "#000" }],
    },
    {
      name: "Size",
      options: [{ category: "L" }],
    },
    {
      name: "Price",
      options: [{ price: { category: "low", from: 0, to: 10000 } }],
    },
  ]);
  const [filterValues, setFilterValues] = useState([]);

  // write func that MAP THRPUGH CURR FILTER OPTIONS AND CREATE VALUES

  const toast = useToast();

  const filterOptionsQuery = useQuery(
    ["get_filter_options"],
    () => {
      return getFilterOptions();
    },
    {
      onSuccess: (data) => {
        setFilterObject(data);
      },
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
      },
    }
  );

  const getProductsQuery = useQuery(
    ["get_all_items"],
    () => {
      return getAllItems();
    },
    {
      onSuccess: (data) => {
        setAllProducts(data);
      },
    }
  );

  useEffect(() => {
    if (getProductsQuery.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [getProductsQuery.isLoading]);

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={4}>
          <Box>
            <Heading as={"h5"} fontWeight={500} fontSize={"22px"} mb={"18px"}>
              Filter
            </Heading>

            {filterOptionsQuery.isLoading ? (
              <FilterAccordionSkeleton />
            ) : (
              <FilterAccordion filterObject={[...filterObject]} />
            )}
          </Box>
        </GridItem>

        <GridItem colSpan={8} pl={10}>
          <HStack justifyContent={"space-between"}>
            <Text>{`Showing all results`}</Text>

            <HStack>
              <ButtonDropdown
                changeTitleOnClick
                title={"Default"}
                variant={"ghost"}
                list={[
                  { label: "Default", onClick: () => {} },
                  { label: "Popularity", onClick: () => {} },
                  { label: "Average rating", onClick: () => {} },
                  { label: "Latest", onClick: () => {} },
                  { label: "Price low to high", onClick: () => {} },
                  { label: "Price high to low", onClick: () => {} },
                ]}
                buttonProps={{ fontWeight: 400 }}
              />

              <HStack>
                <ButtonBox
                  isLight={!view2Mode}
                  onClick={() => {
                    setLoading(true);
                    setView2Mode(true);
                    const timeoutId = setTimeout(function () {
                      setLoading(false);
                    }, 1000);
                    // clearTimeout(timeoutId);
                  }}
                >
                  <svg
                    width="6"
                    height="16"
                    viewBox="0 0 6 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="2"
                      height="16"
                      rx="1"
                      fill="currentColor"
                      //   fill="#DDDDDD"
                    ></rect>
                    <rect
                      x="4"
                      width="2"
                      height="16"
                      rx="1"
                      fill="currentColor"
                      //   fill="#DDDDDD"
                    ></rect>
                  </svg>
                </ButtonBox>

                <ButtonBox
                  isLight={view2Mode}
                  onClick={() => {
                    setLoading(true);
                    setView2Mode(false);
                    const timeoutId = setTimeout(function () {
                      setLoading(false);
                    }, 1000);
                    // clearTimeout(timeoutId);
                  }}
                >
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="2"
                      height="16"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="4"
                      width="2"
                      height="16"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="8"
                      width="2"
                      height="16"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </ButtonBox>
              </HStack>
            </HStack>
          </HStack>

          {hasFilter ? (
            <HStack justifyContent={"flex-end"}>
              <Text color={"outly.black500"} mr={"20px"}>
                Your filter
              </Text>

              <ButtonBox isLight>
                <Text
                  color={"outly.black500"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"6px"}
                >
                  <span>Women</span>
                  <IoClose />
                </Text>
              </ButtonBox>

              <Text
                color={"outly.black500"}
                textDecoration={"underline"}
                textDecorationThickness={"1px"}
                textDecorationColor={"outly.black500"}
                textUnderlineOffset={"8px"}
              >
                Clear All
              </Text>
            </HStack>
          ) : null}

          <Box pt={4}>
            <CardsGrid
              products={allProducts}
              isLoading={loading}
              view2Mode={view2Mode}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
