import { useMemo } from "react";
import { Box, Checkbox, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { AppHeader2 } from "@/components/General/atoms";
import { CustomSelect } from "@/components/General/atoms/select";
import { useSetRecoilState } from "recoil";
import { checkoutInfoAtom } from "@/recoil";

export function Billings() {
  countries.registerLocale(enLocale);
  const countryObj = useMemo(
    () => countries.getNames("en", { select: "official" }),
    []
  );

  const countryArr = useMemo(
    () =>
      Object.entries(countryObj).map(([key, value]) => {
        return {
          label: value,
          value: key,
        };
      }),
    [countryObj]
  );

  const setCheckoutInfo = useSetRecoilState(checkoutInfoAtom);

  return (
    <Box pb={"42px"}>
      <Box mb={{ base: "24px", lg: "32px" }}>
        <AppHeader2 title="Billing details" />
      </Box>

      <HStack mb={6} spacing={{ base: 2, md: 8 }}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="First Name *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                first_name: e.target.value,
              },
            }));
          }}
          isRequired
        />
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Last Name *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                last_name: e.target.value,
              },
            }));
          }}
          isRequired
        />
      </HStack>

      <Box mb={6}>
        <CustomSelect
          options={countryArr}
          onChange={(value) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                country: value.label,
              },
            }));
          }}
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Street Address *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                address: e.target.value,
              },
            }));
          }}
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Town / City *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                city: e.target.value,
              },
            }));
          }}
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          type={"number"}
          focusBorderColor={"outly.main900"}
          placeholder="Zip Code"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                zip_code: Number.parseInt(e.target.value),
              },
            }));
          }}
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          type={"email"}
          focusBorderColor={"outly.main900"}
          placeholder="Email Address *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                email: e.target.value,
              },
            }));
          }}
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          type={"tel"}
          focusBorderColor={"outly.main900"}
          placeholder="Phone *"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                phone: e.target.value,
              },
            }));
          }}
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Checkbox
          spacing={4}
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              create_account: e.target.checked,
            }));
          }}
        >
          Create an account?
        </Checkbox>
      </Box>

      <Box>
        <Textarea
          rows={5}
          focusBorderColor={"outly.main900"}
          placeholder="Notes about your order, e.g. Special notes for delivery"
          onChange={(e) => {
            setCheckoutInfo((prev) => ({
              ...prev,
              billings: {
                ...prev.billings,
                customer_note: e.target.value,
              },
            }));
          }}
        />
      </Box>
    </Box>
  );
}
