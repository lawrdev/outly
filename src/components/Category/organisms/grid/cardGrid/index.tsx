import { ItemCard, ItemCardSkeleton } from "@/components/General/molecules";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { ItemProp } from "@/utils";

export function CardsGrid({
  isLoading,
  view2Mode,
  items,
}: {
  isLoading: boolean;
  view2Mode: boolean;
  items: ItemProp[];
}) {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: !view2Mode ? 1 : 2, md: view2Mode ? 2 : 3 }}
        spacingX={{ base: 5, lg: 7 }}
        spacingY={{ base: 8, lg: 5 }}
      >
        {isLoading ? (
          <>
            {[1, 2].map((_, index) => (
              <Box key={index}>
                <ItemCardSkeleton />
              </Box>
            ))}
          </>
        ) : null}

        {!isLoading && items.length > 0 ? (
          <>
            {items.map((product, index) => (
              <Box key={index}>
                <ItemCard item={product} />
              </Box>
            ))}
          </>
        ) : null}
      </SimpleGrid>

      {!isLoading && items.length === 0 ? (
        <Text
          w={"full"}
          color={"outly.black100"}
          textAlign={"center"}
          fontSize={"lg"}
          mt={"3.75rem"}
        >
          No products were found matching your selection.
        </Text>
      ) : null}
    </Box>
  );
}
