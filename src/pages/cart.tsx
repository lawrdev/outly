import { Head } from "@/components/General/organisms";
import { CartTemplate } from "@/templates/cart";

export default function Cart() {
  return (
    <>
      <Head pageTitle="Your cart | OutlyStore" />

      <CartTemplate />
    </>
  );
}
