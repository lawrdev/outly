import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeaderImagesProp } from "@/utils";

interface Props {
  headerImages: HeaderImagesProp[];
}

export function Header({ headerImages }: Props) {
  return (
    <Box maxWidth="1480px" mx="auto">
      <Swiper
        effect={"fade"}
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        // onSlideChange={(): void => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {headerImages.map((item, index: number) => (
          <SwiperSlide key={index}>
            {/* <picture>
              <source
                srcSet="https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/header%2Fshop_toys_games2.jpg?alt=media&token=08093ef2-2741-4f69-9128-e65689912f37"
                media="(min-width: 800px)"
              />
              <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
            </picture> */}
            <Box
              width="100%"
              height={{ base: "130px", sm: "220px", md: "300px", xl: "260px" }}
              mx="auto"
              sx={{
                position: "relative",
                overflow: "hidden",
              }}
              visibility={{ base: "hidden", sm: "visible" }}
              display={{ base: "none", sm: "block" }}
            >
              <Image
                src={item.desktop}
                alt="deals outly"
                sizes="(max-width: 1200px) 100vw,
                100vw"
                priority
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
                quality={100}
              />
            </Box>
            <Box
              width="100%"
              height={{ base: "200px" }}
              overflow="none"
              mx="auto"
              sx={{
                position: "relative",
                overflow: "hidden",
              }}
              visibility={{ base: "visible", sm: "hidden" }}
              display={{ base: "block", sm: "none" }}
            >
              <Image
                src={item.mobile}
                alt="deals outly"
                priority
                height={934}
                width={1617}
                quality={100}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
