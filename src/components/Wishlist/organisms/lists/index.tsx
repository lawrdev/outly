import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ItemProp } from "@/utils";
import { Box, HStack, Skeleton, SlideFade, VStack } from "@chakra-ui/react";
import { SingleWishlist } from "../../molecules";
import { ListAnimate } from "@/components/General/atoms";
import { AnimatePresence } from "framer-motion";

export function WishListComponentLists({
  data,
  setData,
}: {
  data:
    | {
        item: ItemProp;
        dateAdded: string;
      }[]
    | undefined;
  setData: Dispatch<
    SetStateAction<
      | {
          item: ItemProp;
          dateAdded: string;
        }[]
      | undefined
    >
  >;
}) {
  const [wishlist, setWishlist] = useState<
    { item: ItemProp; dateAdded: string }[]
  >([]);

  useEffect(() => {
    if (data && data?.length > 0) {
      setWishlist(data);
    }
  }, [data]);

  const removeItem = (id: string) => {
    if (!!data) {
      let dd = [...data].filter((x) => x.item._id !== id);
      setData(dd);
    }
  };

  return (
    <Box w={"full"}>
      <VStack
        w={"full"}
        alignItems={"flex-start"}
        spacing={{ base: "32px", md: "18px" }}
      >
        <AnimatePresence>
          {wishlist?.map((item, index) => (
            <ListAnimate key={index} direction={"slide"}>
              <SingleWishlist
                item={item.item}
                dateAdded={item.dateAdded}
                removeItem={removeItem}
              />
            </ListAnimate>
          ))}
        </AnimatePresence>
      </VStack>
    </Box>
  );
}

export function WishListComponentListsSkeleton() {
  return (
    <Box w={"full"}>
      <VStack w={"full"} spacing={"48px"}>
        {Array.from(Array(1)).map((x, index) => (
          <Box key={index} w={"full"}>
            <HStack
              width={"100%"}
              height={"100%"}
              py={"16px"}
              spacing={"10px"}
              alignItems={"center"}
            >
              <Skeleton
                height={6}
                width={{ base: "8%", lg: "3%" }}
                borderRadius={"md"}
              />

              <Skeleton
                height={120}
                width={{ base: "40%", lg: "15%" }}
                borderRadius={"md"}
              />

              <VStack
                width={"100%"}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <Skeleton height={"14px"} width={"90%"} />
                <Skeleton height={"14px"} width={"70%"} />
                <Skeleton height={"14px"} width={"30%"} />
                <Skeleton height={"14px"} width={"17%"} />
              </VStack>

              <Box
                pt={"24px"}
                width={{ base: "30%", lg: "20%" }}
                display={{ base: "none", sm: "block" }}
              >
                <Skeleton height={"28px"} borderRadius={"md"} />
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
