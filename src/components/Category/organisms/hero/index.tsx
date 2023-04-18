import React from "react";
import { Container } from "@/components/General/atoms";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategoryHero } from "@/functions/firebase/category";
import { useSetRecoilState } from "recoil";
import { appLoader } from "@/recoil";

export function CategoryHero() {
  const [heroImage, setHeroImage] = React.useState("");
  const setAppLoader = useSetRecoilState(appLoader);

  const { isLoading, data } = useQuery(
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

  React.useEffect(() => {
    if (isLoading) {
      setAppLoader((prev) => ({ ...prev, category: true }));
    } else {
      setAppLoader((prev) => ({ ...prev, category: false }));
    }
  }, [isLoading, setAppLoader]);

  return (
    <Box position={"relative"}>
      <Box minHeight={{ base: "60vh", md: "100vh" }}>
        <Box
          width="100%"
          height={"100%"}
          minHeight={{ base: "60vh", md: "100vh" }}
          paddingBlock={"300px"}
          mx="auto"
          position={"relative"}
          overflow={"hidden"}
        >
          {/*  set image, size at base and xl */}
          <Image
            src={heroImage}
            alt="outly"
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

          <Box
            position={"absolute"}
            top={0}
            left={0}
            bottom={0}
            maxWidth={"600px"}
            display={"flex"}
            alignItems="center"
          >
            <Box py={3}>
              <Container>
                <Text fontSize={"xl"} fontWeight={"medium"}>
                  ffg
                </Text>

                <Heading
                  as="h2"
                  mb={3}
                  size={"3xl"}
                  fontWeight={"semibold"}
                  lineHeight={"1.1"}
                >
                  item.heading
                </Heading>

                <Text fontSize={"xl"} fontWeight={"medium"} pt={2} mb={10}>
                  Explore new-in products and future bestsellers.
                </Text>

                <Button size={"lg"}>View Collection</Button>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
