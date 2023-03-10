import { Container } from "@/components/atoms";
import { Header, Navbar } from "@/components/organisms";
import { DealsRow } from "@/components/organisms/dealsRow";
import { getProducts } from "@/functions";
import { HeaderImagesProp, ProductProp } from "@/utils";
import { Box } from "@chakra-ui/react";

interface Props {
  products: ProductProp[];
  headerImages: HeaderImagesProp[];
}
export function HomeTemplate({ products, headerImages }: Props) {
  console.log(getProducts());
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <header>
        <Box mb={{ base: 8, md: 14 }}>
          <Header headerImages={headerImages} />
        </Box>
      </header>

      <main>
        <Container>
          <DealsRow products={products} />
        </Container>
      </main>
    </>
  );
}
