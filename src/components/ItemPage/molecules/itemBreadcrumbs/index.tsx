import { useState, useEffect } from "react";
import { Container } from "@/components/General/atoms";
import { Breadcrumbs } from "@/components/General/molecules";
import { Box } from "@chakra-ui/react";
import { ItemProp } from "@/utils";

export const ItemPageBreadcrumbs = ({ item }: { item?: ItemProp }) => {
  const [crumbs, setCrumbs] = useState([
    { title: "Home", href: "/" },
    { title: "Items", href: "/shop" },
  ]);

  useEffect(() => {
    if (item && item.subCategory) {
      setCrumbs(() => [
        { title: "Home", href: "/" },
        { title: "Items", href: "/shop" },
        {
          title: item.subCategory!,
          href: `/category/${item.category}?category=${item.subCategory}`,
        },
        {
          title: item.title,
          href: "/",
          isCurrent: true,
        },
      ]);
    } else if (item && !item.subCategory) {
      setCrumbs(() => [
        { title: "Home", href: "/" },
        { title: "Items", href: "/shop" },
        {
          title: item.category!,
          href: `/category/${item.category}`,
        },
        {
          title: item.title,
          href: "/",
          isCurrent: true,
        },
      ]);
    }
  }, [item]);

  return (
    <Box bg={"outly.bg"} py={5}>
      <Container>
        <Breadcrumbs crumbs={crumbs} />
      </Container>
    </Box>
  );
};
