import { AppHeader2 } from "@/components/General/atoms";
import { Head } from "@/components/General/organisms";
import { SupportTemplate } from "@/templates";
import { Box } from "@chakra-ui/react";

export default function Customer_Support() {
  return (
    <>
      <Head pageTitle="Contact Us| OutlyStore" />

      <SupportTemplate />
    </>
  );
}
