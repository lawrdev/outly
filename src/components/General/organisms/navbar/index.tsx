import {
  BagIcon,
  CartBadge,
  LoveIcon,
  PersonIcon,
  SearchIcon,
} from "@/components/General/atoms";
import { CustomNavMenu, Logo } from "@/components/General/molecules";
import {
  Box,
  chakra,
  HStack,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CartDrawer } from "../cart";
import { SearchDrawer } from "../search";
import { FeaturesDropdown } from "./categories/FeaturesDropdown";
import { ShopDropdown } from "./categories/ShopDropdown";
import { MobileMenu } from "./mobile";

const navs = [
  { title: "Home", comp: <></>, path: "/" },
  { title: "Shop", comp: <ShopDropdown />, path: "/shop" },

  { title: "Blog", comp: <></>, path: "/" },
  // {
  //   title: "Contact Us",
  //   comp: <></>,
  //   path: "/support",
  // },
  { title: "Features", comp: <FeaturesDropdown />, path: "/" },
];

export function Navbar({
  searchDisclosure,
}: {
  searchDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}) {
  const cartDisclosure = useDisclosure();
  const menuDisclosure = useDisclosure();

  return (
    <>
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
            icon={<HiOutlineMenuAlt2 size={32} />}
            onClick={() => {
              menuDisclosure.onOpen();
            }}
          />
        </Box>

        <HStack spacing={10} display={{ base: "none", xl: "flex" }}>
          <Logo />

          <Box>
            <nav>
              <chakra.ul display={"flex"} alignItems={"center"} gap={5}>
                {navs.map((item, index) => (
                  <chakra.li key={index}>
                    {item.title === "Home" ||
                    item.title === "Blog" ||
                    item.title === "Contact Us" ? (
                      <Text
                        fontSize={"lg"}
                        fontWeight={"medium"}
                        className="__link"
                      >
                        <Link href={"/"}>{item.title}</Link>
                      </Text>
                    ) : (
                      <CustomNavMenu title={item.title} path={item.path}>
                        {item.comp}
                      </CustomNavMenu>
                    )}
                  </chakra.li>
                ))}
              </chakra.ul>
            </nav>
          </Box>
        </HStack>

        <Box display={{ base: "block", xl: "none" }} flex={1} pl={"4px"}>
          <Box w={"fit-content"} mx={"auto"}>
            <Logo />
          </Box>
        </Box>

        <HStack spacing={5} alignItems={"center"}>
          <Box
            tabIndex={0}
            position={"relative"}
            onClick={() => {
              searchDisclosure.onOpen();
            }}
          >
            {SearchIcon}
          </Box>
          <Box tabIndex={0} display={{ base: "none", md: "block" }}>
            {PersonIcon}
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            <Link href={"/wishlist"} title={"Whislist"}>
              {LoveIcon}
            </Link>
          </Box>

          <Box
            tabIndex={0}
            position={"relative"}
            onClick={() => {
              cartDisclosure.onOpen();
            }}
          >
            <Box
              position={"absolute"}
              top={0}
              className="-translate-y-3/4 translate-x-1/3"
              aria-label="cart button"
            >
              <CartBadge />
            </Box>

            {BagIcon}
          </Box>
        </HStack>
      </Box>

      {cartDisclosure.isOpen ? (
        <CartDrawer cartDrawerDisclosure={cartDisclosure} />
      ) : null}
      {searchDisclosure.isOpen ? (
        <SearchDrawer searchDrawerDisclosure={searchDisclosure} />
      ) : null}

      {/* MOBILE MENU */}
      <MobileMenu disclosure={menuDisclosure} />
    </>
  );
}
