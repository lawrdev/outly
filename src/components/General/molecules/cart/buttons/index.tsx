import { useState, useMemo } from "react";
import {
  decreaseItemQuantity,
  getCart,
  increaseItemQuantity,
} from "@/functions";
import { cartAtom } from "@/recoil";
import { ItemProp } from "@/utils";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
// import { useRouter } from "next/router";

export function CartButtons({
  onClick,
  showButtons,
  showWishlist,
  item,
}: {
  item: ItemProp;
  showButtons?: boolean;
  showWishlist?: boolean;
  onClick?: () => void;
}) {
  const [toggle, setToggle] = useState(false);
  const setCartAtomValue = useSetRecoilState(cartAtom);
  const cart = getCart();
  const toast = useToast();
  // const router = useRouter();

  //   console.log("we haveeeeeee", itemID);

  const getItemQuantity = useMemo((): number => {
    let itemAvaliable = [...cart].filter((x) => x.id === item._id);

    if (itemAvaliable.length > 0) return itemAvaliable[0].quantity;
    return 0;
  }, [cart, item._id]);

  return (
    <HStack spacing={3}>
      <HStack
        borderWidth={"1px"}
        borderColor={"#ddd"}
        userSelect={"none"}
        borderRadius={"sm"}
      >
        <Box
          p={"12px"}
          cursor={"pointer"}
          _hover={{ color: "outly.main900" }}
          transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
          onClick={() => {
            onClick && onClick();

            // if (cartAtomValue.find((x) => x?.id === item._id) != null) {
            //   const p = cartAtomValue.find((x) => x?.id === item._id);
            //   if (p?.quantity === 1) {
            //     router.reload();
            //   }
            // }

            setCartAtomValue(decreaseItemQuantity(item._id));
          }}
        >
          {<AiOutlineMinus />}{" "}
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
          p={"12px"}
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

      {showButtons ? (
        <HStack width={"full"}>
          <Button
            fontSize={"sm"}
            px={"21px"}
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
          {!showWishlist ? (
            <Button fontSize={"sm"} px={"26px"} colorScheme={"appMain"}>
              Buy Now
            </Button>
          ) : null}

          {showWishlist ? (
            <IconButton
              variant={"ghost"}
              px={0}
              aria-label={"wishlist"}
              fontSize={"26px"}
              onClick={() => {
                setToggle(!toggle);
                if (!toggle) {
                  toast({
                    status: "success",
                    title: `${item?.title} `,
                    description: "has been added to your wishlist",
                  });
                } else {
                  toast({
                    status: "success",
                    title: `${item?.title} `,
                    description: "has been removed from your wishlist",
                  });
                }
              }}
              icon={toggle ? <GiCheckMark /> : <MdOutlineFavoriteBorder />}
            />
          ) : null}
        </HStack>
      ) : null}
    </HStack>
  );
}
