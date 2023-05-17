import React from "react";
import { Container } from "@/components/General/atoms";
import {
  Box,
  Button,
  Heading,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategoryHero } from "@/functions/firebase/category";
import { useSetRecoilState } from "recoil";
import { appLoader } from "@/recoil";
import { useRouter } from "next/router";
import { Breadcrumbs } from "@/components/General/molecules";

export function CategoryHero({
  isShop,
  isCart,
  isCheckout,
}: {
  isShop?: boolean;
  isCart?: boolean;
  isCheckout?: boolean;
}) {
  const router = useRouter();
  const { name: queryName, filter: queryFilter } = router.query;

  const [heroImage, setHeroImage] = React.useState("");
  const [crumbs, setCrumbs] = React.useState([
    { title: "Home", href: "/" },
    { title: queryName as string, href: `/category/${queryName}` },
  ]);

  const setAppLoader = useSetRecoilState(appLoader);
  const toast = useToast();

  const { isLoading } = useQuery(
    ["get_category_hero"],
    () => {
      return getCategoryHero();
    },
    {
      onSuccess: (data) => {
        setHeroImage(data?.hero.image || "");
      },
      onError: (err) => {
        console.log("errrrror is", err);
      },
    }
  );

  // app loader
  // React.useEffect(() => {
  //   if (isLoading) {
  //     setAppLoader((prev) => ({ ...prev, category: true }));
  //   } else {
  //     setAppLoader((prev) => ({ ...prev, category: false }));
  //   }
  // }, [isLoading, setAppLoader]);

  // filter crumbs
  React.useEffect(() => {
    if (isShop) {
      setCrumbs(() => [
        { title: "Home", href: "/" },
        {
          title: "Shop",
          href: `/shop`,
          isCurrent: true,
        },
      ]);
    } else if (queryFilter && queryName) {
      setCrumbs(() => [
        { title: "Home", href: "/" },
        {
          title: queryName as string,
          href: `/category/${queryName}`,
        },
        {
          title: queryFilter as string,
          href: `/category/${queryName}?filter=${queryFilter}`,
          isCurrent: true,
        },
      ]);
    }
  }, [queryName, queryFilter, isShop]);

  return (
    <Box position={"relative"}>
      <Box position={"relative"} py={{ base: "100px", xl: "160px" }}>
        {!isLoading ? (
          <Image
            src={
              heroImage ||
              "https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/categories%2FcategoryHero.jpg?alt=media&token=819664e6-0c47-4882-928f-1576dd806157"
            }
            alt="category"
            sizes="(max-width: 1200px) 100vw,
            100vw"
            priority
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top left",
            }}
            quality={100}
          />
        ) : null}

        <Container>
          <Box position={"relative"} zIndex={2} maxWidth={"600px"}>
            <Box py={3}>
              <Heading
                as="h1"
                mb={4}
                fontSize={{ base: "36px", xl: "42px" }}
                color={"outly.black"}
                fontWeight={500}
                lineHeight={"1.1"}
              >
                {isShop
                  ? "Shop"
                  : isCart
                  ? "Cart"
                  : isCheckout
                  ? "Checkout"
                  : `Category: ${
                      queryFilter ? queryFilter : queryName ? queryName : ""
                    }`}
              </Heading>

              <Box>
                <Breadcrumbs
                  crumbs={
                    isCart
                      ? [
                          { title: "Home", href: "/" },
                          { title: "Cart", href: `/cart`, isCurrent: true },
                        ]
                      : isCheckout
                      ? [
                          { title: "Home", href: "/" },
                          {
                            title: "Checkout",
                            href: `/checkout`,
                            isCurrent: true,
                          },
                        ]
                      : crumbs
                  }
                />
              </Box>
            </Box>
          </Box>
        </Container>

        {isLoading ? (
          <Skeleton
            position={"absolute"}
            height={"100%"}
            top={0}
            bottom={0}
            left={0}
            right={0}
          />
        ) : null}
      </Box>
    </Box>
  );
}
