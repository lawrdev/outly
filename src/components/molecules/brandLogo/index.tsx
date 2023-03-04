import { LogoIcon } from "@/components/atoms";
import { LogoText } from "@/components/atoms";
import { Box } from "@chakra-ui/react";

export function Logo() {
  return (
    <Box className="jello-h" position="relative" zIndex={3} cursor="pointer">
      <div className="absolute top-0 right-0 -translate-y-2 translate-x-1.5 rotate-12">
        <LogoIcon boxSize={4} color="main.500" />
      </div>

      <LogoText color="main.500" />
    </Box>
  );
}
