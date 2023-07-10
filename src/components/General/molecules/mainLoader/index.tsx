import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { animated, useSpring, config } from "@react-spring/web";

export function MainLoader({ cancelLoading }: { cancelLoading: () => void }) {
  const boxStyles = useSpring({
    from: {
      height: "100vh",
    },
    to: {
      height: "0vh",
    },

    delay: 3000,
    config: config.slow,
  });

  const textContainer = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },

    delay: 2750,
    config: {
      duration: 250,
    },
  });

  const text = useSpring({
    from: {
      y: 40,
    },
    to: {
      y: 90,
    },

    config: {
      duration: 1000,
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.add("overflow-hidden");
    }
    const timeout = setTimeout(() => {
      // cancelLoading();
    }, 3000);

    return () => {
      document.body.classList.remove("overflow-hidden");
      clearTimeout(timeout);
    };
  }, [cancelLoading]);

  return (
    <VStack
      w={"100%"}
      maxHeight={"100vh"}
      justifyContent={"flex-end"}
      position={"fixed"}
      zIndex={700}
      inset={0}
    >
      {/*bg={"rgb(200, 129, 95)"} */}
      <animated.div
        style={boxStyles}
        className="relative w-full bg-black flex items-center justify-center"
      >
        <animated.svg style={textContainer} className="absolute z-50 flex">
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={750}
            height={800}
            className="text-white"
          >
            <rect className="w-full h-full fill-current" />
            <animated.rect
              style={text}
              className="w-full h-full text-gray-600 fill-current"
            />
          </pattern>
          <text
            className="text-4xl font-bold"
            text-anchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            outlystore
          </text>
        </animated.svg>
      </animated.div>
    </VStack>
  );
}
