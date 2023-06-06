import { Dispatch, SetStateAction } from "react";
import { ButtonBox, CustomCheckbox } from "@/components/General/atoms";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  VStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { currencyFormatter, FilterObjectProps } from "@/utils";
import { FilterValueProp } from "..";

interface HandleFilterFnProps {
  filterClass: "category" | "brand" | "color" | "size" | "price";
  value: string;
  isChecked: boolean;
}
export function FilterAccordion({
  filterObject,
  setFilterValues,
  handleFilterItems,
}: {
  filterObject: FilterObjectProps[];
  setFilterValues: Dispatch<SetStateAction<FilterValueProp>>;
  handleFilterItems: () => void;
}) {
  const handleFilter = ({
    filterClass,
    value,
    isChecked,
  }: HandleFilterFnProps) => {
    switch (filterClass) {
      case "category":
        if (isChecked) {
          setFilterValues((prev) => ({
            ...prev,
            categories: prev.categories.includes(value)
              ? [...prev.categories]
              : [...prev.categories, value],
          }));
        } else {
          setFilterValues((prev) => ({
            ...prev,
            categories: prev.categories.includes(value)
              ? [...prev.categories].filter((x) => x !== value)
              : [...prev.categories],
          }));
        }
        break;
      case "brand":
        if (isChecked) {
          setFilterValues((prev) => ({
            ...prev,
            brand: prev.brand.includes(value)
              ? [...prev.brand]
              : [...prev.brand, value],
          }));
        } else {
          setFilterValues((prev) => ({
            ...prev,
            brand: prev.brand.includes(value)
              ? [...prev.brand].filter((x) => x !== value)
              : [...prev.brand],
          }));
        }
        break;
      case "color":
        if (isChecked) {
          setFilterValues((prev) => ({
            ...prev,
            color: prev.color.includes(value)
              ? [...prev.color]
              : [...prev.color, value],
          }));
        } else {
          setFilterValues((prev) => ({
            ...prev,
            color: prev.color.includes(value)
              ? [...prev.color].filter((x) => x !== value)
              : [...prev.color],
          }));
        }
        break;
      case "size":
        if (isChecked) {
          setFilterValues((prev) => ({
            ...prev,
            size: prev.size.includes(value)
              ? [...prev.size]
              : [...prev.size, value],
          }));
        } else {
          setFilterValues((prev) => ({
            ...prev,
            size: prev.size.includes(value)
              ? [...prev.size].filter((x) => x !== value)
              : [...prev.size],
          }));
        }
        break;
      case "price":
        if (isChecked) {
          setFilterValues((prev) => ({
            ...prev,
            price: prev.price.includes(value)
              ? [...prev.price]
              : [...prev.price, value],
          }));
        } else {
          setFilterValues((prev) => ({
            ...prev,
            price: prev.price.includes(value)
              ? [...prev.price].filter((x) => x !== value)
              : [...prev.price],
          }));
        }
        break;

      default:
        console.warn("No matches here");
    }
    handleFilterItems();
  };

  return (
    <Box userSelect={"none"}>
      <Accordion defaultIndex={[0]} allowMultiple>
        {filterObject.map((item, index) => (
          <AccordionItem key={index}>
            <Heading as={"h5"}>
              <AccordionButton
                fontWeight={500}
                fontSize={"18px"}
                my={2}
                px={0}
                pt={6}
                pb={item.name === "Size" ? 3 : 5}
                justifyContent={"space-between"}
                _hover={{ bg: "none" }}
              >
                {item.name}
                <AccordionIcon />
              </AccordionButton>
            </Heading>

            <AccordionPanel pb={4} px={0}>
              <Stack
                flexDirection={item.name === "Size" ? "row" : "column"}
                alignItems={item.name === "Size" ? "flex-end" : "flex-start"}
                fontSize={"sm"}
                gap={"4px"}
                justifyContent={
                  item.name === "Size" ? "space-between" : "normal"
                }
                maxWidth={item.name === "Size" ? "270px" : "100%"}
                mb={"10px"}
              >
                {item.options.map((option, ind) => {
                  if (item.name === "Brand") {
                    return (
                      <CustomCheckbox
                        key={ind}
                        value={option?.category}
                        label={option?.category!}
                        onChange={(isChecked) => {
                          handleFilter({
                            filterClass: "brand",
                            value: option?.category!,
                            isChecked,
                          });
                        }}
                      />
                    );
                  } else if (item.name === "Categories") {
                    return option.subCategory ? (
                      <Box key={ind} width={"100%"}>
                        <Accordion defaultIndex={[0]} allowMultiple>
                          <AccordionItem border={"none"}>
                            <Heading as={"h6"} width={"100%"}>
                              <AccordionButton
                                gap={"12px"}
                                px={0}
                                _hover={{ bg: "none" }}
                              >
                                <Box color={"outly.black500"}>
                                  <CustomCheckbox
                                    label={`${option.category} (${option.noOfItems})`}
                                    onChange={(isChecked) => {
                                      handleFilter({
                                        filterClass: "category",
                                        value: option.category!,
                                        isChecked,
                                      });
                                    }}
                                  />
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </Heading>

                            <AccordionPanel pb={4}>
                              <VStack alignItems={"flex-start"}>
                                {option.subCategory?.map((sub, i) => (
                                  <CustomCheckbox
                                    key={i}
                                    label={`${sub.category} (${sub.noOfItems})`}
                                    onChange={(isChecked) => {
                                      handleFilter({
                                        filterClass: "category",
                                        value: sub.category!,
                                        isChecked,
                                      });
                                    }}
                                  />
                                ))}
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Box>
                    ) : (
                      <CustomCheckbox
                        key={ind}
                        value={option?.category}
                        label={`${option.category} (${option.noOfItems})`}
                        onChange={(isChecked) => {
                          handleFilter({
                            filterClass: "category",
                            value: option.category!,
                            isChecked,
                          });
                        }}
                      />
                    );
                  } else if (item.name === "Color") {
                    return (
                      <CustomCheckbox
                        key={ind}
                        label={option.category!}
                        color={option.color}
                        onClick={(color, isSelected) => {
                          handleFilter({
                            filterClass: "color",
                            value: color,
                            isChecked: isSelected,
                          });
                        }}
                      />
                    );
                  } else if (item.name === "Size") {
                    return (
                      <Box key={ind}>
                        <ButtonBox
                          value={option.category}
                          onClick={(size, isSelected) => {
                            handleFilter({
                              filterClass: "size",
                              value: size,
                              isChecked: isSelected!,
                            });
                          }}
                        >
                          {option.category}
                        </ButtonBox>
                      </Box>
                    );
                  } else if (item.name === "Price") {
                    return (
                      <CustomCheckbox
                        key={ind}
                        value={option.price?.category}
                        label={`${currencyFormatter(option.price?.from!)} - ${
                          option.price?.to
                            ? currencyFormatter(option.price?.to!)
                            : "Above"
                        }`}
                        onChange={(isChecked) => {
                          handleFilter({
                            filterClass: "price",
                            value: option?.price?.category!,
                            isChecked,
                          });
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export function FilterAccordionSkeleton() {
  return (
    <Box width={"100%"} pt={"14px"}>
      <VStack width={"100%"} alignItems={"flex-start"}>
        <Skeleton height="50px" />
        <Skeleton width={"50%"} />
        <Skeleton width={"50%"} />
      </VStack>
    </Box>
  );
}
