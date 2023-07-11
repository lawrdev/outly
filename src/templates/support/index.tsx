import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header } from "@/components/General/organisms";
import { SupportHero } from "@/components/Support/molecules";
import { SupportGrid } from "@/components/Support/organisms";
import { AspectRatio, Box } from "@chakra-ui/react";

export function SupportTemplate() {
  return (
    <PageWrapper bg={"outly.bg"}>
      <header>
        <Header />
      </header>

      <SupportHero />

      <main>
        <Box mb={8}>
          <AspectRatio ratio={16 / 6} minHeight={"360px"}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4783.29202224687!2d3.456987552714117!3d6.447067987021546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1689018863207!5m2!1sen!2sng"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </AspectRatio>
        </Box>

        <Container>
          <SupportGrid />
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
