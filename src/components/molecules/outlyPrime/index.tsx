import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

export function OutlyPrime() {
  return (
    <Box display={"inline-block"}>
      <Popover>
        <PopoverTrigger>
          <Button
            variant={"unstyled"}
            height="fit-content"
            _hover={{ color: "brand.500" }}
          >
            <Text
              fontSize={"sm"}
              fontWeight="normal"
              textDecoration={"underline"}
              textDecorationThickness="0.2px"
              textUnderlineOffset={"2.5px"}
            >
              Outly Prime
            </Text>
          </Button>
        </PopoverTrigger>

        <PopoverContent bg={"backgrounds.3"} width="fit-content">
          <PopoverArrow bg={"backgrounds.3"} />
          <PopoverCloseButton />
          <Box py={3} pl={3} pr={10}>
            <Text textAlign={"center"} fontSize="sm" fontWeight={"medium"}>
              Coming soon...!😉
            </Text>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
