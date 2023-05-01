import React from "react";
import { CustomCheckbox } from "@/components/General/atoms";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FilterObjectProps } from "@/utils";

export function FilterAccordion({
  filterObject,
  setFilterObject,
}: {
  filterObject: {};
  setFilterObject: React.Dispatch<React.SetStateAction<FilterObjectProps[]>>;
}) {
  return (
    <Box>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <Heading as={"h5"}>
            <AccordionButton
              fontWeight={500}
              fontSize={"18px"}
              px={0}
              py={6}
              justifyContent={"space-between"}
              _hover={{ bg: "none" }}
            >
              Categories
              <AccordionIcon />
            </AccordionButton>
          </Heading>

          <AccordionPanel pb={4} px={0}>
            <VStack
              alignItems={"flex-start"}
              fontSize={"md"}
              fontWeight={400}
              color={"outly.black500"}
            >
              {/* <Checkbox icon={<BiCheckDouble />}>Checkbox 1</Checkbox> */}
              <CustomCheckbox label={"checkbox 1"} />

              <Box width={"100%"}>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem border={"none"}>
                    <Heading as={"h6"} width={"100%"}>
                      <AccordionButton gap={"12px"} px={0}>
                        <Box
                          fontSize={"md"}
                          fontWeight={400}
                          color={"outly.black500"}
                        >
                          <CustomCheckbox label={"Checkbox 2"} />
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <VStack alignItems={"flex-start"}>
                        <CustomCheckbox label={"Checkbox 2 a"} />
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
