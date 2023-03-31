import { Head } from "@/components/organisms";
import { getProducts } from "@/functions";
import { CheckoutTemplate } from "@/templates";
import { HeaderImagesProp, ProductProp } from "@/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  data: ProductProp[];
}> = async () => {
  const data = await getProducts();

  if (!data) return { notFound: true };
  return {
    props: { data },
  };
};

export default function Checkout({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head pageTitle="Checkout | OutlyStore" />
      <CheckoutTemplate products={data} />
    </>
  );
}
