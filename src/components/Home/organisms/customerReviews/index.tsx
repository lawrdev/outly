import { Avatar, Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Rating } from "@/components/General/atoms";

const reviews = [
  {
    review: `I recently discovered Outly and I'm so glad I did! It has quickly become my go-to website for fashion. The selection is great, the prices are affordable, and the quality of the items is amazing.`,
    person: "May Adeola",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416038/Outly/socialImages/pexels-wayne-fotografias-13729705_wue2dq.jpg",
  },
  {
    review: `Outly's shipping is fast and easy  to setup as well. Outly offers an unbeatable shopping experience all around! I'm also a big fan of their customer service. Prices are great as well, I highly recommend`,
    person: "Stanley Uko",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416034/Outly/socialImages/pexels-cottonbro-studio-6626876_dkqck1.jpg",
  },
  {
    review: `As a fashion enthusiast, Outly has been my go-to for all my shopping needs. The website is incredibly easy to navigate, the prices are unbeatable, and I always find something new every time I visit.`,
    person: "Ella Lee",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688422177/Outly/socialImages/pexels-arina-krasnikova-7752570_nbdalz.jpg",
  },
  {
    review: `I recently discovered Outly and I'm so glad I did! It has quickly become my go-to website for fashion. The selection is great, the prices are affordable, and the quality of the items is amazing.`,
    person: "May Adeola",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416038/Outly/socialImages/pexels-wayne-fotografias-13729705_wue2dq.jpg",
  },
  {
    review: `Outly's shipping is fast and easy  to setup as well. Outly offers an unbeatable shopping experience all around! I'm also a big fan of their customer service. Prices are great as well, I highly recommend`,
    person: "Stanley Uko",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416034/Outly/socialImages/pexels-cottonbro-studio-6626876_dkqck1.jpg",
  },
  {
    review: `As a fashion enthusiast, Outly has been my go-to for all my shopping needs. The website is incredibly easy to navigate, the prices are unbeatable, and I always find something new every time I visit.`,
    person: "Ella Lee",
    img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688422177/Outly/socialImages/pexels-arina-krasnikova-7752570_nbdalz.jpg",
  },
];

export function CustomerReviews() {
  return (
    <Box id="cs_review">
      <HStack mb={4} justifyContent={"center"} pb={4}>
        <Heading as="h3" size={"xl"} fontWeight={500}>
          Customers Reviews
        </Heading>
      </HStack>

      <Box>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          style={{ paddingBottom: "40px", paddingRight: "6px" }}
        >
          {reviews?.map((obj, index: number) => (
            <SwiperSlide key={index}>
              <Box
                width={"360px"}
                p={"40px"}
                border={"1px solid #ddd"}
                borderRadius="lg"
                // boxShadow={"md"}
              >
                <Box mb={6}>
                  <Rating value={5} />
                </Box>

                <Text mb={6} fontSize={"lg"} color={"outly.black400"}>
                  {obj.review}
                </Text>

                <HStack>
                  <Avatar src={obj.img} name={obj.person} />

                  <Text fontSize={"sm"} fontWeight={500}>
                    {obj.person}
                  </Text>
                </HStack>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
