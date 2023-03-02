import Head from "next/head";

interface HeadProps {
  pageTitle: string;
}

export function HeadComponent({ pageTitle = "Outly Store" }: HeadProps) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Outly online store for daily shopping deals"
      />

      {/* <meta
    property="og:image"
    content={`https://...`}
  /> */}
      <meta name="og:title" content={pageTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{pageTitle}</title>
    </Head>
  );
}
