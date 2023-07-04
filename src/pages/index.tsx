import {
  getAllItems,
  getCategories,
  getHeroImgs,
  getSocialImgs,
} from "@/functions/firebase";
import { HomeTemplate } from "@/templates";
import {
  CategoryProp,
  HeroImagesProp,
  ItemProp,
  SocialImageProp,
} from "@/utils";
import { Head } from "@/components/General/organisms";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  heroImgs: HeroImagesProp[];
  categories: CategoryProp[];
  items: ItemProp[];
  socialImages: SocialImageProp[];
}> = async () => {
  const heroImgs = await getHeroImgs();
  const categories = await getCategories();
  const items = await getAllItems();
  const socialImages = await getSocialImgs();

  let newCat = [...categories].map((x) => {
    return {
      ...x,
      timestamp: x.timestamp
        ? x.timestamp?.toDate().toDateString()
        : new Date().toDateString(),
    };
  });

  if (!heroImgs || !categories || !items) return { notFound: true };

  let newItems = [...items].map((item) => ({
    ...item,
    timestamp: item.timestamp.toDate().toDateString(),
  }));

  return {
    props: { heroImgs, categories: newCat, items: newItems, socialImages },
  };
};

export default function Home({
  heroImgs,
  categories,
  items,
  socialImages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head pageTitle="Outly Store | Home" />
      <HomeTemplate
        heroImages={heroImgs}
        categoryItems={categories}
        items={items}
        socialImages={socialImages}
      />
    </>
  );
}
