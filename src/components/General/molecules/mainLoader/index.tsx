import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export function MainLoader({ cancelLoading }: { cancelLoading: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      cancelLoading();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [cancelLoading]);

  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: "afterChildren",
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };
  const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 80,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  return (
    <Box className="absolute inset-0 flex items-end justify-center">
      <Box
        as={motion.div}
        zIndex={601}
        // bg={"#C8815F"}
        className="relative w-full bg-black flex flex-col items-center justify-center"
        initial="initial"
        animate="animate"
        variants={blackBox}
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
          document.body.classList.remove("overflow-hidden")
        }
      >
        <motion.svg
          variants={textContainer}
          className="absolute flex w-full items-center justify-center"
          style={{ zIndex: 660 }}
        >
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={250}
            height={400}
            className=" text-gray-200"
          >
            <rect className="w-full h-full fill-current" />
            <motion.rect
              variants={text}
              className="w-full h-full text-gray-700 fill-current"
            />
          </pattern>
          <text
            className="text-4xl font-bold tracking-wide"
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            outly
          </text>
        </motion.svg>
      </Box>
    </Box>
  );
}
