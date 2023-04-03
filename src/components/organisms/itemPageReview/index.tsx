import { Rating } from "@/components/atoms";
import { ProductProp } from "@/utils";
import {
  chakra,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface Props {
  product: ProductProp;
}

export function ItemPageReview({ product }: Props) {
  const handleTime = (time: number) => {
    const value = dayjs.unix(time).format("MMM DD, YYYY");
    return value;
  };
  return (
    <Box>
      <Heading as="h4" size={"md"} mb={5}>
        Customer reviews
      </Heading>

      <Text fontWeight={"semibold"} mb={2}>
        {product.reviews?.length} Review(s)
      </Text>

      <HStack mb={6}>
        <Rating value={product.rating!} black />
        <Text fontSize={"lg"} fontFamily={"heading"} fontWeight={"medium"}>
          {product.rating! % 1 != 0
            ? product.rating
            : product.rating!.toFixed(1)}
        </Text>
      </HStack>
      <Divider borderWidth={1} borderColor={"gray.300"} mb={3} />

      <HStack mb={10}>
        <Button
          variant={"outline"}
          maxWidth={{ md: 230, xl: 280 }}
          width="100%"
        >
          Write a review
        </Button>
      </HStack>

      <chakra.ul>
        {product.reviews?.map((review, index) => (
          <chakra.li key={index} mb={6}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={{ base: 0, lg: 10 }}
              borderColor={"gray.400"}
              borderBottomWidth={1}
              pb={6}
            >
              <GridItem colSpan={{ base: 12, lg: 3 }}>
                <Rating value={review.rating} maxWidth={90} black />
                <Text fontSize={"sm"} fontWeight={"semibold"}>
                  {review.name}
                </Text>
                <Text color={"gray.500"} fontSize={"xs"} mb={4}>
                  {handleTime(review.time)}
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 9 }}>
                <Heading
                  as="h5"
                  size={"sm"}
                  fontWeight={"bold"}
                  fontFamily={"heading"}
                  mb={1}
                >
                  {review.title}
                </Heading>
                <Text color={"gray.700"}>{review.comment}</Text>
              </GridItem>
            </Grid>
          </chakra.li>
        ))}
      </chakra.ul>
    </Box>
  );
}
