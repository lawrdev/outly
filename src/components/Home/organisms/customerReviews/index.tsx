import { Avatar, Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Rating } from "@/components/General/atoms";

const reviews = [
  {
    cards: [
      {
        review: `Outly is a game-changer in eCommerce. With a sleek interface and diverse products, it's a shopper's paradise. Quick customer support, secure checkout, and fast shipping make it my go-to online destination.`,
        person: "May Adeola",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416038/Outly/socialImages/pexels-wayne-fotografias-13729705_wue2dq.jpg",
      },
      {
        review: `Outly exceeds expectations in eCommerce. User-friendly interface, vast product selection, and attentive customer service make shopping a breeze. Secure checkout and swift shipping ensure a seamless experience.`,
        person: "Stanley Uko",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416034/Outly/socialImages/pexels-cottonbro-studio-6626876_dkqck1.jpg",
      },
      {
        review: `"Outly revolutionizes online shopping. Sleek design, comprehensive products, and excellent customer service make it my preferred choice. Secure checkout and efficient shipping guarantee a hassle-free experience.`,
        person: "Ella Lee",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688422177/Outly/socialImages/pexels-arina-krasnikova-7752570_nbdalz.jpg",
      },
    ],
  },
  {
    cards: [
      {
        review: `"Outly revolutionizes online shopping. Sleek design, comprehensive products, and excellent customer service make it my preferred choice. Secure checkout and efficient shipping guarantee a hassle-free experience.`,
        person: "Ella Lee",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688422177/Outly/socialImages/pexels-arina-krasnikova-7752570_nbdalz.jpg",
      },
      {
        review: `Outly exceeds expectations in eCommerce. User-friendly interface, vast product selection, and attentive customer service make shopping a breeze. Secure checkout and swift shipping ensure a seamless experience.`,
        person: "Stanley Uko",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416034/Outly/socialImages/pexels-cottonbro-studio-6626876_dkqck1.jpg",
      },
      {
        review: `Outly is a game-changer in eCommerce. With a sleek interface and diverse products, it's a shopper's paradise. Quick customer support, secure checkout, and fast shipping make it my go-to online destination.`,
        person: "May Adeola",
        img: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688416038/Outly/socialImages/pexels-wayne-fotografias-13729705_wue2dq.jpg",
      },
    ],
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
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          style={{ paddingBottom: "40px" }}
        >
          {reviews?.map((obj, index: number) => (
            <SwiperSlide key={index}>
              <HStack
                px={4}
                spacing={10}
                justifyContent={"center"}
                alignItems={"flex-start"}
              >
                {obj.cards.map((card, i: number) => (
                  <Box
                    key={i}
                    display={{
                      base: i === 0 ? "block" : "none",
                      md: i === 2 ? "none" : "block",
                      xl: "block",
                    }}
                    maxWidth={"360px"}
                    minWidth={"312px"}
                    flex={1}
                    p={"40px"}
                    borderTop={"1px solid #eee"}
                    borderRadius="lg"
                    boxShadow={"md"}
                  >
                    <Box mb={6}>
                      <Rating value={5} />
                    </Box>

                    <Text
                      mb={6}
                      fontSize={"lg"}
                      color={"outly.black400"}
                      noOfLines={6}
                    >
                      {card.review}
                    </Text>

                    <HStack>
                      <Avatar src={card.img} name={card.person} />

                      <Text fontSize={"sm"} fontWeight={500}>
                        {card.person}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </HStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
