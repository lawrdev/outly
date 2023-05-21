import React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { Box } from "@chakra-ui/react";

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
