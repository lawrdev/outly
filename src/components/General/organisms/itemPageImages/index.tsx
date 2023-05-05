import { ShareButton } from "@/components/General/atoms";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  imgArr: Array<string>;
}
export function ItemPageImages({ imgArr }: Props) {
  const [currImage, setCurrImage] = useState(imgArr[0]);

  const handleImage = (str: string) => {
    setCurrImage(str);
  };

  return (
    <Box display="flex" gap={5} position="relative">
      <VStack minWidth={53}>
        <SimpleGrid columns={1} spacingY={2}>
          {imgArr.map((img, index) => (
            <Box
              key={index}
              px={2}
              display="flex"
              overflow="hidden"
              justifyContent="center"
              alignItems="center"
              bg="white"
              borderWidth={1.5}
              transitionDuration="0.3s"
              borderColor={currImage === img ? "brand.400" : "gray.300"}
              borderRadius="lg"
              cursor="pointer"
              className="active:scale-95"
              boxShadow={
                currImage === img ? "0 0 4px 2px rgb(209, 156, 104, .5);" : "md"
              }
              onMouseOver={() => {
                handleImage(img);
              }}
              onClick={() => {
                handleImage(img);
              }}
            >
              <Box
                position="relative"
                overflow="hidden"
                height={50}
                width={34}
                bg="white"
              >
                <Image
                  src={img}
                  alt="item"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes={"(max-width: 1000px) 100vw, 100vw"}
                  fill
                />
              </Box>
            </Box>
          ))}{" "}
        </SimpleGrid>
      </VStack>

      <Box
        flexGrow="1"
        display="flex"
        alignItems="center"
        minHeight={{ base: "300px", md: "390px" }}
      >
        <Box
          position="relative"
          overflow="hidden"
          height={{ base: 290, md: 270 }}
          width="100%"
          // minWidth={200}
          bg="white"
          borderRadius="lg"
        >
          <Image
            src={currImage}
            alt="item"
            style={{ objectFit: "contain", objectPosition: "top" }}
            sizes={"(max-width: 1000px) 100vw, 100vw"}
            fill
            priority
          />
        </Box>
      </Box>

      <Box
        position={"absolute"}
        top={0}
        right={0}
        boxShadow="sm"
        borderWidth={1}
        borderColor="brand.500"
        borderRadius={"lg"}
      >
        <ShareButton />
      </Box>
    </Box>
  );
}
