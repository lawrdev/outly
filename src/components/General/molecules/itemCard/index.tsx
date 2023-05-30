import { useState } from "react";
import { FormatPrice, ItemProp } from "@/utils";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useSpring, animated, config } from "@react-spring/web";
import { Appear } from "../../atoms";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { cartAtom } from "@/recoil";
import { increaseItemQuantity } from "@/functions";
import { addItemToWishlist } from "@/functions/wishlist";
import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { VscGitCompare } from "react-icons/vsc";
import { RiArrowLeftRightLine } from "react-icons/ri";

interface Props {
  item: ItemProp;
}
export function ItemCard({ item }: Props) {
  const [currColorImage, setCurrColorImage] = useState<string | null>(null);

  const setCartAtomValue = useSetRecoilState(cartAtom);
  const router = useRouter();
  const toast = useToast();

  const handleColorChange = (clr: string) => {
    setCurrColorImage(clr);
  };

  return (
    <Appear>
      <Box data-aos="fade-up">
        <Box
          mb={"16px"}
          p={0.5}
          boxShadow="inset 0px 0px 3px rgba(0, 0, 0, 0.15)"
        >
          <Box
            bg="outtly.bg"
            height={"100%"}
            width={"100%"}
            display={"flex"}
            flexDirection="column"
            justifyContent={"end"}
            position={"relative"}
            zIndex={1}
            overflow="hidden"
            role="group"
            cursor={"pointer"}
          >
            {/* first image */}
            <Box
              // height={"100%"}
              // maxHeight={330}
              _groupHover={{
                visibility: "hidden",
                opacity: 0,
              }}
              transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
            >
              <Image
                src={currColorImage ? currColorImage : item.images[0]}
                alt={item.title}
                title={item.title}
                width={270}
                height={350}
                style={{
                  transform: "scale(1.1)",
                  minWidth: "100%",
                }}
                sizes={"(max-width: 1200px) 100vw, 100vw"}
                quality={100}
              />
            </Box>

            {/* Second image */}
            <Box
              position={"absolute"}
              zIndex={2}
              visibility={"hidden"}
              height={"100%"}
              top={"20px"}
              left={0}
              right={0}
              opacity={0}
              _groupHover={{
                visibility: "visible",
                opacity: 1,
                top: "0px",
              }}
              transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
            >
              <Image
                src={item.images[1]}
                alt={item.title}
                title={item.title}
                sizes={"(max-width: 1200px) 100vw, 100vw"}
                width={270}
                height={350}
                quality={100}
                style={{
                  minWidth: "100%",
                }}
              />
            </Box>

            {/* right menu */}
            <Box
              position={"absolute"}
              zIndex={3}
              top={0}
              right={0}
              visibility={{ base: "visible", md: "hidden" }}
              opacity={{ base: 1, md: 0 }}
              transform={{
                base: "translateX(0)",
                md: "translateX(100%)",
              }}
              _groupHover={{
                visibility: "visible",
                opacity: 1,
                transform: "translateX(0)",
              }}
              transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
            >
              <VStack pt={3} pr={2} spacing={{ base: 0, md: 3 }}>
                <Tooltip label="Quick view" placement="left" hasArrow>
                  <IconButton
                    display={{ base: "none", md: "inline-flex" }}
                    bg="white"
                    color={"black"}
                    aria-label="Search"
                    minW={"0px"}
                    height={"fit-content"}
                    p={"10px"}
                    borderRadius={"50%"}
                    icon={<BiSearch fontSize={"16px"} />}
                    boxShadow={"xl"}
                  />
                </Tooltip>

                <Tooltip label="Add to Wishlist" placement="left" hasArrow>
                  <IconButton
                    bg="white"
                    color={"black"}
                    aria-label="Wishlist"
                    minW={"0px"}
                    height={"fit-content"}
                    p={"10px"}
                    borderRadius={"50%"}
                    icon={<AiOutlineHeart fontSize={"16px"} />}
                    boxShadow={"xl"}
                    onClick={() => {
                      addItemToWishlist(item._id);
                      toast({
                        title: item.title,
                        description: "has been added to your wishlist!",
                      });
                    }}
                  />
                </Tooltip>

                <Tooltip label="Compare" placement="left" hasArrow>
                  <IconButton
                    display={{ base: "none", md: "inline-flex" }}
                    bg="white"
                    color={"black"}
                    aria-label="Search"
                    minW={"0px"}
                    height={"fit-content"}
                    p={"10px"}
                    borderRadius={"50%"}
                    icon={<RiArrowLeftRightLine fontSize={"16px"} />}
                    boxShadow={"xl"}
                  />
                </Tooltip>
              </VStack>
            </Box>

            {/* bottom menu */}
            <Box
              position={"absolute"}
              zIndex={3}
              bottom={0}
              left={0}
              right={0}
              visibility={{ base: "visible", md: "hidden" }}
              opacity={{ base: 1, md: 0 }}
              transform={{
                base: "translateY(0)",
                xl: "translateY(100%)",
              }}
              _groupHover={{
                visibility: "visible",
                opacity: 1,
                transform: "translateY(0)",
              }}
              transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
            >
              {item.colors ? (
                <Button
                  width={"100%"}
                  borderRadius={"none"}
                  _hover={{ bg: "outly.main900" }}
                  onClick={() => {
                    router.push(`/item/${item._id}`);
                  }}
                >
                  Pick an Option
                </Button>
              ) : (
                <Button
                  width={"100%"}
                  borderRadius={"none"}
                  _hover={{ bg: "outly.main900" }}
                  onClick={() => {
                    if (item.outOfStock) {
                      router.push(`/item/${item._id}`);
                    } else {
                      setCartAtomValue(increaseItemQuantity(item._id));
                      toast({
                        title: `${item?.title}`,
                        description: "has been added to your cart",
                        status: "success",
                        variant: "product",
                        icon: item?.images[0],
                      });
                    }
                  }}
                >
                  Quick Add
                </Button>
              )}
            </Box>

            {item.discount || item.hot ? (
              <VStack
                spacing={"6px"}
                alignItems={"flex-start"}
                position={"absolute"}
                zIndex={3}
                top={0}
                left={0}
                mt={3}
              >
                {item.discount ? (
                  <Box>
                    <Text
                      color="white"
                      bg="outly.main900"
                      px={4}
                      fontSize={"md"}
                    >
                      {`-${item.discount}%`}
                    </Text>
                  </Box>
                ) : null}

                {item.hot ? (
                  <Box>
                    <Text color="white" bg="outly.red" px={4} fontSize={"md"}>
                      Hot
                    </Text>
                  </Box>
                ) : null}
              </VStack>
            ) : null}
          </Box>
        </Box>

        <Box textAlign={"start"}>
          <Text
            fontSize={"lg"}
            fontWeight={"medium"}
            mb={1}
            onClick={() => {
              router.push(`/item/${item._id}`);
            }}
            display={"inline-block"}
            position={"relative"}
            cursor={"pointer"}
            _hover={{ color: "outly.main900" }}
            transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1)"}
          >
            {item.title}
          </Text>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {<FormatPrice price={item.price} />}
          </Text>
        </Box>

        {item.colors && item.colors?.length > 1 ? (
          <HStack mt={2}>
            {item.colors.map((op, index) => (
              <Box
                key={index}
                cursor={"pointer"}
                borderWidth={2}
                borderRadius={"50%"}
                p={0.5}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                borderColor={
                  currColorImage === op.image ? "outly.black" : "gray.300"
                }
                onClick={() => handleColorChange(op.image)}
              >
                <Box p={3} bg={op.hex} borderRadius={"50%"} />
              </Box>
            ))}
          </HStack>
        ) : null}
      </Box>
    </Appear>
  );
}

export function ItemCardSkeleton() {
  const springStyles = useSpring({
    from: { x: 50 },
    to: { x: 0 },

    delay: 0,

    config: config.slow,
  });

  return (
    <animated.div style={{ ...springStyles }}>
      <Box width={"100%"} pt={"14px"}>
        <VStack width={"100%"} alignItems={"flex-start"}>
          <Skeleton height="250px" />
          <Skeleton width={"80%"} />
          <Skeleton width={"40%"} />
        </VStack>
      </Box>{" "}
    </animated.div>
  );
}
