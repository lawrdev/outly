import { Box, Tooltip, useToast } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";

export function ShareButton() {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      status: "success",
      variant: "subtle",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Tooltip label="Share" placement="left">
      <Box
        borderRadius="lg"
        p={1}
        _hover={{
          bgGradient: "linear(to-r, brand.800, brand.700)",
          color: "white",
        }}
        color="brand.500"
        cursor="pointer"
        onClick={handleCopy}
      >
        <FiShare size={18} />
      </Box>
    </Tooltip>
  );
}

export * from "./dropdown";
export * from "./boxButton";
export * from "./back";
