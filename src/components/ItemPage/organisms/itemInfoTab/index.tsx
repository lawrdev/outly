import { useState, Dispatch, SetStateAction } from "react";
import { Rating } from "@/components/General/atoms";
import { DATE_NOW, ItemProp } from "@/utils";
import {
  chakra,
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  HStack,
  Avatar,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { postReview } from "@/functions/firebase/user/review";

interface Props {
  item: ItemProp;
  refetch: () => void;
  defaultIndex: number;
  setDefaultIndex: Dispatch<SetStateAction<number>>;
}
export function ItemInfoTab({
  item,
  defaultIndex,
  refetch,
  setDefaultIndex,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });

  const toast = useToast();

  const handleTabsChange = (index: number) => {
    setDefaultIndex(index);
  };

  return (
    <Box
      py={"32px"}
      border={"1.5px solid transparent"}
      borderTopColor={"outly.bg"}
      borderBottomColor={"outly.bg"}
    >
      <Tabs
        variant={""}
        align={"center"}
        size={"lg"}
        defaultIndex={0}
        index={defaultIndex}
        onChange={handleTabsChange}
      >
        <TabList
          mb={4}
          color={"outly.black100"}
          fontWeight={500}
          fontSize={"lg"}
          gap={{ base: 1, md: 10 }}
        >
          <Tab
            _hover={{ color: "outly.black400" }}
            _selected={{
              color: "outly.black",
            }}
          >
            Reviews
          </Tab>

          <Tab
            _hover={{ color: "outly.black400" }}
            _selected={{
              color: "outly.black",
            }}
          >
            Description
          </Tab>

          <Tab
            _hover={{ color: "outly.black400" }}
            _selected={{
              color: "outly.black",
            }}
          >
            Additional Infomation
          </Tab>
        </TabList>

        <TabIndicator
          mt="-22.5px"
          height="3px"
          bg="outly.black"
          borderRadius="2px"
        />

        <TabPanels>
          {/* Reviews */}
          <TabPanel textAlign={"start"} px={0}>
            <Box id={"reviews"} maxWidth={"770px"} mx={"auto"}>
              {item.reviews ? (
                <>
                  <Heading mb={5} as={"h5"} fontWeight={500} size={"md"}>
                    {`${item.reviews?.length} review${
                      item.reviews?.length > 1 ? "s" : ""
                    } for ${item.title}`}
                  </Heading>

                  <VStack
                    mb={4}
                    pt={4}
                    spacing={"18px"}
                    alignItems={"flex-start"}
                    border={"1.5px solid transparent"}
                    borderTopColor={"outly.bg"}
                  >
                    {item.reviews?.map((option, index) => (
                      <HStack key={index} width={"100%"} spacing={"12px"}>
                        <Avatar
                          name={option.person.name}
                          src={option.person.profile}
                        />
                        <VStack
                          spacing={"8px"}
                          alignItems={"flex-start"}
                          width={"100%"}
                        >
                          <Text
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Text
                              as={"span"}
                              fontWeight={500}
                              display={"flex"}
                              gap={"8px"}
                              alignItems={"center"}
                            >
                              {option.person.name}{" "}
                              {
                                <Rating
                                  maxWidth={70}
                                  value={option.rating || 4}
                                  black
                                />
                              }
                            </Text>
                            <Text
                              as={"span"}
                              fontWeight={400}
                              fontSize={"sm"}
                              color={"outly.black100"}
                            >{` – ${dayjs(
                              option.reviewDate || "2023-05-14"
                            ).format("MMM D, YYYY")}`}</Text>
                          </Text>
                          <Text
                            color={"outly.black100"}
                            fontSize={{ base: "sm", md: "md" }}
                          >
                            {option.comment}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </>
              ) : (
                <Text mb={4} color={"outly.black100"}>
                  No review for this item
                </Text>
              )}

              <Box
                pt={10}
                border={"1px solid transparent"}
                borderTopColor={"outly.bg"}
              >
                <Heading mb={2} as={"h4"} fontWeight={600} size={"md"}>
                  Add your review
                </Heading>
                <Text mb={6} color={"outly.black100"} fontSize={"sm"}>
                  Your email address will not be published. Required fields are
                  marked *
                </Text>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    postReview({
                      itemID: item._id,
                      review: {
                        comment: formData.comment,
                        person: {
                          name: formData.name,
                        },
                        rating: formData.rating,
                        reviewDate: DATE_NOW,
                      },
                    });

                    refetch();

                    toast({
                      status: "success",
                      title: "Review added!",
                    });

                    setFormData({
                      name: "",
                      email: "",
                      rating: 5,
                      comment: "",
                    });
                  }}
                >
                  <HStack
                    mb={4}
                    spacing={{ base: "0px", sm: "20px", md: "30px" }}
                    flexWrap={{ base: "wrap", sm: "nowrap" }}
                    gap={{ base: "16px", sm: "0px" }}
                  >
                    <FormControl>
                      <FormLabel color={"outly.black500"} fontWeight={400}>
                        Name
                        <Text as={"span"} ml={1} color={"outly.black100"}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        placeholder="Name"
                        focusBorderColor="outly.main500"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel color={"outly.black500"} fontWeight={400}>
                        Email{" "}
                        <Text as={"span"} ml={1} color={"outly.black100"}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type={"email"}
                        placeholder="Email"
                        focusBorderColor="outly.main500"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                        }}
                        required
                      />
                    </FormControl>
                  </HStack>

                  <HStack mb={6}>
                    <Text>Your rating:</Text>
                    <Rating
                      onChange={(val) => {
                        setFormData((prev) => ({
                          ...prev,
                          rating: val,
                        }));
                      }}
                      isEditable
                    />
                  </HStack>

                  <FormControl>
                    <FormLabel color={"outly.black500"} fontWeight={400}>
                      Your review{" "}
                      <Text as={"span"} ml={1} color={"outly.black100"}>
                        *
                      </Text>
                    </FormLabel>
                    <Textarea
                      rows={4}
                      focusBorderColor="outly.main500"
                      value={formData.comment}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }));
                      }}
                      required
                    />
                  </FormControl>

                  <Box pt={"12px"} fontWeight={400} color={"outly.black500"}>
                    <Checkbox>Create an account</Checkbox>
                  </Box>

                  <HStack justifyContent={"center"} pt={6}>
                    <Button type={"submit"} colorScheme={"appMain"} px={8}>
                      SUBMIT
                    </Button>
                  </HStack>
                </form>
              </Box>
            </Box>
          </TabPanel>

          {/* Description */}
          <TabPanel px={0}>
            <Box maxWidth={"770px"} mx={"auto"}>
              {item.description ? (
                <Text mb={6} textAlign={"start"}>
                  {item.description}
                </Text>
              ) : null}

              <chakra.ul
                listStyleType={"square"}
                listStylePosition={"initial"}
                listStyleImage={"initial"}
                m={"0 0 1.625em 0"}
                pl={"1.825rem"}
                display={"flex"}
                flexDirection="column"
                gap={"10px"}
              >
                {Array.from(Array(4)).map((item, index) => (
                  <chakra.li
                    key={index}
                    textAlign={"start"}
                    display={"list-item"}
                    color={"#555"}
                  >
                    Lorem ipsum dolor sit amet
                  </chakra.li>
                ))}
              </chakra.ul>
            </Box>
          </TabPanel>

          {/* Additional Info */}
          <TabPanel>
            <Box maxWidth={"770px"} mx={"auto"}>
              <TableContainer>
                <Table
                  variant="simple"
                  colorScheme="gray"
                  border={`1px dotted rgba(0,0,0,.1)`}
                >
                  <Tbody>
                    <Tr>
                      <Th
                        fontWeight={700}
                        borderRight={`1px dotted rgba(0,0,0,.1)`}
                        width={"150px"}
                      >
                        Brand
                      </Th>
                      <Td textAlign={"center"} color={"outly.black500"}>
                        {item.brand || "Local"}
                      </Td>
                    </Tr>
                    <Tr bg={"outly.bg"}>
                      <Th
                        fontWeight={700}
                        borderRight={`1px dotted rgba(0,0,0,.1)`}
                        width={"150px"}
                      >
                        Size
                      </Th>
                      <Td textAlign={"center"} color={"outly.black500"}>
                        {item.sizes?.join(", ") || "default"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th
                        fontWeight={700}
                        borderRight={`1px dotted rgba(0,0,0,.1)`}
                        width={"150px"}
                      >
                        Color
                      </Th>
                      <Td textAlign={"center"} color={"outly.black500"}>
                        {item.colors?.map((item) => item.color).join(", ")}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
