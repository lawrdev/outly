import { AppHeader4 } from "@/components/General/atoms";
import { Text, Box, VStack, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const listI = [
  { title: "Womens", hot: false },
  { title: "Shirts" },
  { title: "Jeans" },
  { title: "Shorts" },
  { title: "Ties" },
  { title: "Pants & leggings" },
  { title: "Headwear", new: true },
];
const listII = [
  { title: "Mens" },
  { title: "Tops", new: false },
  { title: "Pants & Chinos" },
  { title: "Socks" },
  { title: "Yoga Clothing", hot: false },
];
const listIII = [
  { title: "Gym Clothing", new: false },
  { title: "Jewelry" },
  { title: "Kids" },
  { title: "Casual" },
  { title: "Shoes", hot: true },
  { title: "Glasses" },
  { title: "Feeling lucky?" },
];

export const ShopDropdown = () => {
  return (
    <Box py={"26px"} px={"16px"}>
      <HStack
        pl={"24px"}
        spacing={"0px"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        w={"100%"}
        // maxHeight={"320px"}
      >
        <Box flexBasis={"25%"}>
          <AppHeader4 title="ITEMS I" uppercase />
          <VStack
            mt={"20px"}
            width={"140px"}
            alignItems={"flex-start"}
            spacing={"12px"}
          >
            {listI.map((item, index) => (
              <HStack
                key={index}
                w={"full"}
                spacing={"8px"}
                fontWeight={400}
                color={"outly.black500"}
              >
                <Text
                  fontSize={"md"}
                  cursor={"pointer"}
                  _hover={{ color: "outly.main900" }}
                  transition={`all 0.5s cubic-bezier(0.645,0.045,0.355,1)`}
                  className="__link __link-light"
                >
                  <Link href={"/shop"}>{item.title}</Link>
                </Text>
                {item.new ? (
                  <Text
                    bg={"appSuccess.500"}
                    fontSize={"xs"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    NEW
                  </Text>
                ) : null}
                {item.hot ? (
                  <Text
                    fontSize={"xs"}
                    bg={"outly.red"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    HOT
                  </Text>
                ) : null}
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box flexBasis={"25%"}>
          <AppHeader4 title="ITEMS II" uppercase />
          <VStack
            mt={"20px"}
            width={"140px"}
            alignItems={"flex-start"}
            spacing={"12px"}
          >
            {listII.map((item, index) => (
              <HStack
                key={index}
                w={"full"}
                spacing={"8px"}
                fontWeight={400}
                color={"outly.black500"}
              >
                <Text
                  fontSize={"md"}
                  cursor={"pointer"}
                  _hover={{ color: "outly.main900" }}
                  transition={`all 0.5s cubic-bezier(0.645,0.045,0.355,1)`}
                  className="__link __link-light"
                >
                  <Link href={"/shop"}>{item.title}</Link>
                </Text>
                {item.new ? (
                  <Text
                    bg={"appSuccess.500"}
                    fontSize={"xs"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    NEW
                  </Text>
                ) : null}
                {item.hot ? (
                  <Text
                    fontSize={"xs"}
                    bg={"outly.red"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    HOT
                  </Text>
                ) : null}
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box flexBasis={"25%"}>
          <AppHeader4 title="ITEMS III" uppercase />
          <VStack
            mt={"20px"}
            width={"140px"}
            alignItems={"flex-start"}
            spacing={"12px"}
          >
            {listIII.map((item, index) => (
              <HStack
                key={index}
                w={"full"}
                spacing={"8px"}
                fontWeight={400}
                color={"outly.black500"}
              >
                <Text
                  fontSize={"md"}
                  cursor={"pointer"}
                  _hover={{ color: "outly.main900" }}
                  transition={`all 0.5s cubic-bezier(0.645,0.045,0.355,1)`}
                  className="__link __link-light"
                >
                  <Link href={"/shop"}>{item.title}</Link>
                </Text>
                {item.new ? (
                  <Text
                    bg={"appSuccess.500"}
                    fontSize={"xs"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    NEW
                  </Text>
                ) : null}
                {item.hot ? (
                  <Text
                    fontSize={"xs"}
                    bg={"outly.red"}
                    color={"white"}
                    px={2}
                    textTransform={"uppercase"}
                  >
                    HOT
                  </Text>
                ) : null}
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box width={"100%"} flexBasis={"25%"} position={"relative"}>
          <Image
            alt="sales event"
            src={
              "https://firebasestorage.googleapis.com/v0/b/outly-ecommerce.appspot.com/o/nav%2Fnav_sale.jpg?alt=media&token=b55ba2c6-f4b1-40bc-9b98-5278de356c76"
            }
            width={210}
            height={376}
            sizes="(max-width: 1200px) 100vw,
            100vw"
            style={{
              minWidth: "100%",
              maxHeight: "auto",
            }}
            quality={100}
          />
        </Box>
      </HStack>
    </Box>
  );
};
