import { Text } from "@chakra-ui/react";

export function Reviews({ count }: { count: number }) {
  return (
    <Text
      fontSize="sm"
      fontFamily="mono"
      className="hover:underline underline-offset-4 cursor-pointer"
    >
      {`(`}
      {count ? count : 0}
      {`)`}
    </Text>
  );
}
