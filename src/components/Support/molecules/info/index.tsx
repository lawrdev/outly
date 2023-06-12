import { ReactNode } from "react";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { AppHeader, AppHeader2 } from "@/components/General/atoms";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_SOCIALS,
} from "@/utils";
import Link from "next/link";

const data = [
  { title: "Address", list: [CONTACT_ADDRESS] },
  {
    title: "Contact",
    list: [
      <>
        Phone:{" "}
        <Text as={"span"} fontWeight={600}>
          {CONTACT_PHONE}
        </Text>
      </>,
      <>
        Email:{" "}
        <Text as={"span"} fontWeight={600}>
          {CONTACT_EMAIL}
        </Text>
      </>,
    ],
  },
  {
    title: "Hour of Operation",
    list: ["Mon – Fri: 08:30 – 19: 30", "Sat & Sun: 10:00 – 17:30"],
  },
];

export const SupportInfo = () => {
  return (
    <Box w={"full"}>
      <VStack alignItems={"flex-start"} w={"full"} spacing={"46px"}>
        {data.map((op, index) => (
          <ListHeader key={index} title={op.title} list={op.list} />
        ))}
      </VStack>

      <Box w={"full"} my={"62px"}>
        <HStack w={"full"} spacing={"32px"}>
          {CONTACT_SOCIALS.map((op, index) => (
            <Box key={index}>
              <Link href={op.link}>
                <IconButton
                  boxShadow={"md"}
                  px={"6px"}
                  py={"4px"}
                  borderRadius={"full"}
                  fontSize={"22px"}
                  bg={"#fff"}
                  color={"outly.black"}
                  minW={"2px"}
                  height={"fit-content"}
                  minHeight={"2px"}
                  aria-label={op.label}
                  icon={op.icon}
                  transition={"all 0.5s cubic-bezier(0.645,0.045,0.355,1) .1s"}
                  _hover={{ color: "#fff", bg: "outly.main900" }}
                />
              </Link>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

const ListHeader = ({
  title,
  list,
}: {
  title: string;
  list: Array<string | ReactNode>;
}) => {
  return (
    <Box>
      <AppHeader2 title={title} />

      <Box pt={"12px"}>
        {list.map((item, index) => (
          <Box key={index}>
            <Text fontSize={"lg"} color={"outly.black500"} fontWeight={400}>
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
