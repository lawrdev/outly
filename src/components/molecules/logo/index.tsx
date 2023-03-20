import { LogoIcon } from "@/components/atoms";
import { LogoText } from "@/components/atoms";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
  return (
    <Box width={"fit-content"}>
      <Link href="/">
        <Box
          className="jello-h"
          position="relative"
          zIndex={3}
          cursor="pointer"
        >
          <div className="absolute top-0 right-0 -translate-y-2 translate-x-1.5 rotate-12">
            <LogoIcon boxSize={4} color="brand.600" />
          </div>

          <LogoText color="outly.black" />
        </Box>
      </Link>
    </Box>
  );
}
