import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

export function Appear({ children }: { children: React.ReactNode }) {
  const springStyles = useSpring({
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1 },

    delay: 0,

    config: config.slow,
  });

  return <animated.div style={{ ...springStyles }}>{children}</animated.div>;
}
