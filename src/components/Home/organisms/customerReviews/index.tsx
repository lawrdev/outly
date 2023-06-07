import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    review: `I recently discovered Outly and I'm so glad I did! It has quickly become my go-to website for fashion. The selection is great, the prices are affordable, and the quality of the items is amazing. Shipping is fast and easy as well. Outly offers an unbeatable shopping experience all around!`,
    person: "Sarah Okafor",
  },
  {
    review: `Outly has been my go-to website for over a year now. Their selection of clothes and accessories is unbeatable, and they always have the latest trends in stock. I'm also a big fan of their customer service - they're always prompt in resolving any issues I might have. I highly recommend it to everyone!`,
    person: "Alabi Sheyifunmi",
  },
  {
    review: `As a fashion enthusiast, Outly has been my go-to for all my shopping needs. The website is incredibly easy to navigate, the prices are unbeatable, and I always find something new every time I visit. On top of that, they often have amazing sales and discounts. Outly is the best place to shop for fashion online!`,
    person: "Abdul",
  },
];

export function CustomerReviews() {
  return (
    <Box id="cs_review">
      <HStack justifyContent={"center"} pb={7}>
        <Heading as="h3" size={"xl"} fontWeight="medium">
          Customers Reviews
        </Heading>
      </HStack>

      <Box>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
          {reviews?.map((obj, index: number) => (
            <SwiperSlide key={index}>
              <Box maxWidth={"650px"} mx={"auto"} py={10} borderRadius="lg">
                <Text
                  mb={6}
                  textAlign={"center"}
                  fontStyle={"italic"}
                  fontSize={{ base: "lg", lg: "2xl" }}
                >{`" ${obj.review} "`}</Text>

                <Text
                  // fontWeight={"semibold"}
                  textAlign={"center"}
                  fontSize={{ base: "lg", lg: "xl" }}
                >
                  {`- ${obj.person}`}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
