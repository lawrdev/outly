import { useMemo } from "react";
import { LoveIcon, PersonIcon, SearchIcon } from "@/components/General/atoms";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  RiHeartLine,
  RiHome3Line,
  RiSearchLine,
  RiUserLine,
} from "react-icons/ri";
import { TRANSITION_FAST } from "@/utils";
import { useRouter } from "next/router";

export function BottomNav({
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
  const router = useRouter();

  const tabs = useMemo(
    () => [
      { label: "Home", icon: <RiHome3Line />, href: "/" },
      {
        label: "Search",
        icon: <RiSearchLine />,
        disclosure: searchDisclosure,
      },
      { label: "Wishlist", icon: <RiHeartLine />, href: "/wishlist" },
      { label: "Account", icon: <RiUserLine />, href: "/" },
    ],
    [searchDisclosure]
  );

  return (
    <Box
      position={"fixed"}
      zIndex={500}
      bottom={0}
      right={0}
      left={0}
      bg={"white"}
    >
      <SimpleGrid columns={4}>
        {tabs.map((op, index) => (
          <Box
            key={index}
            border={"1px solid transparent"}
            borderRightColor={"#ddd"}
            cursor={"pointer"}
            role={"group"}
            onClick={() => {
              if (op.disclosure) {
                op.disclosure.onOpen();
              } else {
                router.push(op.href);
              }
            }}
          >
            <VStack spacing={"4px"} py={2.5}>
              <Box
                fontSize={{ base: "lg", sm: "xl" }}
                _groupHover={{ color: "outly.main900" }}
                transition={TRANSITION_FAST}
              >
                {op.icon}
              </Box>
              <Text
                fontSize={"xs"}
                color={"outly.black400"}
                _groupHover={{ color: "outly.main900" }}
                transition={TRANSITION_FAST}
              >
                {op.label}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
