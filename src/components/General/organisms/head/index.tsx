import { BASE_URL } from "@/utils";
import { NextSeo } from "next-seo";
import Head from "next/head";

interface HeadProps {
  pageTitle: string;
}

export function HeadComponent({ pageTitle = "Outly Store" }: HeadProps) {
  return (
    <NextSeo
      title={pageTitle}
      description="Outly online store for daily shopping deals and fast shipping"
      canonical="https://www.canonical.ie/"
      openGraph={{
        url: BASE_URL,
        title: "Outly Store",
        description:
          "Outly online store for daily shopping deals and fast shipping",
        images: [
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688485684/Outly/seo/outly800_600_wwkuly.png",
            width: 800,
            height: 600,
            alt: "Outly Store",
            type: "image/png",
          },
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688485686/Outly/seo/outly900_800_ajjp2o.png",
            width: 900,
            height: 800,
            alt: "Outly Store",
            type: "image/png",
          },
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1688485687/Outly/seo/outly_uyknk2.png",
          },
        ],
        siteName: "Outly",
      }}
      twitter={{
        handle: "@outly",
      }}
    />
  );
}
