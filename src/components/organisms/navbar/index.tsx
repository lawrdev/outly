import {
  BagIcon,
  CartBadge,
  CartButton,
  Container,
  LoveIcon,
  PersonIcon,
  SearchIcon,
} from "@/components/atoms";
import { Logo, SignIn } from "@/components/molecules";
import { Box, chakra, HStack, Text, IconButton } from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";

const navs = ["Home", "Shop", "Pages", "Blog", "Features"];

export function Navbar() {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {/* hamburger */}
      <Box display={{ base: "block", xl: "none" }}>
        <IconButton
          variant={"unstyled"}
          aria-label="menu"
          icon={<HiMenuAlt2 size={38} />}
        />
      </Box>

      <HStack spacing={10} display={{ base: "none", xl: "flex" }}>
        <Logo />

        <Box>
          <nav>
            <chakra.ul display={"flex"} alignItems={"center"} gap={5}>
              {navs.map((item, index) => (
                <chakra.li key={index}>
                  <Text
                    cursor={"pointer"}
                    listStyleType={"none"}
                    fontSize={"lg"}
                    fontWeight={"medium"}
                    position="relative"
                    _before={{
                      content: "' '",
                      position: "absolute",
                      bottom: "0px",
                      left: "0px",
                      height: "2px",
                      width: "0%",
                      backgroundColor: "outly.sec",
                      transition: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
                    }}
                    _hover={{
                      _before: { width: "100%" },
                    }}
                    // onMouseOver={onToggle}
                    // onMouseLeave={onClose}
                  >
                    {item}
                  </Text>
                </chakra.li>
              ))}
            </chakra.ul>
          </nav>
        </Box>
      </HStack>

      <Box display={{ base: "block", xl: "none" }}>
        <Logo />
      </Box>

      <HStack spacing={5} alignItems={"center"}>
        <Box>{SearchIcon}</Box>
        <Box display={{ base: "none", md: "block" }}>{PersonIcon}</Box>
        <Box display={{ base: "none", md: "block" }}>{LoveIcon}</Box>

        <Box position={"relative"}>
          <Box
            position={"absolute"}
            top={0}
            className="-translate-y-3/4 translate-x-1/3"
          >
            <CartBadge />
          </Box>

          {BagIcon}
        </Box>
      </HStack>
    </Box>
  );
}
