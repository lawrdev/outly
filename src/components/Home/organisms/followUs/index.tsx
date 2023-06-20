import { getSocialImgs } from "@/functions";
import { SocialImageProp } from "@/utils";
import {
  Box,
  Heading,
  Highlight,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";

interface Props {
  socialImages: SocialImageProp[];
}
export function FollowUs({ socialImages }: Props) {
  return (
    <Box position="relative">
      {/* @ts-ignore */}
      <HStack spacing={3} justifyContent={"center"} mb={7}>
        <Icon as={BsInstagram} />
        <Text fontSize={"lg"}>Follow us on Instagram @outly</Text>
      </HStack>

      {/* image grid */}
      <Box mb={"50px"}>
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={2}>
          {socialImages?.map((obj, index) => (
            <Box
              key={index}
              overflow="hidden"
              position="relative"
              zIndex={1}
              role="group"
            >
              <Box
                width={"100%"}
                cursor={"pointer"}
                transition={"all 1s cubic-bezier(0.645,0.045,0.355,1) 0s"}
                _groupHover={{
                  transform: "scale(1.1)",
                }}
              >
                <Image
                  title="Instagram @outly"
                  src={obj.img}
                  width={273}
                  height={273}
                  alt="outly instagram"
                  sizes="(max-width: 1200px) 100vw, 100vw"
                  style={{
                    minWidth: "100%",
                  }}
                  quality={100}
                />
              </Box>
              <Box
                position={"absolute"}
                cursor={"pointer"}
                zIndex={2}
                top={0}
                bottom={0}
                left={0}
                right={0}
                transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) 0s"}
                _groupHover={{
                  bg: "#00000040",
                }}
              ></Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* newsletter */}
      <Box pt={5} maxWidth={"570px"} mx={"auto"}>
        <Heading
          as="h3"
          size={"sm"}
          fontWeight={"normal"}
          letterSpacing={"wider"}
          mb={3}
          textAlign={"center"}
        >
          NEWSLETTER
        </Heading>

        <Text
          textAlign={"center"}
          fontSize={{ base: "2xl", xl: "3xl" }}
          fontWeight={"medium"}
        >
          <Highlight query={"20%"} styles={{ color: "red.500" }}>
            Sign up and get up to 20% off your first purchase
          </Highlight>
        </Text>

        <Box pt={"24px"}>
          <form onSubmit={() => {}}>
            <FormControl>
              <HStack
                pb={"8px"}
                borderBottomWidth={"1px"}
                borderColor={"outly.black"}
              >
                <Input
                  px={"0px"}
                  type="email"
                  placeholder="Enter your email"
                  _placeholder={{
                    fontSize: "lg",
                  }}
                  variant={"unstyled"}
                  borderWidth={"0px"}
                  borderRadius={"0px"}
                />
                <Button
                  type={"submit"}
                  variant={"ghost"}
                  fontWeight={"medium"}
                  fontSize={"xl"}
                >
                  Subscribe
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
