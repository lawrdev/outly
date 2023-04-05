import { useState, useEffect } from "react";

export function useScroll() {
  const [scrollDirection, setScrollDirectione] = useState("top");

  useEffect(() => {
    let lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;

      if (y > lastVal) {
        setScrollDirectione("down");
      }
      if (y < lastVal) {
        // if (y < 160) {
        setScrollDirectione("upHide");
      }
      // if (y < 160) {
      //   setScrollDirectione("upHide");
      // }
      if (y === 0) {
        setScrollDirectione("top");
      }
      lastVal = y;
    };
  }, []);

  return { scrollDirection };
}
