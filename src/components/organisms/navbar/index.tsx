import { Container } from "@/components/atoms";
import { Logo, SignIn } from "@/components/molecules";
import { Box } from "@chakra-ui/react";
import { CartDrawer } from "../cartDrawer";
import { Categories } from "./categories";
import { LocationNav } from "./locationNav";
import { MenuDrawer } from "../menuDrawer";

export function Navbar() {
  return (
    <Box
      bg="backgrounds.4"
      position="relative"
      zIndex={3}
      pb={{ base: 2, md: 0 }}
    >
      <Box borderBottomWidth={1} borderBottomColor="gray.200">
        <Container>
          <LocationNav />
        </Container>
      </Box>
      <Container>
        <Box
          // height="60px"
          py={{ base: 3, md: 2 }}
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap={{ base: 1, sm: 2 }} alignItems="center">
            <Box mt={2} ml={-3}>
              <MenuDrawer />
            </Box>

            <Logo />
          </Box>

          <Box display="flex" gap={5} alignItems="end">
            <Box>
              <SignIn />
            </Box>

            <CartDrawer />
          </Box>
        </Box>
      </Container>
      <Box
        borderBottomWidth={1}
        borderBottomColor="gray.300"
        display={{ base: "none", md: "block" }}
      >
        <Categories />
      </Box>
    </Box>
  );
}
