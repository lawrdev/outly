import { Container } from "@/components/atoms";
import { Breadcrumbs } from "@/components/molecules";
import {
  ItemPageInfo,
  ItemPageImages,
  ItemPageOrder,
  Footer,
  ItemPageReview,
} from "@/components/organisms";
import { Navbar } from "@/components/organisms";
import { ProductProp } from "@/utils";
import { Box, Grid, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

interface Props {
  product: ProductProp;
}

export function ItemTemplate({ product }: Props) {
  const crumbsArr = [
    { title: "Home", href: "/", isCurrent: false },
    {
      title: product.description!,

      href: `/item/${product._id}`,
      isCurrent: true,
    },
  ];

  if (!product) return <p>Loading....</p>;
  return (
    <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
      <nav>
        <Navbar />
      </nav>
      <Container>
        <Box mt={5} mb={7}>
          <Breadcrumbs crumbs={crumbsArr} />
        </Box>

        <main>
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={{ base: 0, md: 10 }}
            rowGap={{ base: 8, md: 6 }}
            mb={{ base: 12, xl: 2 }}
          >
            <GridItem colSpan={{ base: 12, md: 6, xl: 5 }}>
              <ItemPageImages imgArr={product.images!} />
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 6, xl: 4 }}>
              <ItemPageInfo product={product} />
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 12, xl: 3 }}>
              <ItemPageOrder product={product} />
            </GridItem>
          </Grid>
          <ItemPageReview product={product} />
        </main>
      </Container>

      <Footer />
    </Box>
  );
}
