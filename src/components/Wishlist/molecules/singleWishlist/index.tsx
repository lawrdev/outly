import { useRef, useEffect } from "react";
import { BoxLoader } from "@/components/General/atoms";
import {
  getWishlist,
  increaseItemQuantity,
  removeItemFromWishlist,
} from "@/functions";
import { cartAtom, wishlistAtom } from "@/recoil";
import { currencyFormatter, ItemProp } from "@/utils";
import {
  Box,
  CloseButton,
  Heading,
  HStack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  IconButton,
  ButtonGroup,
  Flex,
  Input,
  Button,
  useDisclosure,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import Link from "next/link";

export function SingleWishlist({
  item,
  dateAdded,
  removeItem,
}: {
  item: ItemProp;
  dateAdded: string;
  removeItem: (id: string) => void;
}) {
  const timerRef = useRef<any | null>(null);
  const toast = useToast();
  const router = useRouter();
  const loaderDisclosure = useDisclosure();
  const setCartAtomValue = useSetRecoilState(cartAtom);
  const setWishlistAtomValue = useSetRecoilState(wishlistAtom);

  // clear timeout Unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Box w={"full"}>
      <BoxLoader disclosure={loaderDisclosure}>
        <HStack
          flexWrap={{ base: "wrap", md: "nowrap" }}
          borderTop={"1px solid #eee"}
        >
          <HStack w={"full"} spacing={"0px"}>
            <Box height={"full"} pr={"10px"}>
              <Tooltip label={"remove item"}>
                <CloseButton
                  border={"1.5px solid"}
                  borderColor={"outly.gray"}
                  color={"outly.gray"}
                  borderRadius={"full"}
                  size={"sm"}
                  onClick={() => {
                    loaderDisclosure.onOpen();

                    timerRef.current = setTimeout(() => {
                      loaderDisclosure.onClose();

                      setWishlistAtomValue(removeItemFromWishlist(item._id));
                      removeItem(item._id);
                    }, 2000);
                  }}
                />
              </Tooltip>
            </Box>

            <Box px={"10px"} py={"10px"} borderInline={"1px solid #eee"}>
              <Image
                alt="wishlist item"
                src={item.images[0]}
                width={79}
                height={99}
                quality={90}
              />
            </Box>

            <Box flexGrow={1} px={"18px"}>
              <Heading
                as={"h5"}
                size={"sm"}
                fontWeight={500}
                mb={1}
                _hover={{ color: "outly.main900" }}
              >
                <Link href={`/item/${item._id}`}>{item.title}</Link>
              </Heading>
              <Text fontWeight={500} fontSize={"sm"} color={"outly.black500"}>
                {currencyFormatter(item.price)}
              </Text>
              <Text fontWeight={400} fontSize={"sm"} color={"outly.black500"}>
                {dateAdded}
              </Text>

              <Box pt={"10px"}>
                <Editable
                  textAlign="start"
                  defaultValue="Add a personal note"
                  color={"outly.black100"}
                  fontSize="sm"
                  isPreviewFocusable={false}
                  display={"flex"}
                >
                  <EditablePreview />

                  <Input
                    variant={"flushed"}
                    width={"60%"}
                    size={"sm"}
                    focusBorderColor={"outly.black500"}
                    _selection={{ bg: "outly.bg", color: "outly.black500" }}
                    as={EditableInput}
                  />
                  <EditableControls />
                </Editable>
              </Box>
            </Box>
          </HStack>

          <Box
            flexBasis={{ base: "100%", md: "auto" }}
            pt={{ base: 3, md: 0 }}
            width={{ base: "full" }}
            display={"flex"}
            justifyContent={{ base: "center", md: "flex-end" }}
          >
            <Button
              colorScheme={"appMain"}
              fontSize={"sm"}
              variant={{ base: "link", md: "solid" }}
              onClick={() => {
                if (item.outOfStock) {
                  router.push(`/item/${item._id}`);
                } else {
                  loaderDisclosure.onOpen();
                  setCartAtomValue(increaseItemQuantity(item._id));
                  setWishlistAtomValue(removeItemFromWishlist(item._id));

                  timerRef.current = setTimeout(() => {
                    loaderDisclosure.onClose();

                    toast({
                      status: "success",
                      title: item.title,
                      description: "has been added to cart 🎉",
                    });

                    removeItem(item._id);
                  }, 2000);
                }
              }}
            >
              Add to cart
            </Button>
          </Box>
        </HStack>
      </BoxLoader>
    </Box>
  );
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" spacing={"6px"} ml={"12px"} size="sm">
      <IconButton
        variant={"ghost"}
        aria-label="Submit"
        icon={<AiOutlineCheck />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        variant={"link"}
        aria-label="Cancel"
        icon={<AiOutlineClose />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        color={"outly.black500"}
        variant={"link"}
        aria-label="Add personal note"
        size="sm"
        icon={<FiEdit />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
}
