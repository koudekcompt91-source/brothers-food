"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Desktop pointer parallax only. Starts false so server and first paint match. */
export function useCanParallax() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return Boolean(fine && !reduce);
}
