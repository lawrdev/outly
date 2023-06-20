import { useState, useEffect, useRef } from "react";
import { ButtonBox, ButtonDropdown } from "@/components/General/atoms";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { FilterAccordion, FilterAccordionSkeleton } from "./filterAccordion";
import {
  BrandTypes,
  CategoryTypes,
  ColorTypes,
  FilterObjectProps,
  FilterValueProp,
  ItemProp,
  PriceTypes,
  SizeTypes,
} from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "@/functions/firebase/category";
import { CardsGrid } from "./cardGrid";
import { getAllItems } from "@/functions";
import { GiSettingsKnobs } from "react-icons/gi";
import { CustomDrawer } from "@/components/General/molecules";
import { useRecoilState, useResetRecoilState } from "recoil";
import { shopFiltersAtom, shopItemsAtom, userFiltersAtom } from "@/recoil";
import { useRouter } from "next/router";
import { VscClose } from "react-icons/vsc";

export type FilterMethodProps =
  | "Default"
  | "Popularity"
  | "Average rating"
  | "Latest"
  | "Price low to high"
  | "Price high to low";
export type FilterClassProps =
  | "Category"
  | "Brand"
  | "Color"
  | "Size"
  | "Price";
export interface onFilterChangeFnProps {
  filterClass: FilterClassProps;
  value: CategoryTypes | BrandTypes | ColorTypes | SizeTypes | PriceTypes;
  isChecked: boolean;
}

interface CurrFilterProp {
  category: FilterClassProps;
  value: CategoryTypes | BrandTypes | ColorTypes | SizeTypes | PriceTypes;
}

export function CategoryGrid({ isShop }: { isShop?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [itemsCountMsg, setItemsCountMsg] = useState("");
  const [view2Mode, setView2Mode] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [currFilter, setCurrFilter] = useState<CurrFilterProp[]>([]);

  const timerRef = useRef<any | null>(null);
  const viewRef = useRef<any | null>(null);
  const clearingRef = useRef<any | null>(null);

  const router = useRouter();
  const { name: queryName } = router.query;

  const toast = useToast();
  const filterDrawerDisclosure = useDisclosure();

  // all items
  const [shopItems, setShopItems] = useRecoilState(shopItemsAtom);
  const resetShopItems = useResetRecoilState(shopItemsAtom);
  // filters user selects
  const [userFilter, setUserFilter] = useRecoilState(userFiltersAtom);
  const resetUserFilters = useResetRecoilState(userFiltersAtom);
  // filter accordion values and selected filters
  const [shopFilter, setShopFilter] = useRecoilState(shopFiltersAtom);
  const resetShopFilter = useResetRecoilState(shopFiltersAtom);

  const handleSelectedFilterChange = (xFilter: FilterValueProp) => {
    let op: CurrFilterProp[] = [];

    if (xFilter.brand.length > 0) {
      xFilter.brand.forEach((x) => {
        op.push({ category: "Brand", value: x });
      });
    } else if (xFilter.categories.length > 0) {
      xFilter.categories.forEach((x) => {
        op.push({ category: "Category", value: x });
      });
    } else if (xFilter.color.length > 0) {
      xFilter.color.forEach((x) => {
        op.push({ category: "Color", value: x });
      });
    } else if (xFilter.price.length > 0) {
      xFilter.price.forEach((x) => {
        op.push({ category: "Price", value: x });
      });
    } else if (xFilter.size.length > 0) {
      xFilter.size.forEach((x) => {
        op.push({ category: "Size", value: x });
      });
    }

    setCurrFilter(op);
    // console.log("fireeeddddd", op, op.length);
    if (op.length > 0) {
      setHasFilter(true);
    } else {
      setHasFilter(false);
    }
  };

  // get all items
  const getProductsQuery = useQuery(
    ["get_all_items"],
    () => {
      return getAllItems();
    },
    {
      onSuccess: (data) => {
        setShopItems(data);
      },
    }
  );
  //  get filter from BE
  const filterOptionsQuery = useQuery(
    ["get_filter_options"],
    () => {
      return getFilterOptions();
    },
    {
      enabled: !getProductsQuery.isLoading,
      onSuccess: (data) => {
        setLoading(true);
        if (queryName && typeof queryName === "string") {
          let newFilter = data.map((op) => {
            if (op.name === "Categories") {
              return {
                ...op,
                options: op.options.map((curr) => {
                  if (curr.category === queryName) {
                    return {
                      ...curr,
                      isSelected: true,
                    };
                  } else {
                    return {
                      ...curr,
                      subCategory: curr.subCategory
                        ? curr.subCategory.map((curr2) => {
                            if (curr2.category === queryName) {
                              return {
                                ...curr2,
                                isSelected: true,
                              };
                            } else return curr2;
                          })
                        : undefined,
                    };
                  }
                }),
              };
            } else return op;
          });

          setShopFilter(newFilter);
          setUserFilter({
            ...userFilter,
            categories: userFilter.categories.includes(
              queryName as CategoryTypes
            )
              ? userFilter.categories
              : [...userFilter.categories, queryName as CategoryTypes],
          });

          handleFilterItems({
            filValues: {
              ...userFilter,
              categories: [queryName as CategoryTypes],
            },
          });
          handleSelectedFilterChange({
            ...userFilter,
            categories: [queryName as CategoryTypes],
          });
          setLoading(false);
        } else {
          setShopFilter(data);
          setLoading(false);
        }
      },
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
      },
    }
  );

  // clear timeouts
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(viewRef.current);
      clearTimeout(clearingRef.current);
    };
  }, []);

  // resets on unmount
  useEffect(() => {
    return () => {
      resetUserFilters();
      resetShopItems();
      resetShopFilter();
    };
  }, [resetUserFilters, resetShopItems, resetShopFilter]);

  const handleFilterItems = ({
    filValues,
    method,
  }: {
    filValues?: FilterValueProp;
    method?: FilterMethodProps;
  }) => {
    let newItems: ItemProp[] = getProductsQuery.data
      ? [...getProductsQuery.data]
      : [];

    if (filValues) {
      // CATEGORIES
      if (filValues.categories.length > 0) {
        newItems = [...newItems].filter((item) =>
          filValues.categories.some((op) => item.category.includes(op))
        );
      }

      // BRANDS
      if (filValues.brand.length > 0) {
        newItems = [...newItems].filter((item) =>
          filValues.brand.includes(item.brand)
        );
      }

      // COLOR
      if (filValues.color.length > 0) {
        newItems = [...newItems].filter((item) => {
          let res = filValues.color.some((op) => {
            let x = item.colors?.find((x) => x.color === op);
            return x ? true : false;
          });
          return res;
        });
      }

      // SIZE
      if (filValues.size.length > 0) {
        newItems = [...newItems].filter((item) =>
          filValues.size.some((op) => item.sizes?.includes(op))
        );
      }

      // PRICE
      if (filValues.price.length > 0) {
        let data = [...newItems];
        let arr1: ItemProp[] = [];
        let arr2: ItemProp[] = [];
        let arr3: ItemProp[] = [];

        if (filValues.price.includes("low")) {
          arr1 = [...data].filter((op) => op.price < 19999);
        }
        if (filValues.price.includes("mid")) {
          arr2 = [...data].filter((op) => op.price > 19999 && op.price < 79999);
        }
        if (filValues.price.includes("high")) {
          arr3 = [...data].filter((op) => op.price > 79999);
        }

        newItems = [...arr1, ...arr2, ...arr3];
      }

      handleSelectedFilterChange(filValues);
    }

    if (method) {
      // default
      if (method === "Default") {
        newItems = [...shopItems];
      }

      if (method === "Popularity") {
        newItems = [...shopItems];
      }

      if (method === "Average rating") {
        newItems = [...shopItems].sort((a, b) => {
          if (a.rating && b.rating) {
            return b.rating - a.rating;
          } else return 1;
        });
      }

      if (method === "Latest") {
        newItems = [...shopItems];
      }

      if (method === "Price low to high") {
        newItems = [...shopItems].sort((a, b) => a.price - b.price);
      }

      if (method === "Price high to low") {
        newItems = [...shopItems].sort((a, b) => b.price - a.price);
      }
    }

    setShopItems(newItems);

    timerRef.current = setTimeout(() => {
      setLoading(false);
      setItemsCountMsg(
        newItems.length > 0
          ? `Showing all ${newItems.length} results`
          : "Showing the single"
      );
      // console.log("fireddd");
    }, 1000);
  };

  const onFilterChange = ({
    filterClass,
    value,
    isChecked,
  }: onFilterChangeFnProps) => {
    setLoading(true);
    let filter = { ...userFilter };
    let newFilter: FilterObjectProps[] = [];

    switch (filterClass) {
      case "Category":
        if (isChecked) {
          filter = {
            ...filter,
            categories: filter.categories.includes(value as CategoryTypes)
              ? [...filter.categories]
              : [...filter.categories, value as CategoryTypes],
          };
        } else {
          filter = {
            ...filter,
            categories: filter.categories.includes(value as CategoryTypes)
              ? [...filter.categories].filter((x) => x !== value)
              : [...filter.categories],
          };
        }

        newFilter = shopFilter.map((op) => {
          if (op.name === "Categories") {
            return {
              ...op,
              options: op.options.map((curr) => {
                if (curr.category === value) {
                  return {
                    ...curr,
                    isSelected: isChecked,
                  };
                } else {
                  return {
                    ...curr,
                    subCategory: curr.subCategory
                      ? curr.subCategory.map((curr2) => {
                          if (curr2.category === value) {
                            return {
                              ...curr2,
                              isSelected: isChecked,
                            };
                          } else return curr2;
                        })
                      : undefined,
                  };
                }
              }),
            };
          } else return op;
        });

        break;
      case "Brand":
        if (isChecked) {
          filter = {
            ...filter,
            brand: filter.brand.includes(value as BrandTypes)
              ? [...filter.brand]
              : [...filter.brand, value as BrandTypes],
          };
        } else {
          filter = {
            ...filter,
            brand: filter.brand.includes(value as BrandTypes)
              ? [...filter.brand].filter((x) => x !== value)
              : [...filter.brand],
          };
        }

        newFilter = shopFilter.map((op) => {
          if (op.name === "Brand") {
            return {
              ...op,
              options: op.options.map((curr) => {
                if (curr.category === value) {
                  return {
                    ...curr,
                    isSelected: isChecked,
                  };
                } else return curr;
              }),
            };
          } else return op;
        });

        break;
      case "Color":
        if (isChecked) {
          filter = {
            ...filter,
            color: filter.color.includes(value as ColorTypes)
              ? [...filter.color]
              : [...filter.color, value as ColorTypes],
          };
        } else {
          filter = {
            ...filter,
            color: filter.color.includes(value as ColorTypes)
              ? [...filter.color].filter((x) => x !== value)
              : [...filter.color],
          };
        }

        newFilter = shopFilter.map((op) => {
          if (op.name === "Color") {
            return {
              ...op,
              options: op.options.map((curr) => {
                if (curr.category === value) {
                  return {
                    ...curr,
                    isSelected: isChecked,
                  };
                } else return curr;
              }),
            };
          } else return op;
        });

        break;
      case "Size":
        if (isChecked) {
          filter = {
            ...filter,
            size: filter.size.includes(value as SizeTypes)
              ? [...filter.size]
              : [...filter.size, value as SizeTypes],
          };
        } else {
          filter = {
            ...filter,
            size: filter.size.includes(value as SizeTypes)
              ? [...filter.size].filter((x) => x !== value)
              : [...filter.size],
          };
        }

        newFilter = shopFilter.map((op) => {
          if (op.name === "Size") {
            return {
              ...op,
              options: op.options.map((curr) => {
                if (curr.category === value) {
                  return {
                    ...curr,
                    isSelected: isChecked,
                  };
                } else return curr;
              }),
            };
          } else return op;
        });

        break;
      case "Price":
        if (isChecked) {
          filter = {
            ...filter,
            price: filter.price.includes(value as PriceTypes)
              ? [...filter.price]
              : [...filter.price, value as PriceTypes],
          };
        } else {
          filter = {
            ...filter,
            price: filter.price.includes(value as PriceTypes)
              ? [...filter.price].filter((x) => x !== value)
              : [...filter.price],
          };
        }

        newFilter = shopFilter.map((op) => {
          if (op.name === "Price") {
            return {
              ...op,
              options: op.options.map((curr) => {
                if (curr.price?.category === value) {
                  return {
                    ...curr,
                    isSelected: isChecked,
                  };
                } else return curr;
              }),
            };
          } else return op;
        });

        break;

      default:
        console.warn("No matches here");
    }

    setShopFilter(newFilter);
    setUserFilter(filter);
    handleFilterItems({
      filValues: filter,
    });
  };

  const filterBar = (
    <aside>
      <Heading as={"h5"} fontWeight={500} fontSize={"22px"} mb={"18px"}>
        Filter
      </Heading>

      {filterOptionsQuery.isLoading || isClearing ? (
        <FilterAccordionSkeleton />
      ) : (
        <FilterAccordion onFilterChange={onFilterChange} />
      )}
    </aside>
  );

  return (
    <>
      <Box>
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={3} display={{ base: "none", lg: "block" }}>
            {filterBar}
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 9 }} pl={{ base: 0, lg: "52px" }}>
            <HStack justifyContent={"space-between"} spacing={"0px"}>
              <Button
                display={{ base: "block", lg: "none" }}
                variant={"unstyled"}
                onClick={() => {
                  filterDrawerDisclosure.onOpen();
                }}
              >
                <HStack>
                  <GiSettingsKnobs fontSize={"26px"} />
                  <Heading
                    as={"h5"}
                    fontWeight={500}
                    fontSize={"20px"}
                    mb={"18px"}
                  >
                    Filter
                  </Heading>
                </HStack>
              </Button>

              <Text
                marginInlineStart={"0px"}
                display={{ base: "none", md: "block" }}
              >
                {itemsCountMsg}
              </Text>

              <HStack>
                <ButtonDropdown
                  changeTitleOnClick
                  title={"Default"}
                  variant={"ghost"}
                  list={[
                    {
                      label: "Default",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Default",
                        });
                      },
                    },
                    {
                      label: "Popularity",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Popularity",
                        });
                      },
                    },
                    {
                      label: "Average rating",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Average rating",
                        });
                      },
                    },
                    {
                      label: "Latest",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Latest",
                        });
                      },
                    },
                    {
                      label: "Price low to high",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Price low to high",
                        });
                      },
                    },
                    {
                      label: "Price high to low",
                      onClick: () => {
                        setLoading(true);
                        handleFilterItems({
                          method: "Price high to low",
                        });
                      },
                    },
                  ]}
                  buttonProps={{ fontWeight: 400 }}
                />

                <HStack>
                  <Box display={{ base: "block", md: "none" }}>
                    <ButtonBox
                      isLight={view2Mode}
                      onClick={() => {
                        setLoading(true);
                        setView2Mode(false);
                        viewRef.current = setTimeout(function () {
                          setLoading(false);
                        }, 1000);
                      }}
                    >
                      <svg
                        width="2"
                        height="16"
                        viewBox="0 0 2 16"
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
                      </svg>
                    </ButtonBox>
                  </Box>

                  <ButtonBox
                    isLight={!view2Mode}
                    onClick={() => {
                      setLoading(true);
                      setView2Mode(true);
                      viewRef.current = setTimeout(function () {
                        setLoading(false);
                      }, 1000);
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

                  <Box display={{ base: "none", md: "block" }}>
                    <ButtonBox
                      isLight={view2Mode}
                      onClick={() => {
                        setLoading(true);
                        setView2Mode(false);
                        viewRef.current = setTimeout(function () {
                          setLoading(false);
                        }, 1000);
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
                  </Box>
                </HStack>
              </HStack>
            </HStack>

            {hasFilter ? (
              <Stack
                mt={"12px"}
                mb={"18px"}
                direction={"row"}
                alignItems={"center"}
                spacing={"0px"}
                gap={"6px"}
                flexWrap={"wrap"}
              >
                <Text color={"outly.black500"} fontWeight={400} mr={"20px"}>
                  Your filter:
                </Text>

                {currFilter.map((op, index) => (
                  <ButtonBox
                    key={index}
                    isLight
                    onClick={() => {
                      onFilterChange({
                        filterClass: op.category,
                        value: op.value,
                        isChecked: false,
                      });
                    }}
                  >
                    <Text
                      color={"outly.black400"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"6px"}
                      fontSize={"sm"}
                      fontWeight={500}
                    >
                      <span>{op.value}</span>
                      <Text as={"span"} fontSize={"14px"}>
                        <VscClose />
                      </Text>
                    </Text>
                  </ButtonBox>
                ))}

                <Text
                  pl={"10px"}
                  color={"outly.black500"}
                  fontSize={"sm"}
                  textDecoration={"underline"}
                  textDecorationThickness={"1px"}
                  textDecorationColor={"outly.black100"}
                  textUnderlineOffset={"4px"}
                  _hover={{
                    color: "outly.main900",
                    textDecorationColor: "outly.main900",
                  }}
                  cursor={"pointer"}
                  onClick={() => {
                    setIsClearing(true);
                    resetShopFilter();
                    setShopItems(getProductsQuery.data as ItemProp[]);
                    setShopFilter(
                      filterOptionsQuery?.data as FilterObjectProps[]
                    );

                    setCurrFilter([]);
                    resetUserFilters();
                    setHasFilter(false);
                    clearingRef.current = setTimeout(() => {
                      setIsClearing(false);
                      setItemsCountMsg(
                        `Showing all ${getProductsQuery.data?.length} results`
                      );
                    }, 1000);
                  }}
                >
                  Clear All
                </Text>
              </Stack>
            ) : null}

            <Box pt={4}>
              <CardsGrid
                isLoading={loading}
                view2Mode={view2Mode}
                items={shopItems}
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>

      {/* MOBILE FILTER */}
      <CustomDrawer
        disclosure={filterDrawerDisclosure}
        placement="left"
        blockScrollOnMount={false}
      >
        <Box pt={"22px"}>{filterBar}</Box>
      </CustomDrawer>
    </>
  );
}
