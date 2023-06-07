import { useState, useRef } from "react";
import { Box, Heading, HStack, IconButton } from "@chakra-ui/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {
  Swiper as SwiperType,
  // EffectFade,
  // Navigation,
  // Pagination,
  // Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { CategoryProp } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  categoryItems: Array<CategoryProp>;
}
export function ShopByCategory({ categoryItems }: Props) {
  const swiperRef = useRef<SwiperType>();
  const router = useRouter();

  return (
    <Box>
      <HStack justifyContent={"space-between"} my={10}>
        <Heading as="h2" size={"lg"}>
          Shop by Category
        </Heading>

        <HStack spacing={5}>
          <IconButton
            variant={"outline"}
            _hover={{ bg: "outly.sec" }}
            borderRadius={"50%"}
            aria-label="previous"
            icon={<GrFormPrevious />}
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <IconButton
            variant={"outline"}
            borderRadius={"50%"}
            _hover={{ bg: "outly.sec" }}
            aria-label="next"
            icon={<GrFormNext />}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </HStack>
      </HStack>

      <Box>
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          rewind={true}
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {categoryItems.map((item, index: number) => (
            <SwiperSlide
              key={index}
              style={{
                width: "100%",
                maxWidth: "270px",
                height: "100%",
                maxHeight: "420px",
                overflow: "hidden",
              }}
            >
              <Link
                href={
                  item.isFiltered
                    ? {
                        pathname: `/category/${item.isFilteredCategory}`,
                        query: { ...router.query, filter: item.category },
                      }
                    : `/category/${item.category}`
                }
                passHref={item.isFiltered}
                shallow
                replace={item.isFiltered}
              >
                <Box
                  width="100%"
                  height={"100%"}
                  position={"relative"}
                  role="group"
                >
                  <Box
                    width="100%"
                    height={"100%"}
                    paddingBlock={"210px"}
                    mx="auto"
                    position={"relative"}
                    overflow={"hidden"}
                    _groupHover={{ transform: "scale(1.1)" }}
                    cursor={"pointer"}
                    transition={"all 0.6s ease 0s"}
                    // transition={"all 0.8s cubic-bezier(0.645,0.045,0.355,1) 0s"}
                  >
                    <Image
                      src={item.images[0]}
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
                  </Box>

                  <Box
                    position={"absolute"}
                    bottom={0}
                    left={"50%"}
                    transform={"translateX(-50%)"}
                    my={10}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Heading
                      as={"h5"}
                      width={"150px"}
                      size={"md"}
                      bg={"gray.50"}
                      py={3}
                      cursor={"pointer"}
                      borderRadius={"md"}
                      fontWeight={"medium"}
                      textAlign={"center"}
                    >{`${item.category} (${item.quantity})`}</Heading>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
