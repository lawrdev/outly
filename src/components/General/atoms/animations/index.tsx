import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useSpring, animated, config } from "@react-spring/web";

export function SlideIn({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const springStyles = useSpring({
    from: { opacity: 0.7, x: -160 },
    to: { opacity: 1, x: 0 },

    delay: 0,

    config: config.slow,
  });

  return (
    <animated.div
      style={{ minWidth: fullWidth ? "100%" : "fit-content", ...springStyles }}
    >
      {children}
    </animated.div>
  );
}
export function Appear({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const springStyles = useSpring({
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1 },

    delay: 0,

    config: config.slow,
  });

  return (
    <animated.div
      style={{ minWidth: fullWidth ? "100%" : "fit-content", ...springStyles }}
    >
      {children}
    </animated.div>
  );
}

// framer-motion

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "slide" | "up";
  duration?: number;
  style?: {};
}
export function ListAnimate({
  children,
  style,
  delay = 0,
  duration = 0.1,
  direction = "up",
}: Props) {
  return (
    <motion.div
      initial={
        direction === "up" ? { opacity: 0.5, y: -50 } : { opacity: 0.5, x: -50 }
      }
      animate={direction === "up" ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      exit={direction === "up" ? { opacity: 0, y: 50 } : { opacity: 0, x: 50 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,

        duration: duration,
        delay: delay,
      }}
      style={{
        width: "100%",
        transitionTimingFunction: "cubic-bezier(0.645,0.045,0.355,1)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ListInAnimate({
  children,
  style,
  delay = 0,
  duration = 0.1,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0.5, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,

        duration: duration,
        delay: delay,
      }}
      style={{
        width: "100%",
        transitionTimingFunction: "cubic-bezier(0.645,0.045,0.355,1)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
