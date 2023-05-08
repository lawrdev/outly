import { decreaseItemQuantity, increaseItemQuantity } from "@/functions";
import { cartAtom } from "@/recoil";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRecoilState } from "recoil";

export function CartButtons({
  itemID,
  onClick,
}: {
  itemID: string;
  onClick?: () => void;
}) {
  const [cartAtomValue, setCartAtomValue] = useRecoilState(cartAtom);

  //   console.log("we haveeeeeee", itemID);

  const getItemQuantity = (): number => {
    let itemAvaliable = [...cartAtomValue].filter((item) => item.id === itemID);

    if (itemAvaliable.length > 0) return itemAvaliable[0].quantity;
    return 0;
  };

  return (
    <HStack
      borderWidth={"1px"}
      borderColor={"#ddd"}
      userSelect={"none"}
      borderRadius={"sm"}
    >
      <Box
        p={"12px"}
        cursor={"pointer"}
        _hover={{ color: "outly.main900" }}
        transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
        onClick={() => {
          setCartAtomValue(decreaseItemQuantity(itemID));
          onClick && onClick();
        }}
      >
        {<AiOutlineMinus />}{" "}
      </Box>

      <Text width={"28px"} display={"inline-flex"} justifyContent={"center"}>
        {getItemQuantity()}
      </Text>

      <Box
        p={"12px"}
        cursor={"pointer"}
        _hover={{ color: "outly.main900" }}
        transition={`all 0.25s cubic-bezier(0.645,0.045,0.355,1)`}
        onClick={() => {
          setCartAtomValue(increaseItemQuantity(itemID));
          onClick && onClick();
        }}
      >
        {<AiOutlinePlus />}{" "}
      </Box>
    </HStack>
  );
}
