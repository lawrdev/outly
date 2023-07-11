import { ButtonBox, Container, PageWrapper } from "@/components/General/atoms";
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
import { AspectRatio, Box, Button, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { GrLocationPin } from "react-icons/gr";

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

      <Hero heroImages={heroImages} />

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

        <section>
          <Box w={"full"} mt={"70px"}>
            <Heading
              as={"h3"}
              mb={4}
              fontSize={{ base: "2xl", xl: "3xl" }}
              fontWeight={500}
              display={"inline-flex"}
              w={"full"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              Contact us <GrLocationPin />
            </Heading>

            <AspectRatio
              mb={8}
              // boxShadow={"lg"}
              ratio={16 / 4}
              minHeight={"300px"}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4783.29202224687!2d3.456987552714117!3d6.447067987021546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1689018863207!5m2!1sen!2sng"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </AspectRatio>

            <HStack w={"full"} justifyContent={"center"}>
              <Button
                variant={"outline"}
                px={12}
                fontWeight={500}
                textTransform={"uppercase"}
                fontSize={"sm"}
              >
                <Link href={"/support"}>View Contact info</Link>
              </Button>
            </HStack>
          </Box>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
