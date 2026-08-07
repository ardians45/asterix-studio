"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * LazyMotionProvider wraps children with framer-motion's LazyMotion
 * using only the domAnimation feature bundle (~10KB vs ~130KB for full bundle).
 *
 * IMPORTANT: Components inside must import `m` from "framer-motion" instead of `motion`.
 * This provider enables tree-shaking of unused animation features.
 */
export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
