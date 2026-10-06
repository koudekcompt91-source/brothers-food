"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const STAGES = [
  { text: "TWO BROTHERS.", color: "text-white" },
  { text: "ONE VISION.", color: "text-orange" },
  { text: "GREAT FOOD.", color: "text-white" },
  { text: "BROTHERS FOOD.", color: "text-orange" },
];

function Stage({
  text, color, index, total, progress,
}: {
  text: string; color: string; index: number; total: number; progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0, 1, 1, index === total - 1 ? 1 : 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1.05]);
  const y = useTransform(progress, [start, end], [60, -60]);

  return (
    <motion.p
      style={{ opacity, scale, y }}
      className={`absolute headline text-[clamp(2.6rem,9vw,8rem)] leading-[0.9] ${color}`}
    >
      {text}
    </motion.p>
  );
}

export default function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative bg-navy" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
        {STAGES.map((s, i) => (
          <Stage key={s.text} {...s} index={i} total={STAGES.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}
