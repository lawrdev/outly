import { ItemCard, ItemCardSkeleton } from "@/components/General/molecules";
import { Box, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { ItemProp } from "@/utils";

export function CardsGrid({
  products,
  isLoading,
  view2Mode,
}: {
  products: ItemProp[];
  isLoading: boolean;
  view2Mode: boolean;
}) {
  return (
    <Box>
      <SimpleGrid columns={view2Mode ? 2 : 3} spacing={10}>
        {products.map((product, index) => (
          <Box key={index}>
            {!isLoading ? <ItemCard item={product} /> : <ItemCardSkeleton />}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
