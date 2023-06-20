import { useState, useEffect } from "react";
import {
  Container,
  ListAnimate,
  PageWrapper,
} from "@/components/General/atoms";
import { Breadcrumbs } from "@/components/General/molecules";
import { Footer, Header } from "@/components/General/organisms";
import {
  WishListComponentListsSkeleton,
  WishlistLink,
} from "@/components/Wishlist";
import {
  Box,
  Button,
  SlideFade,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getMultipleItems } from "@/functions/firebase/item";
import { DATE_NOW, ItemProp, LocalStorageWishlistProp } from "@/utils";
import { getWishlist } from "@/functions/wishlist";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { wishlistAtom } from "@/recoil";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const DynamicWishlist = dynamic(
  () =>
    import("../../components/Wishlist/organisms/lists/index").then(
      (module) => module.WishListComponentLists
    ),
  {
    ssr: false,
  }
);

export function WishlistTemplate() {
  const [dataReady, setDataReady] = useState(false);
  const [data, setData] = useState<{ item: ItemProp; dateAdded: string }[]>();
  const [wishlistAtomValue, setWishlistAtomValue] =
    useRecoilState(wishlistAtom);

  useQuery(
    ["get_wishlist_items"],
    () => {
      return getMultipleItems(getWishlist().map((x) => x.id));
    },
    {
      enabled: dataReady,
      onSuccess: (data) => {
        if (data) {
          let newSet = [...data].map((x) => {
            let dd = getWishlist()?.find((y) => y.id === x._id);

            return { item: x, dateAdded: dd?.date ? dd.date : DATE_NOW };
          });

          setData(newSet);
        } else {
          setData([]);
        }
        setDataReady(false);
      },
    }
  );

  useEffect(() => {
    if (getWishlist().length > 0) {
      setDataReady(true);
    }
  }, []);

  return (
    <>
      <PageWrapper>
        <header>
          <Header inActive />
        </header>

        <Box bg={"outly.bg"} py={5}>
          <Container>
            <Breadcrumbs
              crumbs={[
                { title: "Home", href: "/" },
                { title: "Wishlist", href: "/wishlist" },
              ]}
            />
          </Container>
        </Box>

        <main>
          <Container>
            <AnimatePresence>
              {dataReady && !data ? (
                // LOADING
                <ListAnimate>
                  <Box my={"2rem"} width={"full"}>
                    <WishListComponentListsSkeleton />
                  </Box>
                </ListAnimate>
              ) : null}

              {data && data?.length > 0 ? (
                // DATA
                <Box my={"2rem"}>
                  <DynamicWishlist data={data} setData={setData} />
                </Box>
              ) : null}

              {!dataReady && data && data.length === 0 ? (
                // EMPTY WISHLIST
                <ListAnimate>
                  <VStack pt={"5rem"} spacing={"16px"} w={"full"} mb={"99px"}>
                    <Text color={"outly.black100"} textAlign={"center"}>
                      No Item in your Wishlist
                    </Text>

                    <Link href={"/shop"}>
                      <Button
                        colorScheme={"appMain"}
                        size={"sm"}
                        fontWeight={500}
                      >
                        Explore Shop
                      </Button>
                    </Link>
                  </VStack>
                </ListAnimate>
              ) : null}
            </AnimatePresence>

            <Box mt={"3rem"}>
              <WishlistLink />
            </Box>
          </Container>
        </main>

        <Footer />
      </PageWrapper>
    </>
  );
}
