import { useState } from "react";
import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header, YouMayAlsoLike } from "@/components/General/organisms";
import { getSingleItem } from "@/functions/firebase/item";
import { ItemProp } from "@/utils";
import { Box, HStack, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ItemPageBreadcrumbs } from "@/components/ItemPage/molecules/itemBreadcrumbs";
import {
  ItemDetails,
  ItemDetailsSkelton,
  ItemImageGallery,
  ItemImageGallerySkeleton,
  ItemInfoTab,
} from "@/components/ItemPage/organisms";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";

export function ItemTemplate() {
  const [currItem, setCurrItem] = useState<ItemProp>();
  const [defaultIndex, setDefaultIndex] = useState(0);

  const toast = useToast();
  const router = useRouter();

  const { id } = router.query;

  const getItemQuery = useQuery(
    ["get_single_item", id],
    () => {
      return getSingleItem(id as string);
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        setCurrItem(data);
      },
      onError: (err) => {
        toast({
          title: "Item not found",
          description: (
            <Text
              color={"outly.black500"}
              fontSize={"sm"}
              textDecoration={"underline"}
              textUnderlineOffset={"4px"}
            >
              <Link href={"/shop"}>Explore shop</Link>
            </Text>
          ),
          status: "error",
        });
        router.push("/404");
      },
    }
  );

  return (
    <PageWrapper>
      <header>
        <Header inActive />
      </header>

      <ItemPageBreadcrumbs item={currItem} />

      <main style={{ marginBlockStart: "32px" }}>
        <Container>
          <HStack
            spacing={"0px"}
            alignItems={"flex-start"}
            width={"100%"}
            flexWrap={{ base: "wrap", lg: "nowrap" }}
            flexDirection={{ base: "column", lg: "row" }}
            ml={{ base: "0rem", lg: "-0.9375rem" }}
            mr={{ base: "0rem", lg: "0.9375rem" }}
          >
            <Box
              flex={{ base: "0 0 100%", lg: "0 0 56%" }}
              maxWidth={{ base: "100%", lg: "56%" }}
              position={"relative"}
              // minHeight={"1px"}
              pl={{ base: "0rem", lg: "0.9375rem" }}
              pr={{ base: "0rem", lg: "0.9375rem" }}
              width={"100%"}
            >
              {currItem ? (
                <ItemImageGallery item={currItem} />
              ) : (
                <ItemImageGallerySkeleton />
              )}
            </Box>

            <Box
              flex={{ base: "0 0 100%", lg: "0 0 44%" }}
              maxWidth={{ base: "100%", lg: "44%" }}
              position={"relative"}
              // minHeight={"1px"}
              pl={{ base: "0rem", lg: "0.9375rem" }}
              pr={{ base: "0rem", lg: "0.9375rem" }}
              width={"100%"}
            >
              {currItem ? (
                <ItemDetails
                  item={currItem}
                  setDefaultIndex={setDefaultIndex}
                />
              ) : (
                <ItemDetailsSkelton />
              )}
            </Box>
          </HStack>

          {currItem ? (
            <>
              <ItemInfoTab
                item={currItem}
                refetch={getItemQuery.refetch}
                defaultIndex={defaultIndex}
                setDefaultIndex={setDefaultIndex}
              />
            </>
          ) : null}

          {/* YOU MAY ALSO LIKE HERE */}
          {currItem ? (
            <section>
              <Box mt={"72px"}>
                <YouMayAlsoLike
                  currItemID={currItem._id}
                  categories={currItem.category}
                />
              </Box>
            </section>
          ) : null}
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
