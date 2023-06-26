import { useState, useRef, useEffect } from "react";
import { CustomDrawer } from "@/components/General/molecules";
import {
  Box,
  Button,
  CloseButton,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { GoBack, ListInAnimate } from "@/components/General/atoms";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

interface navProp {
  label: string;
  href?: string;
  options?: {
    label: string;
    href?: string;
  }[];
}
[];

const navData: navProp[] = [
  {
    label: "Home",
    options: [
      { label: "Home", href: "/" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Account", href: "/" },
      { label: "Contact Us", href: "/support" },
    ],
  },
  {
    label: "Shop",
    options: [
      {
        label: "Items I",
      },
      {
        label: "Items II",
      },
      {
        label: "Items III",
      },
    ],
  },
  {
    label: "Features",
    options: [
      { label: "Deals Of Week", href: "/shop" },
      { label: "Summer Items", href: "/shop" },
      { label: "Spring Collection", href: "/shop" },
      { label: "Fashion trends", href: "/shop" },
      { label: "More", href: "/shop" },
    ],
  },
  { label: "Blog", href: "/" },
];

const shopItemsI = [
  { label: "Womens", href: `/category/Womens` },
  { label: "Shirts", href: `/category/Shirts` },
  { label: "Shorts", href: `/category/Shorts` },
  { label: "Pants & leggings", href: `/category/Pants & leggings` },
  { label: "Womens", href: `/category/Womens` },
];
const shopItems2 = [
  { label: "Mens", href: `/category/Mens` },
  { label: "Pants & Chinos", href: `/category/Pants & Chinos` },
  { label: "Footwears", href: `/category/Footwears` },
  { label: "Pants & leggings", href: `/category/Pants & leggings` },
];
const shopItems3 = [
  { label: "Kids", href: `/category/Kids` },
  { label: "Accessories", href: `/category/Accessories` },
  { label: "Shirts", href: `/category/Shirts` },
  { label: "Coats and Jackets", href: `/category/Coats and Jackets` },
];

export function MobileMenu({
  disclosure,
}: {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}) {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const timerRef = useRef<any | null>(null);
  const [dataList, setDataList] = useState<navProp[]>(navData);
  const [prevDataList, setPrevDataList] = useState<navProp[]>([]);
  const stage1 = useDisclosure();
  const stage2 = useDisclosure();

  const router = useRouter();

  const handleForward = (current: string) => {
    setIsChanging(true);
    switch (current) {
      case "Home":
        stage1.onOpen();
        stage2.onClose();
        setPrevDataList(navData);
        let home = navData.find((x) => x.label === "Home");
        if (home && home.options) {
          setDataList(home.options);
        }

        break;
      case "Shop":
        stage1.onOpen();
        stage2.onClose();
        setPrevDataList(navData);
        let shop = navData.find((x) => x.label === "Shop");
        if (shop && shop.options) {
          setDataList(shop.options);
        }

        break;
      case "Features":
        stage1.onOpen();
        stage2.onClose();
        setPrevDataList(navData);
        let features = navData.find((x) => x.label === "Features");
        if (features && features.options) {
          setDataList(features.options);
        }

        break;
      case "Items I":
        stage1.onClose();
        stage2.onOpen();
        setPrevDataList(navData.find((x) => x.label === "Shop")?.options!);
        setDataList(shopItemsI);

        break;
      case "Items II":
        stage1.onClose();
        stage2.onOpen();
        setPrevDataList(navData.find((x) => x.label === "Shop")?.options!);
        setDataList(shopItems2);

        break;
      case "Items III":
        stage1.onClose();
        stage2.onOpen();
        setPrevDataList(navData.find((x) => x.label === "Shop")?.options!);
        setDataList(shopItems3);

        break;

      default:
        stage1.onClose();
        stage2.onClose();
        setDataList(navData);
    }

    timerRef.current = setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };
  const handleGoBack = () => {
    setIsChanging(true);
    if (stage1.isOpen) {
      setDataList(navData);
      stage1.onClose();
      stage2.onClose();
    } else if (stage2.isOpen) {
      setDataList(prevDataList);
      stage1.onOpen();
      stage2.onClose();
    }
    timerRef.current = setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  // clear timeout Unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <CustomDrawer disclosure={disclosure} hideCloseButton>
      <Box pt={"3rem"} position={"relative"} userSelect={"none"}>
        <HStack mb={5} w={"full"} justifyContent={"space-between"}>
          {stage1.isOpen || stage2.isOpen ? (
            <IconButton
              aria-label="previous stage"
              color={"outly.black500"}
              fontWeight={400}
              size={"sm"}
              pr={1.5}
              py={0}
              _hover={{ bg: "blackAlpha.50" }}
              borderRadius={"md"}
              variant={"unstyled"}
              onClick={handleGoBack}
              icon={<IoChevronBackOutline fontSize={"22px"} />}
            />
          ) : null}

          {!stage1.isOpen && !stage2.isOpen ? (
            <HStack width={"100%"} spacing={"22px"}>
              <Text
                fontWeight={500}
                color={"outly.black"}
                textDecoration={"underline"}
                textUnderlineOffset={"5px"}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={"/signIn"}>Log In</Link>
              </Text>

              <Text
                fontWeight={500}
                color={"outly.black"}
                textDecoration={"underline"}
                textUnderlineOffset={"5px"}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={"/signUp"}>Sign Up</Link>
              </Text>
            </HStack>
          ) : null}

          <CloseButton
            onClick={() => {
              setDataList(navData);
              disclosure.onClose();
            }}
          />
        </HStack>

        <Box>
          <AnimatePresence>
            {!isChanging ? (
              <ListInAnimate>
                {dataList.map((nav, index) => (
                  <HStack
                    key={index}
                    py={2.5}
                    px={1.5}
                    w={"full"}
                    cursor={"pointer"}
                    color={"outly.black500"}
                    _hover={{ bg: "blackAlpha.50" }}
                    borderRadius={"sm"}
                    justifyContent={"space-between"}
                    onClick={() => {
                      handleForward(nav.label);
                      if (nav.href) {
                        router.push(nav.href);
                        disclosure.onClose();
                      }
                    }}
                  >
                    <Text fontWeight={500}>{nav.label}</Text>
                    {!nav.href ? <GrNext /> : null}
                  </HStack>
                ))}
              </ListInAnimate>
            ) : null}
          </AnimatePresence>
        </Box>
      </Box>
    </CustomDrawer>
  );
}
