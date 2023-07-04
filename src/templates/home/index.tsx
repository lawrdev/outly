import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header } from "@/components/General/organisms";
import {
  BestSellers,
  CustomerReviews,
  FollowUs,
  SaleEvent,
} from "@/components/Home/organisms";
import { Hero } from "@/components/Home/organisms/hero";
import { ShopByCategory } from "@/components/Home/organisms/shopByCategory";
import {
  CategoryProp,
  HeroImagesProp,
  ItemProp,
  SocialImageProp,
} from "@/utils";
import { Box } from "@chakra-ui/react";

interface Props {
  heroImages: HeroImagesProp[];
  categoryItems: CategoryProp[];
  items: ItemProp[];
  socialImages: SocialImageProp[];
}
export function HomeTemplate({
  heroImages,
  categoryItems,
  items,
  socialImages,
}: Props) {
  return (
    <PageWrapper bg={"#fff"}>
      <header>
        <Header />
      </header>

      <Box>
        <Hero heroImages={heroImages} />
      </Box>

      <main>
        <section style={{ marginBlockEnd: "100px" }}>
          <Container>
            <ShopByCategory categoryItems={categoryItems} />
          </Container>
        </section>

        <section style={{ marginBlockEnd: "100px" }}>
          <Container>
            <BestSellers items={items} />
          </Container>
        </section>

        <section style={{ marginBlockEnd: "100px" }}>
          <SaleEvent />
        </section>

        <section style={{ marginBlockEnd: "100px" }}>
          <Container>
            <CustomerReviews />
          </Container>
        </section>

        <section>
          <Container>
            <FollowUs socialImages={socialImages} />
          </Container>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
