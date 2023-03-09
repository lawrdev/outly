import { CartAddIcon, CartIcon } from "@/components/atoms";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";

export function Cart() {
  return (
    <Box
      position="relative"
      zIndex={1}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      overflow="hidden"
    >
      <Box
      // _before={{
      //   content: "'Add to cart'",
      //   position: "absolute",
      //   bottom: 1,
      //   translateY: 0,
      //   bg: "main.400",
      //   fontSize: "14px",
      //   fontWeight: "semibold",
      //   color: "white",
      //   px: 3,
      //   py: 1,
      //   borderLeftRadius: "8px",
      //   right: "-64px",
      //   zIndex: -1,
      //   _groupHover: { right: "36px" },
      //   transition: "all 0.5s ease-in-out",
      // }}
      >
        <Tooltip label="Add to cart" placement="left" bg="main.500">
          <IconButton
            position="relative"
            zIndex={6}
            bg="backgrounds.4"
            variant="unstyled"
            _hover={{ bg: "gray.100" }}
            py={2}
            px={2}
            aria-label="cart"
            icon={<CartAddIcon color="main.600" boxSize={6} />}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
