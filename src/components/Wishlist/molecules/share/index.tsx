import { useState, useEffect } from "react";
import { Box, Button, HStack, Input, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const WishlistLink = () => {
  const [shareLink, setShareLink] = useState("");
  const toast = useToast();

  useEffect(() => {
    setShareLink(window.location.href);
  }, []);

  return (
    <Box>
      <HStack spacing={"0px"} flexWrap={{ base: "wrap", sm: "nowrap" }}>
        <Text
          flexBasis={{ base: "100%", sm: "auto" }}
          pb={{ base: 2, sm: 0 }}
          pr={3}
          whiteSpace={"nowrap"}
          fontSize={"sm"}
          fontWeight={500}
          color={"outly.black500"}
        >
          Wishlist link:
        </Text>
        <Input
          focusBorderColor="outly.main900"
          value={shareLink}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link copied!",
              status: "success",
            });
          }}
          maxW={"162px"}
          size={"sm"}
          readOnly
        />
        <Button
          size={"sm"}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link copied!",
              status: "success",
            });
          }}
        >
          Copy
        </Button>
      </HStack>
    </Box>
  );
};
