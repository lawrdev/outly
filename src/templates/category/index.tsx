import React from "react";
import { CategoryGrid, CategoryHero } from "@/components/Category/organisms";
import { Footer, Header } from "@/components/General/organisms";
import { Box } from "@chakra-ui/react";
import { Container, PageWrapper } from "@/components/General/atoms";

export function CategoryTemplate({ isShop }: { isShop?: boolean }) {
  return (
    <PageWrapper>
      <header>
        <Header inActive />
      </header>

      <CategoryHero isShop={isShop} />

      <main style={{ paddingBlock: "50px", minHeight: "100vh" }}>
        <Container>
          <CategoryGrid isShop={isShop} />
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
