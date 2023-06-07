import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  TextProps,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ItemProp, SearchCategoriesTypes } from "@/utils";
import { ItemCard, ItemCardSkeleton } from "../../molecules";
import { getSuggestionsRandom } from "@/functions/firebase/category";
import { useRouter } from "next/router";
import { getAllItems } from "@/functions";

export const YouMayAlsoLike = ({
  currItemID,
  categories,
  limit,
  headerProps,
}: {
  categories: SearchCategoriesTypes[];
  currItemID?: string;
  isLoading?: boolean;
  headerProps?: TextProps;
  limit?: number;
}) => {
  const [data, setData] = useState<ItemProp[]>();

  const router = useRouter();

  const getCategorySuggestions = useQuery(
    ["get_category_suggestions"],
    () => {
      if (categories.includes("All")) {
        return getAllItems(limit || 4);
      } else {
        return getSuggestionsRandom(categories, limit || 8);
      }
    },
    {
      onSuccess: (res) => {
        setData(res as ItemProp[]);
      },
      onError: (err) => {
        setData([]);
      },
    }
  );

  // console.log("datttta", data);

  return (
    <Box w={"100%"}>
      <Heading
        mb={"21px"}
        as="h2"
        size={"lg"}
        fontWeight={500}
        textAlign={"center"}
        {...headerProps}
      >
        You May Also Like
      </Heading>

      {!getCategorySuggestions.isLoading && data && data.length > 0 ? (
        <Box pb={"32px"}>
          <Grid
            mb={"28px"}
            templateColumns="repeat(12, 1fr)"
            rowGap={8}
            columnGap={2}
          >
            {data
              // .filter((op) => (currItemID ? op._id !== currItemID : true))
              .map((item, index) => (
                <GridItem key={index} colSpan={{ base: 12, sm: 6 }}>
                  <ItemCard item={item} />
                </GridItem>
              ))}
          </Grid>

          <HStack w={"full"} justifyContent={"center"}>
            <Button
              variant={"link"}
              _hover={{ color: "outly.main900" }}
              textDecoration={"underline"}
              textUnderlineOffset={"2px"}
              onClick={() => {
                router.push(`/shop`);
              }}
            >
              View More
            </Button>
          </HStack>
        </Box>
      ) : null}

      {getCategorySuggestions.isLoading && !data ? (
        <Box width={{ base: "100%", sm: "190px" }}>
          <ItemCardSkeleton />
        </Box>
      ) : null}
    </Box>
  );
};
