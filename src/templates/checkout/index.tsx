import { useState, useEffect } from "react";
import { CheckoutCart, Footer, Navbar } from "@/components/organisms";
import { LocalStorageItemProp, ProductProp } from "@/utils";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil";
import { Container } from "@/components/atoms";

export function CheckoutTemplate({
  products,
}: {
  products: Array<ProductProp>;
}) {
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const [currProducts, setCurrProducts] = useState<Array<ProductProp> | null>(
    null
  );

  useEffect(() => {
    const p = cartValue.map((item) => {
      let val = products.find((v) => v._id === item.id);
      return val;
    });
    setCurrProducts(p as Array<ProductProp>);
  }, [cartValue, products]);

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Box mt={8}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={{ base: 0, md: 10 }}
              rowGap={{ base: 8, md: 6 }}
            >
              <GridItem colSpan={{ base: 12 }}>
                <CheckoutCart cart={cartValue} products={currProducts} />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </main>

      <Footer />
    </>
  );
}
