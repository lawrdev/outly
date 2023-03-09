import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface Props {
  images: string[];
}
export function CardSwiper({ images }: Props) {
  return (
    <Box bg="white" className="c_swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {images?.map((img, index: number) => (
          <SwiperSlide key={index}>
            <Box bg="white" py={5} borderRadius="lg">
              <Box
                position="relative"
                style={{ height: "150px", width: "100%" }}
              >
                <Image
                  alt="product"
                  style={{
                    objectFit: "contain",
                    objectPosition: "top",
                  }}
                  src={img}
                  fill
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
