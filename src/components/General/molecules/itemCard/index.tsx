import { useState, useEffect, useRef } from "react";
import { FormatPrice, ItemProp } from "@/utils";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Appear, BoxLoader } from "../../atoms";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, wishlistAtom } from "@/recoil";
import { increaseItemQuantity } from "@/functions";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/functions/wishlist";
import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { TfiCheck } from "react-icons/tfi";
import { CustomModal } from "../modal";
import { ItemDetails, ItemImageGallery } from "@/components/ItemPage/organisms";

interface Props {
  item: ItemProp;
  isDrawer?: boolean;
}
export function ItemCard({ item, isDrawer }: Props) {
  const [currColorImage, setCurrColorImage] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const timerRef = useRef<any | null>(null);

  const setCartAtomValue = useSetRecoilState(cartAtom);
  const router = useRouter();
  const toast = useToast();
  const boxloaderDisclosure = useDisclosure();
  const quickViewDisclosure = useDisclosure();

  const handleColorChange = (clr: string) => {
    setCurrColorImage(clr);
  };

  const wishListValue = useRecoilValue(wishlistAtom);

  useEffect(() => {
    if (wishListValue.length > 0) {
      let isPresent = [...wishListValue].find((x) => x.id === item._id);

      setIsInWishlist(!!isPresent);
    }
  }, [wishListValue, item]);

  // clear timeout Unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <Appear>
        <Box data-aos={isDrawer ? "" : "fade-up"}>
          <Box
            mb={"6px"}
            position={"relative"}
            // boxShadow="inset 0px 0px 3px rgba(0, 0, 0, 0.15)"
          >
            <BoxLoader
              disclosure={boxloaderDisclosure}
              rest={{ width: "full" }}
            >
              <Box
                bg="outtly.bg"
                minHeight={"200%"}
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
                    width={589}
                    height={756}
                    style={{
                      // transform: "scale(1.1)",
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
                    // width={270}
                    // height={350}
                    width={589}
                    height={756}
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
                        onClick={() => {
                          quickViewDisclosure.onOpen();
                        }}
                      />
                    </Tooltip>

                    <Tooltip
                      label={
                        isInWishlist
                          ? "Remove from wishlist"
                          : "Add to Wishlist"
                      }
                      placement="left"
                      hasArrow
                    >
                      <IconButton
                        bg="white"
                        color={"black"}
                        aria-label="Wishlist"
                        minW={"0px"}
                        height={"fit-content"}
                        p={"10px"}
                        borderRadius={"50%"}
                        icon={
                          isInWishlist ? (
                            <TfiCheck fontSize={"16px"} />
                          ) : (
                            // <AiFillHeart fontSize={"16px"} />
                            <AiOutlineHeart fontSize={"16px"} />
                          )
                        }
                        boxShadow={"xl"}
                        onClick={() => {
                          boxloaderDisclosure.onOpen();
                          timerRef.current = setTimeout(() => {
                            boxloaderDisclosure.onClose();

                            if (!isInWishlist) {
                              addItemToWishlist(item._id);
                              setIsInWishlist(true);
                              toast({
                                title: item.title,
                                status: "success",
                                description: "has been added to your wishlist!",
                              });
                            } else {
                              removeItemFromWishlist(item._id);
                              setIsInWishlist(false);
                              toast({
                                title: item.title,
                                description:
                                  "has been removed from your wishlist!",
                              });
                            }
                          }, 2000);
                        }}
                      />
                    </Tooltip>

                    <Tooltip
                      label="Compare with another item"
                      placement="left"
                      hasArrow
                    >
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
              </Box>
            </BoxLoader>

            {item.discount || item.hot ? (
              <VStack
                spacing={"6px"}
                alignItems={"flex-start"}
                position={"absolute"}
                zIndex={20}
                top={0}
                left={"-8px"}
                mt={3}
              >
                {item.discount ? (
                  <Box bg={"#f0000000"}>
                    <Text
                      borderTopLeftRadius={"5px"}
                      color="white"
                      bg="outly.main900"
                      fontSize={"sm"}
                      px={4}
                      lineHeight={"24px"}
                      background={`linear-gradient(rgba(0, 0, 0, 0.5) 0 0) bottom/100% 6px
                      no-repeat #C8815F`}
                      className={"__ribbonClip"}
                    >
                      {`-${item.discount}%`}
                    </Text>
                  </Box>
                ) : null}

                {item.hot && !item.discount ? (
                  <Box bg={"#f0000000"}>
                    <Text
                      borderTopLeftRadius={"5px"}
                      color="white"
                      bg="outly.red"
                      fontSize={"sm"}
                      px={4}
                      lineHeight={"24px"}
                      background={`linear-gradient(rgba(0, 0, 0, 0.5) 0 0) bottom/100% 6px
                      no-repeat #ed0006`}
                      className={"__ribbonClip"}
                    >
                      Hot
                    </Text>
                  </Box>
                ) : null}
              </VStack>
            ) : null}
          </Box>

          <Box textAlign={"start"}>
            <Text
              fontSize={"md"}
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
            <Text fontSize={"md"} fontWeight={"medium"}>
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

      <CustomModal
        disclosure={quickViewDisclosure}
        // @ts-ignore
        modalProps={{ size: "5xl" }}
        modalOverlay={{
          bg: "blackAlpha.300",
          backdropFilter: "blur(10px) hue-rotate(90deg)",
        }}
      >
        <Box width={"100%"}>
          <HStack w={"full"} alignItems={"flex-start"}>
            <Box flexBasis={"50%"} maxW={"50%"}>
              <ItemImageGallery item={item} hidePreview />
            </Box>

            <Box
              flexBasis={"50%"}
              maxW={"50%"}
              pt={"0.5rem"}
              px={"32px"}
              overflowY={"scroll"}
              className={"thinSB"}
              height={"calc(100vh - 8.0rem)"}
            >
              <ItemDetails item={item} />
            </Box>
          </HStack>
        </Box>
      </CustomModal>
    </>
  );
}

export function ItemCardSkeleton() {
  return (
    <Box width={"100%"} pt={"14px"}>
      <VStack width={"100%"} alignItems={"flex-start"}>
        <Skeleton height="290px" />
        <Skeleton width={"80%"} />
        <Skeleton width={"40%"} />
      </VStack>
    </Box>
  );
}
