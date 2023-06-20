import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  ScaleFade,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getSearchItems } from "@/functions/firebase/search";
import {
  categoryArray,
  SearchCategoriesTypes,
  SelectOptionsType,
} from "@/utils";
import { CustomSelect } from "../../atoms/select";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { YouMayAlsoLike } from "../youmayalsoLike";
import { ItemCard } from "../../molecules";

interface Props {
  searchDrawerDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}

const selectOptions: SelectOptionsType[] = [...categoryArray].map((x) => ({
  label: x === "All" ? "All Categories" : x,
  value: x,
}));
const quickSearch = [
  { label: "Accessories", path: "#" },
  { label: "Womens", path: "#" },
  { label: "Shorts", path: "#" },
];

export const SearchDrawer = ({ searchDrawerDisclosure }: Props) => {
  const [searchCategory, setSearchCategory] =
    useState<SearchCategoriesTypes>("All");

  const searchMutation = useMutation(
    getSearchItems
    //   {
    //   onSuccess: (data) => console.log("we haveeeee", data),
    //   onError: (data) => console.log("error we haveeee", data),
    // }
  );

  return (
    <>
      <Drawer
        isOpen={searchDrawerDisclosure.isOpen}
        placement="right"
        onClose={searchDrawerDisclosure.onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent maxWidth={{ base: "94vw", sm: "md" }}>
          <DrawerCloseButton />
          <DrawerHeader pt={"32px"} mx={"auto"} mb={1} width={"100%"}>
            <Heading px={"4px"} as={"h2"} fontSize={"26px"} fontWeight={500}>
              Search Items
            </Heading>
          </DrawerHeader>

          <DrawerBody
            className="thinSB"
            ml={"16px"}
            pl={"4px"}
            pr={"24px"}
            py={2}
          >
            <Box px={"10px"}>
              <Box mb={"14px"}>
                <CustomSelect
                  options={selectOptions}
                  defaultValue={{ label: "All Categories", value: "All" }}
                  onChange={(newValue) => {
                    setSearchCategory(newValue.value);
                    searchMutation.mutate({ category: newValue.value });
                  }}
                />
              </Box>

              <Box mb={"16px"}>
                <FormControl>
                  <InputGroup>
                    <Input
                      placeholder="Search for Items"
                      focusBorderColor={"outly.main900"}
                      size={"lg"}
                      onChange={(e) => {
                        if (e.target.value.length > 2) {
                          searchMutation.mutate({
                            category: searchCategory,
                            search: e.target.value,
                          });
                        }
                      }}
                    />
                    <InputRightElement pt={"6px"} pr={"6px"}>
                      <IconButton
                        aria-label={"search"}
                        icon={<FiSearch />}
                        color={"outly.gray"}
                        fontSize={"24px"}
                        borderRadius={"md"}
                        bg={"inherit"}
                        _hover={{ bg: "outly.main900", color: "#fff" }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>

              <Box>
                <HStack
                  mb={"18px"}
                  spacing={{ base: "0px", sm: "10px" }}
                  alignItems={"flex-end"}
                  flexWrap={{ base: "wrap", md: "nowrap" }}
                >
                  <Text pr={"5px"} color={"outly.black"} fontSize={"lg"}>
                    Quick search:
                  </Text>

                  <HStack>
                    {quickSearch.map((item, index) => (
                      <Text
                        key={index}
                        pb={"3px"}
                        color={"outly.black500"}
                        textDecoration={"underline"}
                        textUnderlineOffset={"2px"}
                        _hover={{ color: "outly.main900" }}
                        className={"transition-fast"}
                      >
                        <Link href={item.path}>{item.label}</Link>
                      </Text>
                    ))}
                  </HStack>
                </HStack>

                {searchMutation.isError ? (
                  <>
                    <Heading
                      mb={"12px"}
                      as={"h3"}
                      fontWeight={500}
                      fontSize={"20px"}
                      color={"outly.black500"}
                    >
                      Search Result:
                    </Heading>

                    <Text w={"full"} color={"outly.black100"}>
                      Nothing matches your search
                    </Text>
                  </>
                ) : null}
              </Box>

              {searchMutation.isLoading ? (
                <HStack mb={"52px"} w={"100%"} justifyContent={"center"}>
                  <CircularProgress
                    isIndeterminate
                    color="outly.black"
                    trackColor="outly.bg"
                    size={"80px"}
                    thickness={"8px"}
                  />
                </HStack>
              ) : null}

              {!searchMutation.isLoading &&
              searchMutation.data &&
              searchMutation.data.length > 0 ? (
                <>
                  <Heading
                    mb={"12px"}
                    as={"h3"}
                    fontWeight={500}
                    fontSize={"20px"}
                    color={"outly.black500"}
                  >
                    Search Result:
                  </Heading>
                  <SimpleGrid
                    w={"100%"}
                    mb={"72px"}
                    columns={2}
                    spacingX={"24px"}
                    spacingY={"34px"}
                  >
                    {searchMutation.data.map((item, index) => (
                      <ItemCard key={index} item={item} />
                    ))}
                  </SimpleGrid>
                </>
              ) : null}

              <Box mt={"32px"} pb={"20px"}>
                <YouMayAlsoLike
                  categories={["All"]}
                  headerProps={{ textAlign: "start", fontSize: "20px" }}
                  isDrawer
                />
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
