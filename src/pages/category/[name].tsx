import { Loader } from "@/components/General/atoms/loader";
import { Head } from "@/components/General/organisms";
import { CategoryTemplate } from "@/templates/category";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { appLoader } from "@/recoil";

export default function Category() {
  const loader = useRecoilValue(appLoader);
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      {loader.category ? <Loader /> : null}
      <Head pageTitle={`Outly Store | ${name} Category`} />
      <CategoryTemplate />
    </>
  );

  //   create array of all possible category and pass to getstaticprops and get their files, OR just use tanstack and fetch on load of page while showing spinner first
}
