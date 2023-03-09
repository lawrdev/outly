import { Box, Text, Button } from "@chakra-ui/react";

export function SignIn() {
  return (
    <Box
      display={{ base: "none", sm: "flex" }}
      flexDirection="column"
      gap={0}
      alignItems="end"
    >
      <Text fontSize="sm" fontWeight="semibold">
        Hello, sign in
      </Text>
      <Button size="sm">Account</Button>
    </Box>
  );
}
