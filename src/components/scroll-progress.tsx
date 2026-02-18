"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[2.5px] origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
      style={{ scaleX }}
    />
  );
}
