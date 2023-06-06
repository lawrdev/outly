import { CartButtons } from "@/components/General/molecules";
import { currencyFormatter, ItemProp } from "@/utils";
import { Box, CloseButton, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const DrawerItemCard = ({
  item,
  handleRemoveItem,
  getItemPrice,
  getTotalQuantity,
}: {
  item: ItemProp;
  handleRemoveItem: (id: string) => void;
  getItemPrice: (id: string) => number;
  getTotalQuantity: () => number;
}) => {
  return (
    <Box
      bg={"outly.bg"}
      pl={"4px"}
      px={"14px"}
      py={"10px"}
      // width={"100%"}
      position={"relative"}
      borderRadius={"md"}
      boxShadow={"md"}
      mx={"24px"}
      mb={"18px"}
    >
      <HStack width={"100%"} spacing={"28px"}>
        <Box flexBasis={"30%"}>
          <Image
            alt={"cart item"}
            src={item?.images[0]!}
            width={120}
            height={150}
            quality={100}
          />
        </Box>

        <Box flexBasis={"70%"}>
          <VStack
            alignItems={"flex-start"}
            justifyContent={"center"}
            width={"100%"}
            spacing={"16px"}
          >
            <Text
              fontWeight={500}
              color={"outly.black500"}
              noOfLines={1}
              _hover={{ color: "outly.main900" }}
              transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
            >
              <Link href={`/item/${item?._id}`}>{item?.title}</Link>
            </Text>
            <HStack
              width={"100%"}
              justifyContent={"space-between"}
              spacing={"24px"}
              alignItems={"flex-end"}
            >
              <CartButtons
                size="sm"
                item={item}
                onClick={() => {
                  getItemPrice(item?._id);
                  getTotalQuantity();
                }}
              />

              <Text
                fontWeight={500}
                fontSize={"sm"}
                width={"68px"}
                textAlign={"end"}
              >
                {currencyFormatter(getItemPrice(item?._id))}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </HStack>
      <CloseButton
        size={"sm"}
        position={"absolute"}
        top={2}
        right={4}
        onClick={() => {
          handleRemoveItem(item._id);
        }}
      />
    </Box>
  );
};
