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
import { currencyFormatter, SizeTypes } from "@/utils";
import { onFilterChangeFnProps } from "..";
import { useRecoilValue } from "recoil";
import { shopFiltersAtom } from "@/recoil";

export function FilterAccordion({
  onFilterChange,
}: {
  onFilterChange: (props: onFilterChangeFnProps) => void;
}) {
  const shopFilter = useRecoilValue(shopFiltersAtom);

  return (
    <Box userSelect={"none"}>
      <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
        {shopFilter.map((item, index) => (
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

            <AccordionPanel pt={0} pb={5} mb={0} px={0}>
              <Stack
                pt={0}
                mt={0}
                flexDirection={item.name === "Size" ? "row" : "column"}
                alignItems={item.name === "Size" ? "flex-end" : "flex-start"}
                fontSize={"sm"}
                gap={"4px"}
                justifyContent={
                  item.name === "Size" ? "space-between" : "normal"
                }
                maxWidth={item.name === "Size" ? "270px" : "100%"}
                mb={"10px"}
                pl={"6px"}
              >
                {item.options.map((option, ind) => {
                  if (item.name === "Brand") {
                    return (
                      <CustomCheckbox
                        key={ind}
                        value={option?.category}
                        label={option?.category!}
                        onChange={(isChecked) => {
                          onFilterChange({
                            filterClass: "Brand",
                            value: option?.category!,
                            isChecked,
                          });
                        }}
                        checkboxProps={{
                          isChecked: option.isSelected,
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
                                py={0}
                                _hover={{ bg: "none" }}
                              >
                                <Box color={"outly.black500"}>
                                  <CustomCheckbox
                                    label={`${option.category} (${option.noOfItems})`}
                                    onChange={(isChecked) => {
                                      onFilterChange({
                                        filterClass: "Category",
                                        value: option.category!,
                                        isChecked,
                                      });
                                    }}
                                  />
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </Heading>

                            <AccordionPanel pt={3} pb={1}>
                              <VStack alignItems={"flex-start"}>
                                {option.subCategory?.map((sub, i) => (
                                  <CustomCheckbox
                                    key={i}
                                    label={`${sub.category} (${sub.noOfItems})`}
                                    onChange={(isChecked) => {
                                      onFilterChange({
                                        filterClass: "Category",
                                        value: sub.category!,
                                        isChecked,
                                      });
                                    }}
                                    checkboxProps={{
                                      isChecked: sub.isSelected,
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
                          onFilterChange({
                            filterClass: "Category",
                            value: option.category!,
                            isChecked,
                          });
                        }}
                        checkboxProps={{
                          isChecked: option.isSelected,
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
                          onFilterChange({
                            filterClass: "Color",
                            value: color,
                            isChecked: isSelected,
                          });
                        }}
                        isSelectedForColor={option.isSelected}
                      />
                    );
                  } else if (item.name === "Size") {
                    return (
                      <Box key={ind}>
                        <ButtonBox
                          value={option.category}
                          onClick={(size, isSelected) => {
                            console.log("tttttt", size, isSelected);
                            onFilterChange({
                              filterClass: "Size",
                              value: size as SizeTypes,
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
                          onFilterChange({
                            filterClass: "Price",
                            value: option?.price?.category!,
                            isChecked,
                          });
                        }}
                        checkboxProps={{
                          isChecked: option.isSelected,
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
    <Box width={"100%"} pt={"10px"}>
      <VStack width={"100%"} alignItems={"flex-start"}>
        <Skeleton height="40px" />
        <Skeleton height="20px" width={"90%"} />
        <Skeleton height="13px" width={"50%"} />
      </VStack>
    </Box>
  );
}
