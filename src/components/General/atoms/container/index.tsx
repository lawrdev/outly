import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onlyMobile?: boolean;
}
export function Container({ children, onlyMobile = false }: Props) {
  const wxx = onlyMobile ? "100%" : "5vw";
  const wx = onlyMobile ? "100%" : "5vw";

  return (
    <Box
      width="100%"
      px={{ base: "24px", sm: wx, lg: wxx }}
      maxWidth="1480px"
      mx="auto"
    >
      {children}
    </Box>
  );
}

export const PageWrapper = ({
  bg = "white",
  children,
}: {
  bg?: string;
  children: ReactNode;
}) => {
  return (
    <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"} bg={bg}>
      {children}
    </Box>
  );
};
