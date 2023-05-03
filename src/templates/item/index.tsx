import { useState } from "react";
import { Container } from "@/components/General/atoms";
import { Breadcrumbs } from "@/components/General/molecules";
import {
  ItemPageInfo,
  ItemPageImages,
  ItemPageOrder,
  Footer,
  ItemPageReview,
  Header,
} from "@/components/General/organisms";
import { Navbar } from "@/components/General/organisms";
import { getSingleItem } from "@/functions/firebase/item";
import { ItemProp, ProductProp } from "@/utils";
import { Box, Grid, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ItemPageBreadcrumbs } from "@/components/ItemPage/itemBreadcrumbs";

export function ItemTemplate() {
  const [currItem, setCurrItem] = useState<ItemProp>();

  const router = useRouter();
  const { id } = router.query;

  const getItemQuery = useQuery(
    ["get_single_item"],
    () => {
      return getSingleItem(id as string);
    },
    {
      enabled: !!id,

      onSuccess: (data) => {
        setCurrItem(data);
      },
    }
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      minHeight={"100vh"}
      // bg={"white"}
    >
      <header>
        <Header inActive />
      </header>

      <ItemPageBreadcrumbs item={currItem} />

      <Footer />
    </Box>
  );
}
