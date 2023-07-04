import "@/styles/globals.css";
import "@smastrom/react-rating/style.css";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { ChakraBaseProvider, useToast } from "@chakra-ui/react";
import { chakraTheme } from "@/styles/theme/chakraTheme";

import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";
import "@fontsource/jost/700.css";
import "@fontsource/jost/800.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/600.css";
import "@smastrom/react-rating/style.css";

import AOS from "aos";
import "aos/dist/aos.css";
import NextNprogress from "nextjs-progressbar";
// import { Loader } from "@/components/General/atoms";
import { CustomToastComponent } from "@/components/General/molecules";
import { ProgressLoader } from "@/components/General/atoms";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const toast = useToast();

  if (typeof window !== "undefined") {
    AOS.init({
      offset: 30,
      duration: 650,
      easing: "ease-in-sine",
      delay: 10,
      once: true,
      mirror: false,
    });

    window.addEventListener("offline", (e) => {
      toast({
        status: "error",
        title: "You are currently offline!",
      });
    });
  }
  const queryClient = new QueryClient();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setReady(true);
    });
    router.events.on("routeChangeComplete", () => {
      setReady(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setReady(false);
      });
      router.events.off("routeChangeComplete", () => {
        setReady(false);
      });
    };
  }, [router]);

  const motionVariants = {
    exit: { y: 160, opacity: 0, scale: 1, transition: { duration: 0.9 } },
    initial: { y: 200, opacity: 0, scale: 1 },
    animate: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraBaseProvider
          theme={chakraTheme}
          toastOptions={{
            defaultOptions: {
              position: "top-right",
              // isClosable: true,
              duration: 6000,
              render: (props: any) => {
                return (
                  <CustomToastComponent
                    title={props.title}
                    description={props.description}
                    onClose={props.onClose}
                    status={props.status}
                    variant={props.variant}
                    // image={props.icon}
                  />
                );
              },
            },
            motionVariants: motionVariants,
          }}
        >
          <Head>
            <link rel="icon" href="/favicon-32.png" />
          </Head>

          <NextNprogress color="#C8815F" height={2.5} />
          <Component {...pageProps} />
          {ready ? <ProgressLoader /> : null}
        </ChakraBaseProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} position={"top-right"} />
    </QueryClientProvider>
  );
}
