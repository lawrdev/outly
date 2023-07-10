import React from "react";
import { Container } from "@/components/General/atoms";
import { Box, Heading, Skeleton, useToast } from "@chakra-ui/react";
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
        // console.log("errrrror is", err);
      },
    }
  );

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
    } else if (!isShop && queryName) {
      setCrumbs(() => [
        { title: "Home", href: "/" },
        {
          title: "Items",
          href: `/shop`,
        },
        {
          title: queryName as string,
          href: `/category/${queryName}`,
          isCurrent: true,
        },
      ]);
    }
  }, [queryName, isShop]);

  return (
    <Box position={"relative"}>
      <Box position={"relative"} py={{ base: "100px", xl: "160px" }}>
        {!isLoading ? (
          <Image
            src={
              heroImage ||
              "https://res.cloudinary.com/dqveipmsp/image/upload/v1688987651/Outly/heros/categoryHero_k2zyph.webp"
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
                fontSize={{ base: "30px", xl: "42px" }}
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
