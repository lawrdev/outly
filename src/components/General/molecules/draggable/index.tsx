import { ReactNode } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function Draggable({ children }: { children: ReactNode }) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  // Bind it to a component
  return (
    <animated.div {...bind()} style={{ x, y }}>
      {children}
    </animated.div>
  );
}
