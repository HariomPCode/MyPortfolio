"use client";
import { motion, MotionConfig } from "framer-motion";
// The only entrance animation on the site: the hero lines settle in once. Reduced-motion users get none.
export function HeroReveal({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>{children}</motion.div>
    </MotionConfig>
  );
}
