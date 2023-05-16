import { useMemo } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { AppHeader2 } from "@/components/General/atoms";
import { CustomSelect } from "@/components/General/atoms/select";

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

  return (
    <Box pb={"42px"}>
      <Box mb={"32px"}>
        <AppHeader2 title="Billing details" />
      </Box>

      <HStack mb={6} spacing={8}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="First Name *"
          isRequired
        />
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Last Name *"
          isRequired
        />
      </HStack>

      <Box mb={6}>
        <CustomSelect
          options={countryArr}
          onChange={(value) => {
            // console.log("ssssssss", value);
          }}
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Street Address *"
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Town / City *"
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Zip Code"
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Email Address *"
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Input
          size={"lg"}
          focusBorderColor={"outly.main900"}
          placeholder="Phone *"
          isRequired
        />
      </Box>

      <Box mb={6}>
        <Checkbox spacing={4}>Create an account?</Checkbox>
      </Box>

      <Box>
        <Textarea
          rows={5}
          placeholder="Notes about your order, e.g. Special notes for delivery"
        />
      </Box>
    </Box>
  );
}
