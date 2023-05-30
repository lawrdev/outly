import { Text, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  color?: string;
  bg?: string;
  children?: ReactNode;
}
export function LogoText({ color, bg }: Props) {
  return (
    <Heading
      as="h1"
      size="xl"
      // fontWeight="semibold"
      letterSpacing="wider"
      color={color}
      bg={bg}
      noOfLines={1}
    >
      outly
    </Heading>
  );
}

export function SubHeadText({ color, bg, children }: Props) {
  return (
    <Heading
      as="h3"
      size="md"
      // color="main.600"
      // bg="main.600"
      fontWeight="bold"
      px={2}
      // py={1}
      borderLeftRadius="sm"
      borderColor="main.600"
      borderLeftWidth={4}
      cursor="default"
      userSelect="none"
    >
      {children}
    </Heading>
  );
}

export function AppHeader2({
  title,
  isCentered,
  uppercase,
}: {
  title: string;
  isCentered?: boolean;
  uppercase?: boolean;
}) {
  return (
    <Heading
      as={"h2"}
      fontSize={{ base: "xl", sm: "2xl" }}
      fontWeight={500}
      textAlign={isCentered ? "center" : "start"}
      textTransform={uppercase ? "uppercase" : "none"}
    >
      {title}
    </Heading>
  );
}

export function AppHeader4({
  title,
  isCentered,
  uppercase,
}: {
  title: string;
  isCentered?: boolean;
  uppercase?: boolean;
}) {
  return (
    <Heading
      as={"h3"}
      fontSize={"md"}
      fontWeight={500}
      textAlign={isCentered ? "center" : "start"}
      textTransform={uppercase ? "uppercase" : "none"}
    >
      {title}
    </Heading>
  );
}
