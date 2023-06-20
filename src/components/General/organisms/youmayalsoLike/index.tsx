import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ItemProp, SearchCategoriesTypes } from "@/utils";
import { ItemCard, ItemCardSkeleton } from "../../molecules";
import { getSuggestionsRandom } from "@/functions/firebase/category";
import { useRouter } from "next/router";
import { getAllItems } from "@/functions";
import Link from "next/link";

export const YouMayAlsoLike = ({
  currItemID,
  categories,
  limit,
  headerProps,
  isDrawer,
}: {
  categories: SearchCategoriesTypes[];
  currItemID?: string;
  isLoading?: boolean;
  headerProps?: TextProps;
  limit?: number;
  isDrawer?: boolean;
}) => {
  const [data, setData] = useState<ItemProp[]>();

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
        if (currItemID) {
          let op = res.filter((x) => x._id !== currItemID).slice(0, 4);
          setData(op);
        } else {
          setData(res.slice(0, 4));
        }
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
        mb={{ base: "32px", md: "47px" }}
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
          <SimpleGrid
            mb={"38px"}
            columns={{ base: 1, sm: 2, md: isDrawer ? 2 : 4 }}
            spacing={{ base: 8, sm: 4, md: isDrawer ? 6 : 10 }}
          >
            {data.map((item, index) => (
              <Box key={index}>
                <ItemCard item={item} isDrawer={isDrawer} />
              </Box>
            ))}
          </SimpleGrid>

          <HStack w={"full"} justifyContent={"center"}>
            <Text
              className={"__link"}
              fontWeight={500}
              color={"outly.black500"}
              fontSize={{ base: "md", md: "lg" }}
            >
              <Link href={`/shop`}>View More</Link>
            </Text>
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
