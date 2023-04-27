import { useState } from "react";
import { ButtonBox, ButtonDropdown } from "@/components/General/atoms";
import { Box, Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

export function CategoryGrid() {
  const [view2Mode, setView2Mode] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={4}>
          <Box>
            <Heading as={"h5"} fontWeight={500} fontSize={"22px"} mb={"18px"}>
              Filter
            </Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={8}>
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
                  onClick={() => setView2Mode(true)}
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
                  onClick={() => setView2Mode(false)}
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
        </GridItem>
      </Grid>
    </Box>
  );
}
