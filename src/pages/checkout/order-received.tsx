import { Head } from "@/components/General/organisms";
import { OrderReceivedTemplate } from "@/templates";

export default function Order_Received() {
  return (
    <>
      <Head pageTitle="Order Recieved | OutlyStore" />
      <OrderReceivedTemplate />
    </>
  );
}
