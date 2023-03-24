import { useState } from "react";
import { FormatPrice, ItemProp } from "@/utils";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiArrowsRightLeft } from "react-icons/hi2";

interface Props {
  item: ItemProp;
}
export function ItemCard({ item }: Props) {
  const [currColorImage, setCurrColorImage] = useState<string | null>(null);

  const handleColorChange = (clr: string) => {
    setCurrColorImage(clr);
  };
  return (
    <>
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
            height={"100%"}
            maxHeight={330}
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
            />
          </Box>

          {/* right menu */}
          <Box
            position={"absolute"}
            zIndex={3}
            top={0}
            right={0}
            visibility={{ base: "visible", xl: "hidden" }}
            opacity={{ base: 1, xl: 0 }}
            transform={{
              base: "translateX(0)",
              xl: "translateX(100%)",
            }}
            _groupHover={{
              visibility: "visible",
              opacity: 1,
              transform: "translateX(0)",
            }}
            transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
          >
            <VStack pt={3} pr={3} spacing={{ base: 0, xl: 3 }}>
              <Tooltip label="Quick view" placement="left" hasArrow>
                <IconButton
                  display={{ base: "none", xl: "inline-flex" }}
                  bg="white"
                  color={"black"}
                  aria-label="Search"
                  p={1}
                  borderRadius={"50%"}
                  icon={<FiSearch size={20} />}
                />
              </Tooltip>

              <Tooltip label="Add to Wishlist" placement="left" hasArrow>
                <IconButton
                  bg="white"
                  color={"black"}
                  aria-label="Search"
                  p={1}
                  borderRadius={"50%"}
                  icon={<FaRegHeart size={20} />}
                />
              </Tooltip>

              <Tooltip label="Compare" placement="left" hasArrow>
                <IconButton
                  display={{ base: "none", xl: "inline-flex" }}
                  bg="white"
                  color={"black"}
                  aria-label="Search"
                  p={1}
                  borderRadius={"50%"}
                  icon={<HiArrowsRightLeft size={20} />}
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
            visibility={{ base: "visible", xl: "hidden" }}
            opacity={{ base: 1, xl: 0 }}
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
            <Button
              width={"100%"}
              borderRadius={"none"}
              _hover={{ bg: "outly.sec" }}
            >
              {item.colors ? "Pick an Option" : "Quick Add"}
            </Button>
          </Box>

          {item.hot ? (
            <Box
              position={"absolute"}
              zIndex={3}
              top={0}
              left={0}
              mt={4}
              ml={3}
            >
              <Text color="white" bg="outly.red" px={4} fontSize={"md"}>
                Hot
              </Text>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box textAlign={"start"}>
        <Text fontSize={"lg"} fontWeight={"medium"} mb={1}>
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
    </>
  );
}
