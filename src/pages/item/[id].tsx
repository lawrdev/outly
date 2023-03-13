import { Head } from "@/components/shared";
import { getProducts, getSingleProduct } from "@/functions";
import { ItemTemplate } from "@/templates";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ProductProp } from "@/utils";

export const getStaticPaths = async () => {
  const results = await getProducts();
  const data = results.map((product) => ({
    params: {
      id: product._id,
    },
  }));

  return {
    paths: data,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  product?: ProductProp;
}> = async (context) => {
  const data = await getSingleProduct(context.params?.id as string);
  if (data != null) {
    return { props: { product: data } };
  } else {
    return { notFound: true };
  }
};

export default function Product({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head pageTitle="Item | OutlyStore" />
      <ItemTemplate product={product as ProductProp} />
    </>
  );
}
