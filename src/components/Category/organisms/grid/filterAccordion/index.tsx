import React from "react";
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

export function FilterAccordion({
  filterObject,
}: {
  filterObject: FilterObjectProps[];
}) {
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
                        onChange={(e) => {
                          console.log("yoooo", e.target.value);
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
                        label={option?.category!}
                        onChange={(e) => {
                          console.log("yoooo", e.target.value);
                        }}
                      />
                    );
                  } else if (item.name === "Color") {
                    return (
                      <CustomCheckbox
                        key={ind}
                        label={option.category!}
                        color={option.color}
                        onClick={(color) => {
                          console.log("yoooo", color);
                        }}
                      />
                    );
                  } else if (item.name === "Size") {
                    return (
                      <Box key={ind}>
                        <ButtonBox
                          value={option.category}
                          onClick={(size) => {
                            console.log("yoooo", size);
                          }}
                          // ml={"20px"}
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
                        onChange={(e) => {
                          console.log("yoooo", e.target.value);
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
