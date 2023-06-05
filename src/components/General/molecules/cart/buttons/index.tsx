import { useState, useMemo, useRef, useEffect } from "react";
import {
  addItemToWishlist,
  decreaseItemQuantity,
  getCart,
  increaseItemQuantity,
  removeItemFromWishlist,
} from "@/functions";
import { cartAtom } from "@/recoil";
import { ItemProp } from "@/utils";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineHeart } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import { BoxLoader } from "@/components/General/atoms";
import { TfiCheck } from "react-icons/tfi";

export function CartButtons({
  onClick,
  showButtons,
  showWishlist,
  item,
  size = "md",
}: {
  item: ItemProp;
  size?: "sm" | "md";
  showButtons?: boolean;
  showWishlist?: boolean;
  onClick?: () => void;
}) {
  const [toggle, setToggle] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const timerRef = useRef<any | null>(null);

  const boxloaderDisclosure = useDisclosure();
  const setCartAtomValue = useSetRecoilState(cartAtom);
  const cart = getCart();
  const toast = useToast();

  const getItemQuantity = useMemo((): number => {
    let itemAvaliable = [...cart].filter((x) => x.id === item._id);

    if (itemAvaliable.length > 0) return itemAvaliable[0].quantity;
    return 0;
  }, [cart, item._id]);

  // clear timeout Unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <BoxLoader disclosure={boxloaderDisclosure} rest={{ width: "full" }}>
      <HStack spacing={3}>
        <HStack
          borderWidth={"1px"}
          borderColor={"#ddd"}
          userSelect={"none"}
          borderRadius={"sm"}
        >
          <Box
            p={size === "sm" ? "8px" : "12px"}
            cursor={"pointer"}
            _hover={{ color: "outly.main900" }}
            transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
            onClick={() => {
              onClick && onClick();
              setCartAtomValue(decreaseItemQuantity(item._id));
            }}
          >
            {<AiOutlineMinus />}
          </Box>

          <Text
            width={"38px"}
            fontWeight={500}
            display={"inline-flex"}
            justifyContent={"center"}
          >
            {getItemQuantity}
          </Text>

          <Box
            p={size === "sm" ? "8px" : "12px"}
            cursor={"pointer"}
            _hover={{ color: "outly.main900" }}
            transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
            onClick={() => {
              setCartAtomValue(increaseItemQuantity(item._id));
              onClick && onClick();
            }}
          >
            {<AiOutlinePlus />}
          </Box>
        </HStack>

        {showButtons || showWishlist ? (
          <HStack width={"full"}>
            {showButtons ? (
              <Button
                fontSize={"sm"}
                px={"21px"}
                size={size}
                onClick={() => {
                  setCartAtomValue(increaseItemQuantity(item._id));
                  toast({
                    title: `${item?.title}`,
                    description: "has been added to your cart",
                    status: "success",
                    variant: "product",
                    icon: item?.images[0],
                  });
                }}
              >
                Add to cart
              </Button>
            ) : null}
            {!showWishlist ? (
              <Button
                size={size}
                fontSize={"sm"}
                px={"26px"}
                colorScheme={"appMain"}
              >
                <Link href={"/checkout"}>Buy Now</Link>
              </Button>
            ) : null}

            {showWishlist ? (
              <IconButton
                variant={"ghost"}
                px={0}
                aria-label={"wishlist"}
                fontSize={size === "sm" ? "20px" : "26px"}
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
                        description: "has been removed from your wishlist!",
                      });
                    }
                  }, 2000);
                }}
                icon={
                  isInWishlist ? (
                    <TfiCheck fontSize={"16px"} />
                  ) : (
                    <AiOutlineHeart fontSize={"16px"} />
                  )
                }
              />
            ) : null}
          </HStack>
        ) : null}
      </HStack>
    </BoxLoader>
  );
}
