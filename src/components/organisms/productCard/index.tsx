import { CardBody } from "@/components/molecules/cardBody";
import { CardSwiper } from "@/components/molecules/cardSwiper";
import { FCProductObjectProp } from "@/utils";
import { Box, Skeleton } from "@chakra-ui/react";

export function ProductCard({ product }: FCProductObjectProp) {
  return (
    <Box height="100%">
      <Box mb={2} boxShadow="md" borderRadius="xl" overflow="hidden">
        <Skeleton isLoaded={product.images ? true : false}>
          <CardSwiper images={product.images!} />
        </Skeleton>
      </Box>

      <Box
        px={3}
        pb={5}
        borderColor="backgrounds.5"
        borderWidth={2}
        borderRadius="xl"
        borderTopColor="none"
        borderTopWidth={0}
        // borderLeftRadius="xl"
        borderTopLeftRadius="none"
        borderTopRightRadius="none"
        boxShadow="sm"
        cursor="default"
      >
        <Skeleton isLoaded={product ? true : false}>
          <CardBody product={product} />
        </Skeleton>
      </Box>
    </Box>
  );
}

function CardSkeleton() {
  return;
}
