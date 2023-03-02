import { LogoIcon } from "@/components/atoms";
import { LogoText } from "@/components/atoms";
import { Box } from "@chakra-ui/react";

export function Logo() {
  return (
    <Box display="flex" gap={1} alignItems="start">
      <LogoIcon boxSize={7} color="main.500" />
      <LogoText color="main.500" />
    </Box>
  );
}
