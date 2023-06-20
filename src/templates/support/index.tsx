import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header } from "@/components/General/organisms";
import { SupportHero } from "@/components/Support/molecules";
import { SupportGrid } from "@/components/Support/organisms";

export function SupportTemplate() {
  return (
    <PageWrapper bg={"outly.bg"}>
      <header>
        <Header />
      </header>

      <SupportHero />

      <main>
        <Container>
          <SupportGrid />
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
