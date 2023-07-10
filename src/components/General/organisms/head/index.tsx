import { BASE_URL } from "@/utils";
import { NextSeo } from "next-seo";

interface HeadProps {
  pageTitle: string;
}

export function HeadComponent({ pageTitle = "Outly Store" }: HeadProps) {
  return (
    <NextSeo
      title={pageTitle}
      description="Outly online store for daily shopping deals and fast shipping"
      canonical={BASE_URL}
      openGraph={{
        url: BASE_URL,
        title: "Outly Store",
        description:
          "Outly online store for daily shopping deals and fast shipping",
        images: [
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1689002419/Outly/seo/800_600_podvre.jpg",
            width: 800,
            height: 600,
            alt: "Outly Store",
            type: "image/png",
          },
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1689002419/Outly/seo/800_900_po5mbg.jpg",
            width: 900,
            height: 800,
            alt: "Outly Store",
            type: "image/png",
          },
          {
            url: "https://res.cloudinary.com/dqveipmsp/image/upload/v1689002419/Outly/seo/800_900_po5mbg.jpg",
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
