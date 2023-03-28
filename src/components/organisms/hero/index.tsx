import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { Swiper as SwiperType, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { HeroImagesProp } from "@/utils";
import { Container } from "@/components/atoms";
import { useTrail, animated, config } from "@react-spring/web";
import { useState, useRef } from "react";

interface Props {
  heroImages: HeroImagesProp[];
}

export function Hero({ heroImages }: Props) {
  const [curr, setCurr] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const [trails, api] = useTrail(
    4,
    () => ({
      from: { y: 80, opacity: 0 },
      to: { y: 0, opacity: 1 },
      delay: 700,
      config: { ...config.wobbly },
    }),
    []
  );

  return (
    <Box id="hero">
      <Box minHeight={{ base: "60vh", md: "100vh" }} bg="outly.main">
        <Box position={"relative"}>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect={"fade"}
            speed={1000}
            modules={[EffectFade, Autoplay]}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            onSlideChangeTransitionStart={() => {
              api.start({
                from: { y: 80, opacity: 0 },
                to: { y: 0, opacity: 1 },
                config: { ...config.wobbly },
              });
            }}
            onSlideChange={() => setCurr(!curr)}
          >
            {heroImages.map((item, index: number) => (
              <SwiperSlide key={index}>
                <Box
                  width="100%"
                  height={"100%"}
                  minHeight={{ base: "60vh", md: "100vh" }}
                  paddingBlock={"300px"}
                  mx="auto"
                  position={"relative"}
                  overflow={"hidden"}
                >
                  <Image
                    src={item.image}
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
                        <animated.div style={trails[0]}>
                          <Text fontSize={"xl"} fontWeight={"medium"}>
                            {item.label.toUpperCase()}
                          </Text>
                        </animated.div>

                        <animated.div style={trails[1]}>
                          <Heading
                            as="h2"
                            mb={3}
                            size={"3xl"}
                            fontWeight={"semibold"}
                            lineHeight={"1.1"}
                          >
                            {item.heading}
                          </Heading>
                        </animated.div>

                        <animated.div style={trails[2]}>
                          <Text
                            fontSize={"xl"}
                            fontWeight={"medium"}
                            pt={2}
                            mb={10}
                          >
                            Explore new-in products and future bestsellers.
                          </Text>
                        </animated.div>

                        <animated.div style={trails[3]}>
                          <Button size={"lg"}>View Collection</Button>
                        </animated.div>
                      </Container>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          <HStack
            spacing={5}
            position={"absolute"}
            zIndex={3}
            left={{ base: "24px", md: "5vw" }}
            bottom={{ base: "30px", md: "80px" }}
            userSelect={"none"}
          >
            <Box
              as="span"
              cursor={"pointer"}
              width={"14px"}
              height={"14px"}
              bg={!curr ? "outly.black" : "outly.main"}
              border={"2px solid black"}
              borderRadius={"50%"}
              transition={"all 0.25s cubic-bezier(0.645,0.045,0.355,1)"}
              onClick={() => swiperRef.current?.slidePrev()}
            />

            <Box
              as="span"
              cursor={"pointer"}
              width={"14px"}
              height={"14px"}
              bg={curr ? "outly.black" : "outly.main"}
              border={"2px solid black"}
              borderRadius={"50%"}
              transition={"all 0.25s cubic-bezier(0.645,0.045,0.355,1)"}
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
