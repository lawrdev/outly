import {
  Box,
  chakra,
  //   Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { Container } from "@/components/General/atoms";
import { Logo } from "@/components/General/molecules";
import dayjs from "dayjs";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"600"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  return (
    <footer style={{ paddingBlockStart: "100px", marginTop: "auto" }}>
      <Box bg={"outly.black"} color={"gray.200"} py={12}>
        <Container>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
            spacing={8}
            fontSize="md"
          >
            <Stack spacing={6}>
              <Box>
                <Logo color="gray.200" />
              </Box>
              <Box>
                <Text mb={1} fontSize={"md"}>
                  © {dayjs().format("YYYY")} Created by{" "}
                  <a
                    href="https://lawrdev.vercel.app/"
                    target={"_blank"}
                    style={{ textDecoration: "underline" }}
                  >
                    Lawrdev
                  </a>
                </Text>
                <Text fontSize={"md"}>
                  Email:{" "}
                  <a
                    href="mailto:lawrence.tsx@gmail.com"
                    style={{ textDecoration: "underline" }}
                  >
                    lawrence.tsx@gmail.com
                  </a>
                </Text>
              </Box>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link href={"#"}>About us</Link>
              <Link href={"#"}>Outly Prime</Link>
              <Link href={"/support"}>Contact us</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Help Center</Link>
              <Link href={"#"}>Terms of Service</Link>
              <Link href={"#"}>Legal</Link>
              <Link href={"#"}>Privacy Policy</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Get daily deals</ListHeader>
              <Stack direction={"row"} width={"full"}>
                <Input
                  width={"full"}
                  placeholder={"Your email address"}
                  bg={"gray.700"}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                  color={"white"}
                  focusBorderColor={"#ddd"}
                />
                <IconButton
                  px={6}
                  bg={"gray.100"}
                  color={"outly.black"}
                  aria-label="Subscribe"
                  icon={<BiMailSend fontSize={"30px"} />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </footer>
  );
}
