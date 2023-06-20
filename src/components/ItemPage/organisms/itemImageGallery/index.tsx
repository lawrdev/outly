import { ItemProp } from "@/utils";
import {
  Box,
  HStack,
  IconButton,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

interface Props {
  item: ItemProp;
  hidePreview?: boolean;
}

export function ItemImageGallery(props: Props) {
  const [imgArr, setImgArr] = useState(props.item?.images);
  const [currImage, setCurrImage] = useState(0);

  const swiperRef = useRef<SwiperType>();
  const swiperRef2 = useRef<SwiperType>();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    setImgArr(props.item.images);
  }, [props.item]);

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      userSelect={"none"}
      position="relative"
      float={"none"}
      width={"inherit"}
    >
      {/* PREVIEW SWIPER */}
      {!props.hidePreview ? (
        <Box
          flexBasis={"100px"}
          maxWidth={"100px"}
          display={{ base: "none", md: "block" }}
        >
          <Box
            width={"100%"}
            height={"full"}
            position={"relative"}
            role={"group"}
          >
            <Box
              position={"absolute"}
              zIndex={2}
              top={"32px"}
              left={"50%"}
              transform={`translateX(-50%)`}
            >
              <SwiperButton direction={"top"} atLimit={atStart} />
            </Box>

            {/* PREVIEW SWIPER */}
            <Box>
              <Swiper
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                direction={"vertical"}
                navigation={{
                  nextEl: ".item-button-next",
                  prevEl: ".item-button-prev",
                }}
                modules={[Navigation]}
                slidesPerView={5}
                spaceBetween={15}
                speed={750}
                rewind={true}
                onSlideChange={() => {
                  if (swiperRef.current) {
                    setAtStart(swiperRef.current?.isBeginning);
                    setAtEnd(swiperRef.current?.isEnd);
                    swiperRef2.current?.slideTo(swiperRef.current.activeIndex);
                  }
                }}
                style={{
                  height: "690px",
                  width: "100%",
                  overflow: "hidden",
                  paddingBlockEnd: "4px",
                }}
              >
                {imgArr.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      setCurrImage(index);
                      if (swiperRef.current) {
                        swiperRef2.current?.slideTo(
                          swiperRef.current?.clickedIndex
                        );
                        swiperRef.current.slideTo(
                          swiperRef.current?.clickedIndex
                        );
                      }
                    }}
                  >
                    <Box
                      position={"relative"}
                      borderWidth={1.5}
                      borderColor={
                        currImage === index ? "brand.400" : "gray.100"
                      }
                      borderRadius={"md"}
                      overflow={"hidden"}
                      cursor="pointer"
                      className="active:scale-95"
                      // boxShadow={
                      //   currImage === img
                      //     ? "0 0 4px 2px rgb(209, 156, 104, .5);"
                      //     : "inset 0px 0px 3px rgba(0, 0, 0, 0.15)"
                      // }
                      transition={`all .25s ease 0.25s`}
                      // onClick={() => setCurrImage(img)}
                    >
                      <Box position="relative" overflow="hidden">
                        <Image
                          src={img}
                          alt="item"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "auto",
                          }}
                          sizes={"(max-width: 1000px) 100vw, 100vw"}
                          width={96}
                          height={124}
                          // fill
                        />
                      </Box>

                      <Box
                        position={"absolute"}
                        bg={"white"}
                        opacity={currImage === index ? 0 : 0.5}
                        borderRadius={"md"}
                        transition={`all .25s cubic-bezier(.645,.045,.355,1) 0.25s`}
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        zIndex={1}
                      ></Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <Box
              position={"absolute"}
              zIndex={2}
              bottom={"32px"}
              left={"50%"}
              transform={`translateX(-50%)`}
            >
              <SwiperButton direction={"down"} atLimit={atEnd} />
            </Box>
          </Box>
        </Box>
      ) : null}

      {/* MAIN SWIPER */}
      <Box
        flexBasis={{
          base: "100%",
          md: props.hidePreview ? "100%" : "calc(100% - 110px)",
        }}
        maxWidth={{
          base: "100%",
          md: props.hidePreview ? "100%" : "calc(100% - 110px)",
        }}
        position={"relative"}
        // height={{ base: "calc(100vh - 7.0rem)", md: "auto" }}
      >
        <Box
          position={"relative"}
          height={"100%"}
          role={"group"}
          overflow={"hidden"}
        >
          <Box
            display={{ base: "none", md: "block" }}
            position={"absolute"}
            zIndex={2}
            top={"50%"}
            left={props.hidePreview ? "40px" : "-48px"}
            transform={`translateY(-50%)`}
            _groupHover={{
              left: "40px",
            }}
            transition={`all .35s ease-in-out .25s`}
          >
            <SwiperButton direction={"left"} hidePreview={props.hidePreview} />
          </Box>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef2.current = swiper;
            }}
            direction={"horizontal"}
            navigation={{
              nextEl: ".item-button-next2",
              prevEl: ".item-button-prev2",
            }}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            speed={1050}
            rewind={true}
            onSlideChange={() => {
              if (swiperRef2.current) {
                setCurrImage(swiperRef2.current.realIndex);
                swiperRef.current?.slideTo(swiperRef2.current.activeIndex);
              }
            }}
            style={{
              height: "100%",
              width: "100%",
              overflow: "hidden",
              paddingBlockEnd: "2px",
              // backgroundColor: "#F6F6F6",
            }}
          >
            {imgArr.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  display={{ base: "none", md: "block" }}
                  position="relative"
                  overflow="hidden"
                  width="100%"
                  height={{
                    base: "auto",
                    md: props.hidePreview ? "calc(100vh - 7.5rem)" : "100%",
                  }}
                  borderRadius="lg"
                  bg={props.hidePreview ? "outly.bg" : "inherit"}
                >
                  <Image
                    src={img}
                    alt="item"
                    style={{
                      objectFit: props.hidePreview ? "contain" : "cover",
                      objectPosition: "top",
                      minWidth: "100%",
                    }}
                    sizes={
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33100vw"
                    }
                    quality={100}
                    fill
                    priority
                  />
                </Box>

                {/* mobile */}
                <Box
                  display={{ base: "block", md: "none" }}
                  position="relative"
                  overflow="hidden"
                  width="100%"
                  height={"auto"}
                  borderRadius="lg"
                >
                  <Image
                    src={img}
                    alt="item"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                      minWidth: "100%",
                    }}
                    quality={100}
                    width={570}
                    height={752}
                    priority
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          <Box
            display={{ base: "none", md: "block" }}
            position={"absolute"}
            zIndex={2}
            top={"50%"}
            right={props.hidePreview ? "48px" : "-48px"}
            transform={`translateY(-50%)`}
            _groupHover={{
              right: "48px",
            }}
            transition={`all .35s ease-in-out .25s`}
          >
            <SwiperButton direction={"right"} hidePreview={props.hidePreview} />
          </Box>

          {/* hot / discount */}
          {!props.item.hot && props.item.discount ? (
            <Box position={"absolute"} zIndex={2} top={"14px"} left={0}>
              <Text
                color="white"
                bg="outly.main900"
                px={4}
                // py={1}
                fontSize={"lg"}
              >
                {`-${props.item.discount}%`}
              </Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export function ItemImageGallerySkeleton() {
  return (
    <HStack
      alignItems={"flex-start"}
      spacing={{ base: "0px", md: "18px" }}
      width={"100%"}
      pt={"20px"}
    >
      <VStack
        spacing={3}
        width={"110px"}
        display={{ base: "none", md: "flex" }}
      >
        <Skeleton borderRadius={"md"} height={"124px"} />
        <Skeleton borderRadius={"md"} height={"124px"} />
      </VStack>

      <Skeleton borderRadius={"md"} height={"420px"} />
    </HStack>
  );
}

export const SwiperButton = ({
  direction,
  atLimit,
  hidePreview,
}: {
  direction: "top" | "down" | "left" | "right";
  atLimit?: boolean;
  hidePreview?: boolean;
}) => {
  return (
    <IconButton
      className={`!cursor-pointer ${
        direction === "top"
          ? "item-button-prev"
          : direction === "down"
          ? "item-button-next"
          : direction === "left"
          ? "item-button-prev2"
          : "item-button-next2"
      }`}
      variant={"ghost"}
      _active={{ transform: "" }}
      aria-label={"previous"}
      color={"white"}
      fill={"black"}
      icon={
        direction === "top" ? (
          <IoIosArrowDropupCircle />
        ) : direction === "down" ? (
          <IoIosArrowDropdownCircle />
        ) : direction === "left" ? (
          <IoIosArrowDropleftCircle />
        ) : (
          <IoIosArrowDroprightCircle />
        )
      }
      fontSize={direction === "left" || direction === "right" ? "52px" : "32px"}
      opacity={direction === "left" || direction === "right" ? 1 : 0.5}
      visibility={hidePreview ? "visible" : "hidden"}
      _hover={{
        fill: direction === "left" || direction === "right" ? "black" : "white",
        color:
          direction === "left" || direction === "right" ? "black" : "white",
      }}
      _groupHover={{
        opacity: atLimit ? 0.6 : 1,
        visibility: "visible",
        transition:
          "all .25s cubic-bezier(.645,.045,.355,1),visibility 1.25s linear .2s,opacity .25s linear .2s",
      }}
      transition={
        "all .25s cubic-bezier(.645,.045,.355,1),visibility .25s linear 3s,opacity .25s linear .25s"
      }
    />
  );
};
